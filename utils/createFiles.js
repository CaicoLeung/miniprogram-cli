const { readAppJson, writeAppJson } = require('./pageJson')
const fsExtra = require('fs-extra')
const chalk = require('chalk')
const path = require('path')

exports.createFiles = async function (_path, type) {
  if (!_path) {
    console.log(chalk.red('没找到path参数'))
    process.exit(0)
  }
  const targetPath = _path.toLowerCase()
  if (type === 'page') {
    fsExtra.copySync(path.join(process.cwd(), 'app/_template'), path.join(process.cwd(), `app/pages/${targetPath}`))
    const appJson = await readAppJson()
    if (appJson.pages) {
      appJson.pages.push(`pages/${targetPath}/index`)
      writeAppJson(appJson)
    }
  } else if (type === 'component') {
    fsExtra.copySync(path.join(process.cwd(), 'app/_component'), path.join(process.cwd(), `app/components/${targetPath}`))
  }
}
