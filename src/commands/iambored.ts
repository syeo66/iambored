import { z } from 'zod'

import anthropic from './anthropic'
import gpt from './gpt'

export const iAmBoredOptionsSchema = z.object({
  hours: z.number().optional(),
  minutes: z.number().optional(),
  model: z.string(),
})
export type IAmBoredOptions = z.infer<typeof iAmBoredOptionsSchema>

const iambored = async (options: IAmBoredOptions) => {
  if (options.model === 'gpt3' || options.model === 'gpt4') {
    gpt(options)
    return
  }

  if (options.model === 'anthropic') {
    anthropic(options)
    return
  }

  console.log('Gemini Pro not implemented yet')
}

export default iambored
