#!/usr/bin/env node
/* eslint-disable max-len */
const { shell, checkSoft } = require('@lskjs/cli-utils');
const { Command, flags } = require('@oclif/command');

class LinkCommand extends Command {
  async run() {
    await checkSoft(['rsync', 'watchexec']);

    const {
      args: { from, to },
      flags: { nodemodules, git },
    } = this.parse(LinkCommand);
    // TODO: catch err
    // # https://github.com/watchexec/watchexec
    // # `brew install watchexec`

    const excludes = [!nodemodules ? '--exclude node_modules' : null, !git ? '--exclude .git' : null]
      .filter(Boolean)
      .join(' ');
    await shell(
      `watchexec -r -w ${from} --signal SIGTERM -- rsync -aEn --delete-after --perms --progress ${excludes} ${from}/ ${to}/`,
    );
  }
}

LinkCommand.description = `Link npm packages and watch changes
...
Extra documentation goes here
`;

LinkCommand.args = [
  {
    name: 'from',
    required: true,
  },
  {
    name: 'to',
    required: true,
  },
];

LinkCommand.flags = {
  nodemodules: flags.string({
    char: 'n',
    description: 'watch node_modules folder',
  }),
  git: flags.string({ char: 'g', description: 'watch .git folder' }),
};

module.exports = LinkCommand;
