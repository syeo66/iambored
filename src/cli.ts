#!/usr/bin/env node

import { cli } from 'cleye'

import packageJSON from '../package.json' assert { type: 'json' }
import iambored from './commands/iambored'

cli({
  version: packageJSON.version,
  name: 'iambored',
  flags: {},
  ignoreArgv: (type) => type === 'unknown-flag' || type === 'argument',
  help: { description: packageJSON.description },
})

iambored()
