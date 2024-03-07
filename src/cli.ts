#!/usr/bin/env node

import { cli } from 'cleye'

import packageJSON from '../package.json' assert { type: 'json' }
import iambored from './commands/iambored'

const possibleModels = ['gpt3', 'gpt4', 'gemini'] as const

type Models = (typeof possibleModels)[number]

function Model(model: Models) {
  if (!possibleModels.includes(model)) {
    throw new Error(`Invalid model: "${model}"`)
  }

  return model
}

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
    model: {
      type: Model,
      description: 'Which model to use?',
      default: 'gpt3',
      choices: possibleModels,
    },
  },
  ignoreArgv: (type) => type === 'unknown-flag' || type === 'argument',
  help: { description: packageJSON.description },
})

iambored(args.flags)
