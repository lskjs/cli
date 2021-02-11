# LSK.js – CLI

> LSK.js CLI (Command Line Interface) is the easiest way to create and manage LSK.js project.

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit&label&color=red&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/image)](https://www.npmjs.com/package/@lskjs/cli)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/cli)](https://www.npmjs.com/package/@lskjs/cli)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/cli)](https://bundlephobia.com/result?p=@lskjs/cli)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/cli)](https://www.npmjs.com/package/@lskjs/cli)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/cli)](https://bundlephobia.com/result?p=@lskjs/cli)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/cli)](https://bundlephobia.com/result?p=@lskjs/cli)
[![License](https://badgen.net//github/license/lskjs/cli)](https://github.com/cli/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- ## Getting Started -->

<!-- toc -->
* [LSK.js – CLI](#lskjs--cli)
* [Quick start](#quick-start)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

<!-- quickstart -->
# Quick start
```sh-session
$ npx lsk init test3
...waiting...
============= SUCCESS =============
now you should do: cd test3 && npm run dev
```
<!-- quickstarttop -->

![LSK.js – CLI](/blog/init.jpg)

# Usage
<!-- usage -->
```sh-session
$ npm install -g @lskjs/cli
$ lsk COMMAND
running command...
$ lsk (-v|--version|version)
@lskjs/cli/2.2.2 darwin-x64 node-v15.8.0
$ lsk --help [COMMAND]
USAGE
  $ lsk COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`lsk help [COMMAND]`](#lsk-help-command)
* [`lsk info`](#lsk-info)
* [`lsk init PROJECTNAME`](#lsk-init-projectname)
* [`lsk link FROM TO`](#lsk-link-from-to)
* [`lsk run SCRIPT`](#lsk-run-script)
* [`lsk update`](#lsk-update)

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

## `lsk info`

```
USAGE
  $ lsk info
```

_See code: [src/commands/info.js](https://github.com/lskjs/cli/blob/v2.2.2/src/commands/info.js)_

## `lsk init PROJECTNAME`

Init new LSK.js project

```
USAGE
  $ lsk init PROJECTNAME

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/init.js](https://github.com/lskjs/cli/blob/v2.2.2/src/commands/init.js)_

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

_See code: [src/commands/link.js](https://github.com/lskjs/cli/blob/v2.2.2/src/commands/link.js)_

## `lsk run SCRIPT`

```
USAGE
  $ lsk run SCRIPT

OPTIONS
  -e, --explain=explain  explain of path
```

_See code: [src/commands/run.js](https://github.com/lskjs/cli/blob/v2.2.2/src/commands/run.js)_

## `lsk update`

```
USAGE
  $ lsk update
```

_See code: [src/commands/update.js](https://github.com/lskjs/cli/blob/v2.2.2/src/commands/update.js)_
<!-- commandsstop -->



## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://isuvorov.com.com"><img src="https://avatars2.githubusercontent.com/u/1056977?v=4" width="100px;" alt=""/><br /><sub><b>Igor Suvorov</b></sub></a><br /><a href="#question-isuvorov" title="Answering Questions">💬</a> <a href="isuvorov/lib-starter-kit/isuvorov/lib-starter-kit/commits?author=isuvorov" title="Code">💻</a> <a href="#design-isuvorov" title="Design">🎨</a> <a href="isuvorov/lib-starter-kit/isuvorov/lib-starter-kit/commits?author=isuvorov" title="Documentation">📖</a> <a href="#example-isuvorov" title="Examples">💡</a> <a href="#ideas-isuvorov" title="Ideas, Planning, & Feedback">🤔</a> <a href="isuvorov/lib-starter-kit/isuvorov/lib-starter-kit/pulls?q=is%3Apr+reviewed-by%3Aisuvorov" title="Reviewed Pull Requests">👀</a> <a href="isuvorov/lib-starter-kit/isuvorov/lib-starter-kit/commits?author=isuvorov" title="Tests">⚠️</a> <a href="#a11y-isuvorov" title="Accessibility">️️️️♿️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
