const chalk = require('chalk')

const colorizePath = (path) => chalk.green(path)
const colorizeUrl = (url) => chalk.greenBright(url)
const colorizeText = (text) => chalk.cyan.bold(text)
const colorizeErrorText = (text) => chalk.red.bold(text)

exports = {
  colorizePath,
  colorizeUrl,
  colorizeText,
  colorizeErrorText,
}