import fastq, { queueAsPromised } from 'fastq'
import { environment } from './environment'

import { worker } from './worker'

export type QueueContract = {
  fileName: string
  fileExtention: string
}

export const queue: queueAsPromised<QueueContract> = fastq.promise(
  worker,
  environment.CONCURRENCY,
)
