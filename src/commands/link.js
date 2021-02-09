#!/usr/bin/env node
const ready = require('@lskjs/utils/polyfill');
const {shell} = require('@lskjs/sh/shell')
const {Command, flags} = require('@oclif/command')

class LinkCommand extends Command {
  async run() {
    const { args, flags } = this.parse(LinkCommand)
    const {from, to} = args
    const {nodemodules, git} = flags
    console.log({nodemodules})
    // TODO: catch err
    // # https://github.com/watchexec/watchexec
    // # `brew install watchexec`

    const excludes = [
      !nodemodules ? '--exclude node_modules' : null,
      !git ? '--exclude .git' : null,
    ].filter(Boolean).join(' ')
    await shell(`watchexec -r -w ${from} --signal SIGTERM -- rsync -aE --progress ${excludes} ${from}/ ${to}`)
  }
}

LinkCommand.description = `Link npm packages and watch changes
...
Extra documentation goes here
`

LinkCommand.args = [
  {
    name: 'from',
    required: true,
  },
  {
    name: 'to',
    required: true,
  },
]

LinkCommand.flags = {
  nodemodules: flags.string({char: 'n', description: 'watch node_modules'}),
  git: flags.string({char: 'g', description: 'watch .git'}),
}

module.exports = LinkCommand
