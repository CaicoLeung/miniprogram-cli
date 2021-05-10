const { writeFileSync } = require('jsonfile')
const fsExtra = require('fs-extra')
const path = require('path')
const { joinCwd } = require('./index');
const { colorizeErrorText } = require('./colorize');
/**
 * @param  {string} destination
 * @param  {'page'|'component'} type
 */
async function create(destination, type) {
  if (!destination) {
    console.log(colorizeErrorText('没找到path参数'))
    process.exit(0)
  }
  const targetPath = destination.toLowerCase()
  if (type === 'page') {
    fsExtra.copySync(path.join(process.cwd(), 'app/_template'), path.join(process.cwd(), `app/pages/${targetPath}`))
    const appJson = await require(joinCwd('app/app.json'))
    if (appJson.pages) {
      appJson.pages.push(`pages/${targetPath}/index`)
      writeFileSync(joinCwd('app/app.json'), appJson, { spaces: 2 })
    }
  } else if (type === 'component') {
    fsExtra.copySync(path.join(process.cwd(), 'app/_component'), path.join(process.cwd(), `app/components/${targetPath}`))
  }
}

module.exports = create