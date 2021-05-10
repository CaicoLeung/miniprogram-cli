#!/usr/bin/env node

const { program } = require('commander')
const { bin, version, description, homepage } = require('../package.json')
const main = require('./core/main')
const { colorizeErrorText, colorizeText, colorizeUrl } = require('./utils/colorize')
const { taskFirst } = require('./utils/tools')
const createFiles = require('./utils/create')

program.name(taskFirst(Object.keys(bin), 'mp-cli'))
  .description(`🤖 ${colorizeText(description)}`)
  .version(version)
  .usage('<command> [options]')

program.command('create <project-name>')
  .description('创建一个由mp-cli构建的项目')
  .action(main)

program.command('add-page <destination>')
  .description('创建page目录')
  .action(destination => createFiles(destination, 'page'))

program.command('add-comp <destination>')
  .description('创建page目录')
  .action(destination => createFiles(destination, 'component'))

// output help information on unknown commands
program.on('command:*', ([cmd]) => {
  program.outputHelp()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log()
  suggestCommands(cmd)
  process.exitCode = 1
})

program.on('--help', () => {
  console.log('')
  console.log(`📝 for more information, check out ${colorizeUrl(homepage)}`)
  console.log('')
})

program.commands.forEach(c => c.on('--help', () => console.log()))

process.on('unhandledRejection', e => {
  console.error(colorizeErrorText('Unhandled exception'), e)
  process.exit(1)
})

program.parse();
