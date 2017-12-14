'use strict'
module.exports = set
const npmrc = require('./util/npmrc.js')
const profile = require('../lib')
const validateCIDR = require('./util/validate-cidr.js')
const read = require('./util/read.js')
const retryWithOTP = require('./util/retry-with-otp')

const blacklist = [ 'email_verified', 'tfa', 'name', 'created', 'updated' ]

async function set (argv) {
  if (blacklist.indexOf(argv.property) !== -1) {
    console.error(`You can't set "${argv.property}" via this command`)
    process.exit(1)
  }
  if (argv.property !== 'password' && argv.value == null) {
    console.error(`npm-profile set ${argv.property} <value>`)
    process.exit(1)
  }
  try {
    const conf = await npmrc.read(argv.config)
    const token = npmrc.getAuthToken(conf, argv.registry)
    const info = {}
    if (argv.property === 'cidr_whitelist') {
      info.cidr_whitelist = validateCIDR.list(argv.value)
    } else if (argv.property === 'password') {
      const oldpassword = await read.password('Current password:     ')
      let new1password
      let new2password
      while (new1password !== new2password || new1password == null) {
        new1password = await read.password('New password:         ')
        new2password = await read.password('New password (again): ')
        if (new1password !== new2password) {
          console.error("Passwords didn't match, try again please!")
        }
      }
      info.password = {'old': oldpassword, 'new': new1password}
    } else {
      info[argv.property] = argv.value
    }
    const result = await retryWithOTP({
      otp: argv.otp,
      get: () => read.otp('Authenticator provided OTP:'),
      fn: otp => profile.set(info, {registry: argv.registry, auth: {token, otp}})
    })
    console.log('Set', argv.property, result[argv.property] != null ? 'to ' + result[argv.property] : '')
  } catch (ex) {
    if (ex.code === 'E401') {
      throw ex.message
    } else {
      throw ex
    }
  }
}
