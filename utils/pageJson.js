const { readFile, writeFile } = require('jsonfile')
const path = require('path')

const appPath = 'app'
const appJson = path.join(process.cwd(), `${appPath}/app.json`)

exports.readAppJson = function () {
  return readFile(appJson)
}

exports.writeAppJson = function (result) {
  writeFile(appJson, result, { spaces: 2 }, (err) => {
    if (err) console.error(err)
  })
}
