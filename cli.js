#!/usr/bin/env node      //脚本用env启动的原因，是因为脚本解释器在linux中可能被安装于不同的目录，env可以在系统的PATH目录中查找。同时，env还规定一                          // 些系统环境变量。
'use strict'             //严格模式
const os = require('os')   //os模块，可以用来获取操作系统相关的信息和机器物理信息，例如操作系统平台，内核，cpu架构，内存，cpu，网卡等信息。
const path = require('path')      //path模块提供了一些工具函数，用于处理文件与目录的路径。
const Bluebird = require('bluebird')     //bluebird提供了一个非常有用的功能来promise化不返回promise的模块。比如，promise化fs模块，只需要简单地                                          //require bluebird模块和一个被promise化的fs模块。
const log = require('npmlog')            //nodejs默认的采用是morgan的日志系统，一般显示的结果都是在控制台输出，当重启服务器的时候，这些信息就会                                          //丢失，无法长久保存，因此，我们考虑采用新的log机制，
const yargs = require('yargs')           //yargs是一个npm模块用来完成命令行参数解析
const npmrc = require('./cmds/util/npmrc.js')   //

process.on('log', function (level) {
  return log[level].apply(log, [].slice.call(arguments, 1))
})

let running = false

const argv = yargs
  .usage('npm-profile <cmd> <args>')
  .option('config', {
    describe: 'the npmrc to read/write your configuration from/to',
    type: 'string',
    default: path.join(os.homedir(), '.npmrc')
  })
  .option('registry', {
    describe: 'the registry to talk to',
    type: 'string'
  })
  .option('otp', {
    describe: 'a one time password',
    type: 'string'
  })
  .command({
    command: 'adduser [<username>] [<email>]',
    desc: 'adduser a new account',
    handler: run('adduser')
  })
  .command({
    command: 'login [<username>]',
    desc: 'login to an existing account',
    handler: run('login')
  })
  .command({
    command: 'token [create|list|delete]',
    desc: 'create and remove authentication tokens',
    builder: yargs => yargs
      .command({
        command: 'create [--readonly] [--cidr]',
        desc: 'create a new authentication token',
        handler: run('token', 'create'),
        builder: yargs => yargs
          .option('readonly', {
            type: 'boolean'
          })
          .option('cidr', {
            type: 'string'
          })
      })
      .command({
        command: 'list',
        desc: 'list all authentication tokens that this account has',
        handler: run('token', 'list')
      })
      .command({
        command: 'delete <id>',
        aliases: [ 'rm' ],
        desc: 'remove an authentication token',
        handler: run('token', 'rm')
      })
  })
  .command({
    command: 'get [<property>]',
    desc: 'get the value of a profile property',
    handler: run('get')
  })
  .command({
    command: 'set <property> [<value>]',
    desc: 'set the value of a profile property',
    handler: run('set')
  })
  .command({
    command: '2fa [status|enable|disable]',
    aliases: [ 'tfa' ],
    desc: 'control two factor authentication for this account',
    builder: yargs => yargs
      .command({
        command: 'status',
        desc: 'get the status of 2fa for the current login',
        handler: run('tfa', 'status')
      })
      .command({
        command: 'enable <mode>',
        desc: 'enable 2fa for the current login (mode: auth-only, auth-and-writes)',
        handler: run('tfa', 'enable')
      })
      .command({
        command: 'disable',
        desc: 'disable 2fa for the current login',
        handler: run('tfa', 'disable')
      })
  })
  .demandCommand()
  .help()
  .argv

if (!running) {
  console.error('Invalid command:', argv._[0], '\n')
  yargs.showHelp()
  process.exit(1)
}

function run (cmd, subcmd) {
  return argv => {
    running = true
    const args = [argv].concat(argv._.slice(1).map(v => String(v)))
    if (!argv.registry) {
      const conf = npmrc.read(argv.config)
      argv.registry = conf.registry || 'http://registry.npmjs.org'
    }
    Bluebird.try(() => {
      let action = require(`./cmds/${cmd}.js`)
      if (subcmd) action = action[subcmd]
      return action.apply(null, args)
    }).error(ex => {
      console.error(ex.stack)
      process.exit(1)
    }).catch(ex => {
      console.error(ex.stack || ex)
      process.exit(1)
    })
  }
}
