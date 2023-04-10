module.exports.setupTestEnvironment = (dirname, testConfig) => {
  testConfig = testConfig || (() => import('./test-config.js').then(c => c.testConfig))

  process.env.NODE_ENV = 'test'

  require('source-map-support/register')
  require('reflect-metadata')
  const {Ignitor} = require('@adonisjs/core/build/standalone')
  const {configure, processCliArgs, run} = require('@japa/runner')

  const kernel = new Ignitor(dirname).kernel('test')

  return kernel
    .boot()
    .then(() => testConfig())
    .then(({runnerHooks, ...config}) => {
      const app = [() => kernel.start()]

      configure({
        ...kernel.application.rcFile.tests,
        ...processCliArgs(process.argv.slice(2)),
        ...config,
        ...{
          importer: (filePath) => import(filePath),
          setup: app.concat(runnerHooks.setup),
          teardown: runnerHooks.teardown,
        },
        cwd: kernel.application.appRoot,
      })

      return run()
    })
}
