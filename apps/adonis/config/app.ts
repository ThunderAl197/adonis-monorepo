import Env from '@ioc:Adonis/Core/Env'
import type {LoggerConfig} from '@ioc:Adonis/Core/Logger'


export const appKey: string = Env.get('APP_KEY')

export const logger: LoggerConfig = {
  enabled: true,
  name: Env.get('APP_NAME'),
  level: Env.get('LOG_LEVEL', 'info'),
  prettyPrint: Env.get('NODE_ENV') === 'development',
}
