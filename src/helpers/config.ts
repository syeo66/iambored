import { existsSync, readFileSync } from 'fs'
import { parse as iniParse } from 'ini'
import { homedir } from 'os'
import { join as pathJoin } from 'path'
import { z } from 'zod'

export const OPENAI_API_KEY = 'OPENAI_API_KEY'
export const ANTHROPIC_API_KEY = 'ANTHROPIC_API_KEY'

const configPath = pathJoin(homedir(), '.iambored')

const configSchema = z.object({
  [OPENAI_API_KEY]: z.string().optional(),
  [ANTHROPIC_API_KEY]: z.string().optional(),
})
export type Config = z.infer<typeof configSchema>

export const getConfig = (): Config => {
  const configExists = existsSync(configPath)

  if (!configExists) {
    console.log(`No config file found at ${configPath}`)
    process.exit(1)
  }

  const configFile = readFileSync(configPath, 'utf8')
  const config = iniParse(configFile)

  return configSchema.parse(config)
}
