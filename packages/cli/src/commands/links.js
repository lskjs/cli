#!/usr/bin/env node
/* eslint-disable max-len */
const { checkSoft, linkAll } = require('@lskjs/cli-utils');
const { Command, flags } = require('@oclif/command');

class LinksCommand extends Command {
  async run() {
    const {
      args: { config: configPath },
      flags: { nodemodules, git },
    } = this.parse(LinksCommand);
    await checkSoft(['rsync']);
    // eslint-disable-next-line import/no-dynamic-require
    const config = require(`${process.cwd()}/${configPath}`);
    await linkAll(config, { nodemodules, git });
  }
}

LinksCommand.description = `Recursive watching and incremental copy dirs with rsync
...
`;

LinksCommand.args = [
  {
    name: 'config',
    required: true,
  },
];

LinksCommand.flags = {
  nodemodules: flags.string({
    char: 'n',
    description: 'include node_modules folder',
  }),
  git: flags.string({ char: 'g', description: 'include .git folder' }),
};

module.exports = LinksCommand;
