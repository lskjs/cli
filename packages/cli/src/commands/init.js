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
    this.log("===== 🚀 Preparing for launght 🚀 =====");
    printInfo(this);
    this.log("============ 🚀 Let's go 🚀 ============");
    await shell(
      `git clone --depth=1 https://github.com/lskjs/kit.git ${projectName}` &&
        `rm -rf ${projectName}/.git`
    );
    this.log("====== 🚀 First stage dropped 🚀 ======");
    const npmInstallParams = isDebug()
      ? ""
      : "--no-fund --no-audit --loglevel=error";
    await shell(
      `npm i ${npmInstallParams} -g lerna nodemon npm-check-updates`,
      {
        cwd: projectName,
      }
    );
    await shell(`npm i ${npmInstallParams}`, { cwd: projectName });
    this.log("====== 🚀 Second stage dropped 🚀 ======");
    await shell(`lsk run bootstrap`, { cwd: projectName });
    this.log("======== 🚀 Landed successful 🚀 =========");
    drawLogo(this);
    this.log(``);
    this.log(`now you should do: cd ${projectName} && npm run dev`);
    this.log(``);
    this.log(`========= 🚀 CONGRATULATION 🚀 =========`);
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
