import { z } from 'zod'

import { configSchema } from '../helpers/config'

export const messagesSchema = z.array(
  z.object({
    role: z.enum(['system', 'user', 'assistant']),
    content: z.string(),
  })
)
export type Messages = z.infer<typeof messagesSchema>

const connectorResponseSchema = z.array(z.string())

const connectorSchema = z.object({
  completion: z
    .function()
    .args(messagesSchema)
    .returns(connectorResponseSchema.or(z.promise(connectorResponseSchema))),
})
export type Connector = z.infer<typeof connectorSchema>

export const connectorFactorySchema = z
  .function()
  .args(configSchema)
  .returns(connectorSchema)
export type ConnectorFactory = z.infer<typeof connectorFactorySchema>
