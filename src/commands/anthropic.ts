import antrophicFactory from '../connector/anthrophic'
import { getConfig } from '../helpers/config'
import preparePrompt from '../helpers/preparePrompt'
import { IAmBoredOptions } from '../helpers/types'

const anthropic = async (options: IAmBoredOptions) => {
  const config = getConfig()
  const antrophicConnector = antrophicFactory(config)
  const messages = await antrophicConnector.completion(preparePrompt(options))

  for (const msg of messages) {
    console.log(msg)
  }
}

export default anthropic
