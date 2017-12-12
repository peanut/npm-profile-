npm-profile-cli
---------------

A minimal CLI for taking actions against your npmjs.com profile.  Is a
wrapper around the `npm-profile` library.

针对您的npmjs.com个人资料采取行动的最小CLI。是npm-profile图书馆的包装。

```
npm-profile <cmd> <args>

Commands(命令):

.command方法有三个接口

.command(cmd, desc, [builder], [handler])

.command(cmd, desc, [module])

.command(module)
其实它们的用法都差不多，可以把它们都看作传递一个module给yargs，这个module必须导出四个变量
cmd, desc [builder], [handler]，其中builder和handler是方法，另外两个是字符串

  adduser [<username>] [<email>]  adduser a new account  //添加一个新账户
  login [<username>]              login to an existing account      //登录到现有帐户
  token [create|list|delete]      create and remove authentication tokens     //创建和删除身份验证令牌       
  get [<property>]                get the value of a profile property       //获取配置文件属性的值
  set <property> <value>          set the value of a profile property       //设置配置文件属性的值
  2fa [status|enable|disable]     control two factor authentication for this   
                                  account                         [aliases: tfa]  //控制此帐户的双因素身份验证
  2fa status(状态)         get the status of 2fa for the current login         //得到当前登录的2fa的现状
  2fa disable(禁用)        disable 2fa for the current login             //禁用2fa当前登录
  2fa enable <mode>(使用模式)    enable 2fa for the current login        //使2fa当前登录 
    <mode> can be one of(两种模式):
      auth-only - Require two-factor authentication only when logging in  //只有在登录时才需要双因素身份验证。
      auth-and-writes - Require two-factor authentication when logging in AND when publishing  //在登录和发布时需要双因素身份验证


Options(选项):
  --config(配置)  the npmrc to read/write your configuration from/to              
                                     [string] [default: "/Users/rebecca/.npmrc"]    //npmrc的读/写你的配置的写入(string类型)
  --registry(注册表)  the registry to talk to                            [string]   //要处理的注册表(string类型)
  --otp(身份认证系统)      a one time password                          [string]     //一次性密码(string类型)
  --help      Show help                                                [boolean]    //显示帮助(boolean类型)
```

OS

稳定性：2 - 稳定
该os模块提供了许多与操作系统相关的实用程序方法。它可以通过以下方式访问：

const  os  =  require（' os '）;
npmrc

轻松和优雅地切换不同的.npmrc文件。

概观

如果您使用私有的npm注册表，您将知道在一堆不同的.npmrc文件之间切换以及手动管理符号链接的麻烦。让这成为一个问题不再！npmrc在这里是为了节省一天的时间，通过使用一个特定的命名版本来切换你的.npmrc非常简单。它还试图保护你免受你自己愚蠢的自我，确保你不会意外覆盖你实际想保留的.npmrc。

安装

npm install -g npmrc
用法

➜  ~  npmrc --help

npmrc

  Switch between different .npmrc files with ease and grace.

Usage:
  npmrc                 list all profiles
  npmrc [name]          change npmrc profile (uses fuzzy matching)
  npmrc -c [name]       create a new npmrc profile called name
  npmrc -r [registry]   use an npm mirror

Available mirrors for npmrc -r:
  au      - Australian registry mirror
  eu      - European registry mirror
  cn      - Chinese registry mirror
  default - Default registry
初始化

npmrc不带参数的调用将创建一个~/.npmrcs/不存在的目录，并将当前的目录复制~/.npmrc为默认的.npmrc配置文件。

➜  ~  npmrc
Creating /Users/conrad/.npmrcs
Making /Users/conrad/.npmrc the default npmrc file
Activating .npmrc 'default'
创建一个新的.npmrc配置文件

➜  ~  npmrc -c newprofile
Removing old .npmrc (/home/rvagg/.npmrcs/default)
Activating .npmrc 'newprofile'
一个空白的配置文件将被创建。要将您的配置文件指向非默认注册表：

➜  ~  npm config set registry http://npm.nodejs.org.au:5984/registry/_design/app/_rewrite
然后使用npm adduser或使用npm login新的配置文件进行身份验证。

列出可用的.npmrc配置文件

➜  ~  npmrc 
Available npmrcs:
    
* default
  work
切换到特定的.npmrc

➜  ~  npmrc work
Removing old .npmrc (/Users/conrad/.npmrcs/default)
Activating .npmrc 'work'
您也可以只传递配置文件的前几个字符，并npmrc自动完成配置文件的名称。

➜  ~  npmrc def
Removing old .npmrc (/Users/conrad/.npmrcs/work)
Activating .npmrc 'default'
npmrc <name> 也会花一些时间来确保你不会覆盖你可能关心的任何东西：

➜  ~  npmrc default
Removing old .npmrc (/Users/conrad/.npmrcs/work)
Activating .npmrc 'default'
➜  ~  npmrc default  
Current .npmrc (/Users/conrad/.npmrc) is already 'default' (/Users/conrad/.npmrcs/default)
➜  ~  rm ~/.npmrc
➜  ~  touch ~/.npmrc
➜  ~  npmrc default
Current .npmrc (/Users/conrad/.npmrc) is not a regular file, not removing it
➜  ~  rm ~/.npmrc
➜  ~  npmrc default
Activating .npmrc 'default'
