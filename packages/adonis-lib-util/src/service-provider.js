const defaultConfigs = require('./default-configs')

module.exports = class DefaultLibProvider {
  constructor(app) {
    this.app = app
  }

  setupDefaultConfigs() {
    for (const defaultConfigKey of Object.keys(defaultConfigs)) {
      this.app.config.defaults(defaultConfigKey, defaultConfigs[defaultConfigKey])
    }
  }

  register() {
    this.setupDefaultConfigs()
  }
}
