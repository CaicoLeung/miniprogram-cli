const { colorizeErrorText } = require('./../utils/colorize');
const { colorizeText } = require('../utils/colorize');
const { withSpinner } = require('../utils/spinner');
const inquirer = require('inquirer')
const path = require('path')
const download = require('download-git-repo')
const { defaultConfig } = require('./helper')
const fsExtra = require('fs-extra');
const ora = require('ora');
const { joinCwd } = require('../utils');

const spinner = ora("开始拉取模板...")

const main = async function (projectName) {
  const config = await inquirer.prompt([
    {
      name: 'language',
      type: 'list',
      message: '选择你的项目开发语言',
      choices: ['javascript', 'typescript'],
      default: defaultConfig.language
    },
    {
      name: 'style',
      type: 'list',
      message: '选择你的项目css预处理语言',
      choices: ['wxss', 'sass', 'scss', 'less'],
      default: defaultConfig.style
    }
  ])

  spinner.start()
  const projectPath = joinCwd(projectName)
  const cloneErrHandler = (error) => {
    if (error) {
      spinner.fail('拉取模板失败:')
      console.log(colorizeErrorText(error.message));
      return
    }
    try {
      if (['wxss', 'sass', 'less'].includes(config.style)) {
        fsExtra.renameSync(path.join(projectPath, 'app/_template/index.scss'), path.join(projectPath, `app/_template/index.${config.style}`))
        fsExtra.renameSync(path.join(projectPath, 'app/_component/index.scss'), path.join(projectPath, `app/_component/index.${config.style}`))
      }
    } catch (err) {
      spinner.fail('拉取模板失败:')
      console.log(colorizeErrorText(err.message));
    }
    spinner.succeed('项目初始化成功！')
    console.log(
      colorizeText('开启项目: ') + '\n' +
      colorizeText('cd ' + projectName) + '\n' +
      colorizeText('安装依赖: ') + '\n' +
      colorizeText('yarn') + '\n' +
      colorizeText('开始开发~~~!')
    );
  };
  if (config.language === 'javascript') {
    download('direct:https://github.com/CaicoLeung/gulp-wechat-miniprogram.git#template/js', projectPath, { clone: true }, cloneErrHandler)
  } else {
    download('direct:https://github.com/CaicoLeung/gulp-wechat-miniprogram.git#template/ts', projectPath, { clone: true }, cloneErrHandler)
  }
}

module.exports = main