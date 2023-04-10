import {test} from '@japa/runner'
import Config from '@ioc:Adonis/Core/Config'

test('display welcome page', async () => {
  console.log(123)
  Config.get('')
})

