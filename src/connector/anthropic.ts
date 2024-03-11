import Anthropic from '@anthropic-ai/sdk'

import { ANTHROPIC_API_KEY } from '../helpers/config'
import { ConnectorFactory, Messages } from './types'

const antrophicFactory: ConnectorFactory = (config) => {
  return {
    completion: async (msgs) => {
      const anthropicApi = new Anthropic({
        apiKey: config[ANTHROPIC_API_KEY],
      })

      const messages = msgs.reduce<Anthropic.MessageCreateParams['messages']>(
        messageReducer(),
        []
      )

      const params: Anthropic.MessageCreateParams = {
        max_tokens: 250,
        messages,
        model: 'claude-3-opus-20240229',
      }

      try {
        const message: Anthropic.Message =
          await anthropicApi.messages.create(params)

        return message?.content?.map((msg) => msg.text) ?? null
      } catch (error: unknown) {
        console.error(error)
        process.exit(1)
      }
    },
  }
}

const messageReducer = () => {
  let prev: Anthropic.MessageCreateParams['messages'][number] | null = null

  return (
    acc: Anthropic.MessageCreateParams['messages'],
    msg: Messages[number]
  ) => {
    const message = {
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    } satisfies Anthropic.MessageCreateParams['messages'][number]

    if (prev?.role === message.role) {
      acc[acc.length - 1].content += `\n${message.content}`
      prev = acc[acc.length - 1]
      return acc
    }

    prev = message

    return [...acc, message]
  }
}

export default antrophicFactory
