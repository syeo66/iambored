import { z } from 'zod'

import anthropicFactory from '../connector/anthropic'
import openaiFactory from '../connector/openai'
import { getConfig } from '../helpers/config'
import preparePrompt from '../helpers/preparePrompt'

export const iAmBoredOptionsSchema = z.object({
  hours: z.number().optional(),
  minutes: z.number().optional(),
  model: z.string(),
})
export type IAmBoredOptions = z.infer<typeof iAmBoredOptionsSchema>

const factories = {
  gpt3: openaiFactory,
  gpt4: openaiFactory,
  anthropic: anthropicFactory,
}

const iambored = async (options: IAmBoredOptions) => {
  const config = getConfig()
  const factory = factories[options.model as keyof typeof factories]

  if (!factory) {
    throw new Error(`Unknown model: ${options.model}`)
  }

  const connector = factory(config)
  const messages = await connector.completion(preparePrompt(options), options)

  for (const msg of messages) {
    console.log(msg)
  }
}

export default iambored
