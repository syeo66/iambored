import { existsSync, readFileSync } from 'fs'
import { parse as iniParse } from 'ini'
import { homedir } from 'os'
import { join as pathJoin } from 'path'

export const OPENAI_API_KEY = 'OPENAI_API_KEY'

const configPath = pathJoin(homedir(), '.iambored')

const validateApiKey = (config: Record<string, string>) => {
  const apiKey = config[OPENAI_API_KEY]

  if (!apiKey) {
    console.error(
      `Missing OpenAI API key in ${configPath}. Please add it to your .iambored file.`
    )
    process.exit(1)
  }

  if (!apiKey.startsWith('sk-') || apiKey.length !== 51) {
    console.error(
      `Missing OpenAI API key in ${configPath}. Please add it to your .iambored file.`
    )
    process.exit(1)
  }

  return apiKey
}

export const getConfig = () => {
  const configExists = existsSync(configPath)
  if (!configExists) {
    console.log(`No config file found at ${configPath}`)
    process.exit(1)
  }

  const configFile = readFileSync(configPath, 'utf8')
  const config = iniParse(configFile)

  const validApiKey = validateApiKey(config)

  return { [OPENAI_API_KEY]: validApiKey }
}
