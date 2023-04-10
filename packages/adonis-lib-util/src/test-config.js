const TestUtils = require('@ioc:Adonis/Core/TestUtils')
const {apiClient, assert, runFailedTests, specReporter} = require('@japa/preset-adonis')

module.exports.testConfig = {
  plugins: [assert(), runFailedTests(), apiClient()],
  reporters: [specReporter()],
  runnerHooks: {
    setup: [() => TestUtils.ace().loadCommands()],
    teardown: [],
  },
  configureSuite: (suite) => {
    if (suite.name === 'functional') {
      suite.setup(() => TestUtils.httpServer().start())
    }
  },
}
