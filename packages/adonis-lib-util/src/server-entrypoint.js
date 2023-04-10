module.exports.setupServerEnvironment = (dirname) => {
  require('source-map-support/register')
  require('reflect-metadata')

  if (!process.env.PORT || process.env.PORT === '3333') {
    process.env.PORT = process.env.DEV_SERVER_PORT || '8000'
  }

  const {Ignitor} = require('@adonisjs/core/build/standalone')

  return new Ignitor(dirname)
    .httpServer()
    .start()
}
