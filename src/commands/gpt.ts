import openaiFactory from '../connector/openai'
import { getConfig } from '../helpers/config'
import preparePrompt from '../helpers/preparePrompt'
import { IAmBoredOptions } from './iambored'

const gpt = async (options: IAmBoredOptions) => {
  const config = getConfig()
  const openaiConnector = openaiFactory(config)
  const messages = await openaiConnector.completion(
    preparePrompt(options),
    options
  )

  for (const msg of messages) {
    console.log(msg)
  }
}

export default gpt
