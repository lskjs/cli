#!/usr/bin/env node
/* eslint-disable no-console */
const { shell, drawLogo } = require("@lskjs/cli-utils");
const { Command } = require("@oclif/command");

class InitCommand extends Command {
  async run() {
    const { args } = this.parse(InitCommand);
    const { projectName } = args;
    drawLogo(this);
    await shell(`git clone https://github.com/lskjs/kit.git ${projectName}`);
    await shell(`rm -rf ${projectName}/.git`);
    await shell(`npm i`, { cwd: projectName });
    await shell(`npm run bootstrap`, { cwd: projectName });
    console.log(`============= SUCCESS =============`);
    console.log(`now you should do: cd ${projectName} && npm run dev`);
  }
}

InitCommand.description = `Init new LSK.js project
...
Extra documentation goes here
`;

InitCommand.args = [
  {
    name: "projectName",
    required: true,
  },
];

module.exports = InitCommand;
