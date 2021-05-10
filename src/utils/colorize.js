const chalk = require('chalk')

exports.colorizePath = (path) => chalk.green(path)
exports.colorizeUrl = (url) => chalk.greenBright(url)
exports.colorizeText = (text) => chalk.cyan.bold(text)
exports.colorizeErrorText = (text) => chalk.red.bold(text)
