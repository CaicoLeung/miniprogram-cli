#!/usr/bin/env node

const download = require('download-git-repo')
const inquirer = require('inquirer')
const { program } = require('commander');
const chalk = require('chalk')
const ora = require('ora')
const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')

program.version('1.0.0');

const spinner = ora('正在下载模板, 请稍候...')

const initConfig = {
  name: 'my-miniprogram-app',
  language: 'typescript',
  style: 'scss'
}

const setProjectTypeHandler = (name, language, style) => {
  try {
    const projectPath = path.join(process.cwd(), name)
    if (language === 'javasrcipt') {
      fsExtra.renameSync('template/temp.ts', 'template/temp.js')
      fs.renameSync('component/temp.ts', 'component/temp.js')
    }
    if (['wxss', 'sass', 'less'].includes(style)) {
      fs.renameSync('template/temp.scss', `template/temp.${style}`)
      fs.renameSync('component/temp.scss', `component/temp.${style}`)
    }
    fsExtra.copySync('template', path.join(projectPath, 'app/_template'))
    fsExtra.copySync('component', path.join(projectPath, 'app/_component'))
  } catch (err) {
    console.log(chalk.red(err.message));
  }
}

const selectTypeHandler = (opts) => {
  spinner.start()
  const cloneErrHandler = (error) => {
    if (error) {
      spinner.fail()
      console.log(chalk.red('failed! 拉取模板失败', error))
      return
    }
    setProjectTypeHandler(opts.name, opts.language, opts.style)
    spinner.succeed()
    console.log(chalk.green('success! 项目初始化成功！'))
    console.log(
      chalk.greenBright('开启项目: ') + '\n' +
      chalk.greenBright('cd ' + opts.name) + '\n' +
      chalk.greenBright('安装依赖, 推荐用yarn: ') + '\n' +
      chalk.greenBright('yarn') + '\n' +
      chalk.greenBright('开始开发~~~!')
    );
  };

  if (opts.language === 'javascript') {
    download('direct:https://github.com/CaicoLeung/gulp-wechat-miniprogram.git#template/js', path.join(process.cwd(), opts.name), { clone: true }, cloneErrHandler)
  } else {
    download('direct:https://github.com/CaicoLeung/gulp-wechat-miniprogram.git#template/ts', path.join(process.cwd(), opts.name), { clone: true }, cloneErrHandler)
  }
}

program.command('init')
  .description('初始化项目')
  .action(async (name, opts) => {
    const config = await inquirer.prompt([
      {
        name: 'name',
        message: '请输入项目名称',
        default: initConfig.name
      },
      {
        name: 'language',
        type: 'list',
        message: '选择你的项目开发语言',
        choices: ['javascript', 'typescript'],
        default: initConfig.language
      },
      {
        name: 'style',
        type: 'list',
        message: '选择你的项目css预处理语言',
        choices: ['wxss', 'sass', 'scss', 'less'],
        default: initConfig.style
      }
    ])

    selectTypeHandler(config)
  })

program.parse(process.argv);