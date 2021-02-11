#!/usr/bin/env node
/* eslint-disable no-console */
const { shell, drawLogo } = require("@lskjs/cli-utils");
const { Command } = require("@oclif/command");
const { isDebug } = require("@lskjs/cli-utils");
const { printInfo } = require("../utils");

class InitCommand extends Command {
  async run() {
    const {
      args: { projectName },
    } = this.parse(InitCommand);
    printInfo(this);
    this.log("============ 🚀 Let's go 🚀 ============");
    await shell(`git clone https://github.com/lskjs/kit.git ${projectName}`);
    await shell(`rm -rf ${projectName}/.git`);
    const npmInstallParams = isDebug()
      ? ""
      : "--no-fund --no-audit --loglevel=error";
    await shell(`npm i ${npmInstallParams}`, { cwd: projectName });
    await shell(`lsk run bootstrap`, { cwd: projectName });
    console.log(`============= SUCCESS =============`);
    console.log(`now you should do: cd ${projectName} && npm run dev`);
    this.log("======== 🚀 Landed successful 🚀 =========");
    drawLogo(this);
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
