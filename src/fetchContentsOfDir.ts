import fs from 'fs'
import { environment } from './lib/environment'

export function fetchContentsOfDir() {
  return fs.readdirSync(environment.PATH_DIRECTORY)
}
