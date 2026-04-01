import { customType, pgEnum } from 'drizzle-orm/pg-core'

export const vector = customType<{ data: number[]; driverData: string }>({
  dataType(config) {
    return `vector(${(config as any)?.dimensions ?? 1536})`
  },
  toDriver(value: number[]): string {
    return `[${value.join(',')}]`
  },
  fromDriver(value: string): number[] {
    return value.slice(1, -1).split(',').map(Number)
  },
})

export const sourceTypeEnum = pgEnum('source_type', ['file', 'url', 'text'])

export const sourceStatusEnum = pgEnum('source_status', [
  'pending',
  'processing',
  'ready',
  'error',
])

export const messageRoleEnum = pgEnum('message_role', ['user', 'assistant'])

export const tokenTxTypeEnum = pgEnum('token_tx_type', ['grant', 'usage'])
