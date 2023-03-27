#!/usr/bin/env node

import { cli } from 'cleye'

import packageJSON from '../package.json' assert { type: 'json' }
import iambored from './commands/iambored'

const args = cli({
  version: packageJSON.version,
  name: 'iambored',
  flags: {
    minutes: {
      type: Number,
      description: 'How many minutes do I have to spare?',
      default: 0,
    },
    hours: {
      type: Number,
      description: 'How many hours do I have to spare?',
      default: 0,
    },
  },
  ignoreArgv: (type) => type === 'unknown-flag' || type === 'argument',
  help: { description: packageJSON.description },
})

iambored(args.flags)
