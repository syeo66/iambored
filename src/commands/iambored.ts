import { readFileSync } from 'fs'
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration as OpenAiApiConfiguration,
  OpenAIApi,
} from 'openai'

import { getConfig, OPENAI_API_KEY } from '../helpers/config'

const iambored = async () => {
  const config = getConfig()

  const openAiApiConfiguration = new OpenAiApiConfiguration({
    apiKey: config[OPENAI_API_KEY],
  })
  const openAiApi = new OpenAIApi(openAiApiConfiguration)

  const activities = getActivities()

  const messages: ChatCompletionRequestMessage[] = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        'You are giving some advice on what to do today. Be helpful, clever, friendly and creative. Suggest somewhat unusual things. Do not suggest multiple things and alternatives. Just one thing at a time.',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Now is Wed Mar 15 2023 15:30:22 GMT, what should I do today? Maybe ${
        activities[Math.trunc(Math.random() * activities.length)].activity
      }?`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content:
        activities[Math.trunc(Math.random() * activities.length)].activity,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Now is Thu Mar 16 2023 12:15:00 GMT, what should I do today? Maybe ${
        activities[Math.trunc(Math.random() * activities.length)].activity
      }?`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content:
        activities[Math.trunc(Math.random() * activities.length)].activity,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Now is Fri Mar 17 2023 09:15:00 GMT, what should I do today? Maybe ${
        activities[Math.trunc(Math.random() * activities.length)].activity
      }?`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content:
        activities[Math.trunc(Math.random() * activities.length)].activity,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Now is ${new Date().toString()}, what should I do today? Maybe ${
        activities[Math.trunc(Math.random() * activities.length)].activity
      }?`,
    },
  ]

  try {
    const { data } = await openAiApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 1.5,
      max_tokens: 250,
    })

    const { message } = data.choices[0]

    console.log(message?.content)
  } catch (error: unknown) {
    console.error(error)
    process.exit(1)
  }
}

const getActivities = () => {
  const activities = readFileSync(`${__dirname}/data/activities.json`, 'utf8')

  return JSON.parse(activities)
}

export default iambored
