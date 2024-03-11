import {
  ChatCompletionRequestMessage,
  Configuration as OpenAiApiConfiguration,
  OpenAIApi,
} from 'openai'

import { OPENAI_API_KEY } from '../helpers/config'
import { ConnectorFactory, Messages } from './types'

const openaiFactory: ConnectorFactory = (config) => {
  return {
    completion: async (msgs, args) => {
      const openAiApiConfiguration = new OpenAiApiConfiguration({
        apiKey: config[OPENAI_API_KEY],
      })
      const openAiApi = new OpenAIApi(openAiApiConfiguration)

      const messages: ChatCompletionRequestMessage[] = msgs.reduce(
        messageReducer(),
        []
      )

      try {
        const model = args.model === 'gpt4' ? 'gpt-4' : 'gpt-3.5-turbo'

        const { data } = await openAiApi.createChatCompletion({
          model,
          messages,
          temperature: 1.5,
          max_tokens: 250,
        })

        const resp = data.choices[0].message?.content
          ? [data.choices[0].message?.content]
          : []

        return resp
      } catch (error: unknown) {
        console.error(error)
        process.exit(1)
      }
    },
  }
}

const messageReducer = () => {
  return (acc: ChatCompletionRequestMessage[], msg: Messages[number]) => {
    const message = {
      role: msg.role,
      content: msg.content,
    } satisfies ChatCompletionRequestMessage as ChatCompletionRequestMessage

    return [...acc, message]
  }
}

export default openaiFactory
