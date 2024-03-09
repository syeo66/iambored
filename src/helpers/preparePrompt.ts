import { readFileSync } from 'fs'

import { Messages } from '../connector/types'
import { IAmBoredOptions } from './types'

function preparePrompt({ minutes, hours }: IAmBoredOptions): Messages {
  const activities = getActivities()

  const m = !hours && !minutes ? Math.ceil(Math.random() * 12) * 10 : minutes
  const mins = m ? `${m} Minutes` : ''
  const hrs = hours ? `${hours} Hours` : ''
  const time = `I have ${hrs} ${mins} to spare.`

  return [
    {
      role: 'system',
      content:
        'You are giving some advice on what to do today. Be helpful, clever, friendly and creative. Suggest unusual things. Do not suggest multiple things and alternatives. Just mention one thing at a time.',
    },
    {
      role: 'user',
      content: `Now is Wed Mar 15 2023 15:30:22 GMT, what should I do today? Yesterday I did the following: ${
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
      role: 'assistant',
      content:
        activities[Math.trunc(Math.random() * activities.length)].activity,
    },
    {
      role: 'user',
      content: `Now is ${new Date().toString()} and ${time} What should I do today? Something like ${
        activities[Math.trunc(Math.random() * activities.length)].activity
      }.`,
    },
  ]
}

const getActivities = () => {
  const activities = readFileSync(`${__dirname}/data/activities.json`, 'utf8')

  return JSON.parse(activities)
}

export default preparePrompt
