lsk
===



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/lsk.svg)](https://npmjs.org/package/lsk)
[![Downloads/week](https://img.shields.io/npm/dw/lsk.svg)](https://npmjs.org/package/lsk)
[![License](https://img.shields.io/npm/l/lsk.svg)](https://github.com/isuvorov/lsk/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g lsk
$ lsk COMMAND
running command...
$ lsk (-v|--version|version)
lsk/1.7.0 darwin-x64 node-v15.6.0
$ lsk --help [COMMAND]
USAGE
  $ lsk COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`lsk help [COMMAND]`](#lsk-help-command)
* [`lsk init PROJECTNAME`](#lsk-init-projectname)
* [`lsk link FROM TO`](#lsk-link-from-to)
* [`lsk run SCRIPT`](#lsk-run-script)

## `lsk help [COMMAND]`

display help for lsk

```
USAGE
  $ lsk help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `lsk init PROJECTNAME`

Init new LSK.js project

```
USAGE
  $ lsk init PROJECTNAME

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/init.js](https://github.com/lskjs/cli/blob/v1.7.0/src/commands/init.js)_

## `lsk link FROM TO`

Link npm packages and watch changes

```
USAGE
  $ lsk link FROM TO

OPTIONS
  -g, --git=git                  watch .git folder
  -n, --nodemodules=nodemodules  watch node_modules folder

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/link.js](https://github.com/lskjs/cli/blob/v1.7.0/src/commands/link.js)_

## `lsk run SCRIPT`

```
USAGE
  $ lsk run SCRIPT
```

_See code: [src/commands/run.js](https://github.com/lskjs/cli/blob/v1.7.0/src/commands/run.js)_
<!-- commandsstop -->
