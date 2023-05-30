import fs from 'fs'
import chalk from 'chalk'
import ProgressBar from 'progress'

import { queue } from './lib/queue'
import { environment } from './lib/environment'
import { isFileOnDir } from './utils/isFileOnDir'
import { fetchContentsOfDir } from './fetchContentsOfDir'
import { getHtmlFileProperties, isHtml } from './utils/isHtml'

const progressBar = new ProgressBar('Processing [:bar] :current/:total', {
  total: 0, // Will be updated dynamically
  width: 20,
})

if (!fs.existsSync(environment.PATH_DIRECTORY)) {
  console.log(
    chalk.red(
      `[CYREX-ERROR]: Folder '${environment.PATH_DIRECTORY}' doesn't exist`,
    ),
  )
  process.exit(1)
}

if (!isFileOnDir(environment.PATH_DIRECTORY)) {
  console.log(
    chalk.blue(`[CYREX-INFO]: Folder '${environment.PATH_DIRECTORY}' is empty`),
  )
  process.exit(1)
}

try {
  const files = fetchContentsOfDir()

  progressBar.total = files.length

  files.forEach((file) => {
    // TODO: add cache and history registry to validate files ever processed
    if (!isHtml(file)) {
      console.log(
        chalk.blue(
          `[CYREX-INFO]: Don't have changes to trait, please rebuild to generate updates`,
        ),
      )
      process.exit(1)
    }

    const { fileName, fileExtention } = getHtmlFileProperties(file)
    queue.push({ fileName, fileExtention })
    progressBar.tick()
  })
} catch (error) {
  console.log(chalk.red('[CYREX-ERROR]Error reading files', error))
}
