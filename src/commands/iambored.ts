import gpt from './gpt'

interface IAmBoredOptions {
  hours?: number
  minutes?: number
  model: string
}

const iambored = async (options: IAmBoredOptions) => {
  if (options.model === 'gpt3' || options.model === 'gpt4') {
    gpt(options)
    return
  }

  console.log('Gemini Pro not implemented yet')
}

export default iambored
