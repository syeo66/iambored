import Anthropic from '@anthropic-ai/sdk'
import { readFileSync } from 'fs'
import { ChatCompletionRequestMessageRoleEnum } from 'openai'

import { ANTHROPIC_API_KEY, getConfig } from '../helpers/config'

interface IAmBoredOptions {
  hours?: number
  minutes?: number
  model: string
}

const anthropic = async ({ minutes, hours }: IAmBoredOptions) => {
  const config = getConfig()

  const anthropicApi = new Anthropic({
    apiKey: config[ANTHROPIC_API_KEY],
  })

  const activities = getActivities()

  const m = !hours && !minutes ? Math.ceil(Math.random() * 12) * 10 : minutes
  const mins = m ? `${m} Minutes` : ''
  const hrs = hours ? `${hours} Hours` : ''
  const time = `I have ${hrs} ${mins} to spare.`

  const messages = [
    {
      role: 'user',
      content:
        'You are giving some advice on what to do today. Be helpful, clever, friendly and creative. Suggest unusual things. Do not suggest multiple things and alternatives. Just mention one thing at a time.\n' +
        `Now is Wed Mar 15 2023 15:30:22 GMT, what should I do today? Yesterday I did the following: ${
          activities[Math.trunc(Math.random() * activities.length)].activity
        }.`,
    },
    {
      role: 'assistant',
      content:
        activities[Math.trunc(Math.random() * activities.length)].activity,
    },
    {
      role: 'user',
      content: `Now is Thu Mar 16 2023 12:15:00 GMT, what should I do today? Yesterday I did the following: ${
        activities[Math.trunc(Math.random() * activities.length)].activity
      }.`,
    },
    {
      role: 'assistant',
      content:
        activities[Math.trunc(Math.random() * activities.length)].activity,
    },
    {
      role: 'user',
      content: `Now is Fri Mar 17 2023 09:15:00 GMT, what should I do today? Something similar to ${
        activities[Math.trunc(Math.random() * activities.length)].activity
      }.`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content:
        activities[Math.trunc(Math.random() * activities.length)].activity,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Now is ${new Date().toString()} and ${time} What should I do today? Something like ${
        activities[Math.trunc(Math.random() * activities.length)].activity
      }.`,
    },
  ] satisfies Anthropic.MessageCreateParams['messages']

  const params: Anthropic.MessageCreateParams = {
    max_tokens: 250,
    messages,
    model: 'claude-3-opus-20240229',
  }

  try {
    const message: Anthropic.Message =
      await anthropicApi.messages.create(params)

    for (const msg of message?.content || []) {
      console.log(msg.text)
    }
  } catch (error: unknown) {
    console.error(error)
    process.exit(1)
  }
}

const getActivities = () => {
  const activities = readFileSync(`${__dirname}/data/activities.json`, 'utf8')

  return JSON.parse(activities)
}

export default anthropic