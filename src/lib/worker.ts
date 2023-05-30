import fs from 'fs'
import chalk from 'chalk'
import { QueueContract } from './queue'
import { environment } from './environment'

export async function worker({ fileName, fileExtention }: QueueContract) {
  await fs.mkdirSync(`${environment.PATH_DIRECTORY}/${fileName}`)

  // move file to dir with the correspondent name and rename to index
  await fs.renameSync(
    `${environment.PATH_DIRECTORY}/${fileName}.${fileExtention}`,
    `${environment.PATH_DIRECTORY}/${fileName}/index.${fileExtention}`,
  )

  console.log(
    chalk.green(
      `[CYREX-DONE]: File ${fileName}.${fileExtention} moved to ${environment.PATH_DIRECTORY}/${fileName}`,
    ),
  )
}
