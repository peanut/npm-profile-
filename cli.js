<<<<<<< HEAD
#!/usr/bin/env node
'use strict'
const os = require('os')
const path = require('path')
const Bluebird = require('bluebird')
const log = require('npmlog')
const yargs = require('yargs')
const npmrc = require('./cmds/util/npmrc.js')
=======
#!/usr/bin/env node      //脚本用env启动的原因，是因为脚本解释器在linux中可能被安装于不同的目录，env可以在系统的PATH目录中查找。同时，env还规定一                          // 些系统环境变量。
'use strict'             //严格模式
const os = require('os')   //os模块，可以用来获取操作系统相关的信息和机器物理信息，例如操作系统平台，内核，cpu架构，内存，cpu，网卡等信息。
const path = require('path')      //path模块提供了一些工具函数，用于处理文件与目录的路径。
const Bluebird = require('bluebird')     //bluebird提供了一个非常有用的功能来promise化不返回promise的模块。比如，promise化fs模块，只需要简单地                                          //require bluebird模块和一个被promise化的fs模块。
const log = require('npmlog')            //nodejs默认的采用是morgan的日志系统，一般显示的结果都是在控制台输出，当重启服务器的时候，这些信息就会                                          //丢失，无法长久保存，因此，我们考虑采用新的log机制，
const yargs = require('yargs')           //yargs是一个npm模块用来完成命令行参数解析,
const npmrc = require('./cmds/util/npmrc.js')   //
>>>>>>> e78ece43e6c5fdee7b45ad54344576216b8ddd57

process.on('log', function (level) {
  return log[level].apply(log, [].slice.call(arguments, 1))
})

let running = false

<<<<<<< HEAD
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
=======
const argv = yargs                         //yargs提供很多接口用来帮助完善命令行程序
  .usage('npm-profile <cmd> <args>')            
  .option('config', {                         //配置      
    describe: 'the npmrc to read/write your configuration from/to',  //npmrc的读/写你的配置的写入
    type: 'string',
    default: path.join(os.homedir(), '.npmrc')    //.default()可以采用将键映射到默认值的对象
  })
  .option('registry', {                    //注册表
    describe: 'the registry to talk to',    //要处理的注册表
    type: 'string'
  })
  .option('otp', {                       //身份认证系统
    describe: 'a one time password',      //一次性密码
    type: 'string'
  })
  .command({
    command: 'adduser [<username>] [<email>]',    //添加一个新账户
    desc: 'adduser a new account',              
    handler: run('adduser')                   //运行adduser命令
  })
  .command({
    command: 'login [<username>]',       
    desc: 'login to an existing account',      //登录到现有账户
    handler: run('login')                    //运行登录命令
  })
  .command({           
    command: 'token [create|list|delete]',     
    desc: 'create and remove authentication tokens',        //创建和删除身份验证令牌
    builder: yargs => yargs                               
      .command({
        command: 'create [--readonly] [--cidr]',              
        desc: 'create a new authentication token',           //创建一个新的身份验证令牌
        handler: run('token', 'create'),               
>>>>>>> e78ece43e6c5fdee7b45ad54344576216b8ddd57
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
<<<<<<< HEAD
        desc: 'list all authentication tokens that this account has',
        handler: run('token', 'list')
      })
      .command({
        command: 'delete <id>',
        aliases: [ 'rm' ],
        desc: 'remove an authentication token',
=======
        desc: 'list all authentication tokens that this account has',       //列出此帐户拥有的所有身份验证令牌
        handler: run('token', 'list')
      })
      .command({
        command: 'delete <id>',                    
        aliases: [ 'rm' ],
        desc: 'remove an authentication token',          //删除身份验证令牌
>>>>>>> e78ece43e6c5fdee7b45ad54344576216b8ddd57
        handler: run('token', 'rm')
      })
  })
  .command({
    command: 'get [<property>]',
<<<<<<< HEAD
    desc: 'get the value of a profile property',
=======
    desc: 'get the value of a profile property',          //获取配置文件属性的值。         
>>>>>>> e78ece43e6c5fdee7b45ad54344576216b8ddd57
    handler: run('get')
  })
  .command({
    command: 'set <property> [<value>]',
<<<<<<< HEAD
    desc: 'set the value of a profile property',
=======
    desc: 'set the value of a profile property',          //设置配置文件属性的值
>>>>>>> e78ece43e6c5fdee7b45ad54344576216b8ddd57
    handler: run('set')
  })
  .command({
    command: '2fa [status|enable|disable]',
    aliases: [ 'tfa' ],
<<<<<<< HEAD
    desc: 'control two factor authentication for this account',
    builder: yargs => yargs
      .command({
        command: 'status',
        desc: 'get the status of 2fa for the current login',
=======
    desc: 'control two factor authentication for this account',        // 控制此帐户的双因素身份验证
    builder: yargs => yargs
      .command({
        command: 'status',
        desc: 'get the status of 2fa for the current login',            //得到当前登录的2fa的现状
>>>>>>> e78ece43e6c5fdee7b45ad54344576216b8ddd57
        handler: run('tfa', 'status')
      })
      .command({
        command: 'enable <mode>',
<<<<<<< HEAD
        desc: 'enable 2fa for the current login (mode: auth-only, auth-and-writes)',
=======
        desc: 'enable 2fa for the current login (mode: auth-only, auth-and-writes)',    //在登录使2fa当前登录（模式：认证，授权和写入）
>>>>>>> e78ece43e6c5fdee7b45ad54344576216b8ddd57
        handler: run('tfa', 'enable')
      })
      .command({
        command: 'disable',
<<<<<<< HEAD
        desc: 'disable 2fa for the current login',
        handler: run('tfa', 'disable')
      })
  })
  .demandCommand()
=======
        desc: 'disable 2fa for the current login',           //禁用2fa当前登录
        handler: run('tfa', 'disable')
      })
  })
  .demandCommand()                              ////提供最小需求和最小需求消息 
>>>>>>> e78ece43e6c5fdee7b45ad54344576216b8ddd57
  .help()
  .argv

if (!running) {
<<<<<<< HEAD
  console.error('Invalid command:', argv._[0], '\n')
  yargs.showHelp()
  process.exit(1)
=======
  console.error('Invalid command:', argv._[0], '\n')        //输出错误信息：无效的命令
  yargs.showHelp()
  process.exit(1)     
>>>>>>> e78ece43e6c5fdee7b45ad54344576216b8ddd57
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
