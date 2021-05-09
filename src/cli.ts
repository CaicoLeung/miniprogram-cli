import { program } from 'commander'
import { bin, version, description, homepage } from '../package.json'
import { main } from './core/main'
import { colorizeErrorText, colorizeText, colorizeUrl } from '#Utils/colorize'
import { taskFirst } from '#Utils/tools'
import createFiles from '#Utils/create'

program.name(taskFirst(Object.keys(bin), 'mp-cli'))
  .arguments('<project-path>')
  .description(`🤖 ${colorizeText(description)}`)
  .version(version)
  .action(main)
  .on('--help', () => {
    console.log('')
    console.log(`📝 for more information, check out ${colorizeUrl(homepage)}`)
    console.log('')
  })
  .parseAsync(process.argv)
  .then(() => {
    console.log(colorizeText('🎉 All done, enjoy your coding time!'))
    console.log('')
  })
  .catch(e => {
    console.error(colorizeErrorText('Unhandled exception'), e)
  })

program.command('page [destination]')
  .description('创建page目录')
  .action(destination => createFiles(destination, 'page'))

program.command('comp [destination]')
  .description('创建page目录')
  .action(destination => createFiles(destination, 'component'))

process.on('unhandledRejection', e => {
  console.error(colorizeErrorText('Unhandled exception'), e)
  process.exit(1)
})