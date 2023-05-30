import fs from 'fs'

export function isFileOnDir(directory: string) {
  return fs.readdirSync(directory).length != 0
}
