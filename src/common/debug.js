import debug from 'debug'

const {
  env: {
    DEBUG = '@modernpoacher/rules-runner:*'
  }
} = process

debug.enable(DEBUG)

export default debug
