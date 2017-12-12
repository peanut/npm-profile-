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
=====
> Stability: 2 - Stable

The `os` module provides a number of operating system-related utility methods.
It can be accessed using:

```js
const os = require('os');
```






npmrc
=====

Switch between different .npmrc files with ease and grace.

Overview
--------

If you use a private npm registry, you know the pain of switching between a
bunch of different .npmrc files and manually managing symlinks. Let that be a
problem no more! `npmrc` is here to save the day, by making it dead simple to
switch out your .npmrc with a specific named version. It also tries to protect
you from your own stupid self by making sure you don't accidentally overwrite an
.npmrc that you actually want to keep.


Installation
------------

``` sh
npm install -g npmrc
```

Usage
-----

```
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
```

#### Initialisation

Calling `npmrc` without arguments creates an `~/.npmrcs/` directory if it doesn't exist,
and copies your current `~/.npmrc` as the 'default' .npmrc profile.

```
➜  ~  npmrc
Creating /Users/conrad/.npmrcs
Making /Users/conrad/.npmrc the default npmrc file
Activating .npmrc 'default'
```

#### Create a new .npmrc profile

```
➜  ~  npmrc -c newprofile
Removing old .npmrc (/home/rvagg/.npmrcs/default)
Activating .npmrc 'newprofile'
```

A blank profile will be created. To point your profile to a non-default registry:

```
➜  ~  npm config set registry http://npm.nodejs.org.au:5984/registry/_design/app/_rewrite
```

Then use `npm adduser` or `npm login` to authenticate with the new profile.


#### List available .npmrc profiles

```
➜  ~  npmrc 
Available npmrcs:
    
* default
  work
```

#### Switch to a specific .npmrc 

```
➜  ~  npmrc work
Removing old .npmrc (/Users/conrad/.npmrcs/default)
Activating .npmrc 'work'
```

You can also pass only the first few characters of a profile and `npmrc` will
autocomplete the profile's name.

```
➜  ~  npmrc def
Removing old .npmrc (/Users/conrad/.npmrcs/work)
Activating .npmrc 'default'
```

`npmrc <name>` will also go to some lengths to make sure you don't overwrite
anything you might care about:

```
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
```

