import { writeFileSync } from 'jsonfile'
import fsExtra from 'fs-extra'
import path from 'path'
import { joinCwd } from '#Utils/index';
import { colorizeErrorText } from './colorize';

export default async function (destination: string, type: 'page' | 'component') {
  if (!destination) {
    console.log(colorizeErrorText('没找到path参数'))
    process.exit(0)
  }
  const targetPath = destination.toLowerCase()
  if (type === 'page') {
    fsExtra.copySync(path.join(process.cwd(), 'app/_template'), path.join(process.cwd(), `app/pages/${targetPath}`))
    const appJson = await import(joinCwd('app/app.json'))
    if (appJson.pages) {
      appJson.pages.push(`pages/${targetPath}/index`)
      writeFileSync(joinCwd('app/app.json'), appJson, { spaces: 2 })
    }
  } else if (type === 'component') {
    fsExtra.copySync(path.join(process.cwd(), 'app/_component'), path.join(process.cwd(), `app/components/${targetPath}`))
  }
}