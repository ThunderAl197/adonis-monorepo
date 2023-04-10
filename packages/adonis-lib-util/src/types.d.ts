declare module '@adonis-monorepo/adonis-lib-util/service-provider' {
  import type {ApplicationContract} from '@ioc:Adonis/Core/Application'

  export default class DefaultLibProvider {
    constructor(app: ApplicationContract)

    public register(): void
  }
}

declare module '@adonis-monorepo/adonis-lib-util' {

  export async function setupTestEnvironment(dirname: string, testBootstrap?: any)

  export async function setupServerEnvironment(dirname: string, testBootstrap?: any)

  export const testConfig: Record<string, any>
}
