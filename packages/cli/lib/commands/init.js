#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitCommand = void 0;
/* eslint-disable max-len */
// @ts-ignore
const cli_utils_1 = require("@lskjs/cli-utils");
const command_1 = require("@oclif/command");
const utils_1 = require("../utils");
class InitCommand extends command_1.Command {
    async run() {
        const { args: { projectName }, flags: { template }, } = this.parse(InitCommand);
        this.log('===== 🚀 Preparing for launght 🚀 =====');
        (0, utils_1.printInfo)(this);
        this.log("============ 🚀 Let's go 🚀 ============");
        await (0, utils_1.gitDownload)(template || 'https://github.com/lskjs/kit.git', {
            dest: projectName,
        });
        // await shell(`git clone --depth=1 https://github.com/lskjs/kit.git ${projectName} && rm -rf ${projectName}/.git`);
        this.log('====== 🚀 First stage dropped 🚀 ======');
        const npmInstallParams = (0, cli_utils_1.isDebug)() ? '' : '--no-fund --no-audit --loglevel=error';
        // await shell(
        //   `npm i ${npmInstallParams} -g lerna nodemon npm-check-updates`,
        //   {
        //     cwd: projectName,
        //   }
        // );
        const cwd = `${process.cwd()}/${projectName}`;
        await (0, cli_utils_1.shell)(`npm i ${npmInstallParams}`, { cwd });
        this.log('====== 🚀 Second stage dropped 🚀 ======');
        await (0, cli_utils_1.shell)(`lsk run bootstrap`, { cwd });
        this.log('======== 🚀 Landed successful 🚀 =========');
        (0, cli_utils_1.drawLogo)(this);
        this.log(``);
        this.log(`now you should do: cd ${projectName} && npm run dev`);
        this.log(``);
        this.log(`========= 🚀 CONGRATULATION 🚀 =========`);
    }
}
exports.InitCommand = InitCommand;
InitCommand.description = `Init new LSK.js project
...
Extra documentation goes here
`;
InitCommand.args = [
    {
        name: 'projectName',
        required: true,
    },
];
InitCommand.flags = {
    template: command_1.flags.string({
        char: 't',
        description: 'An example to bootstrap the app with. You can use an example name from the LSK.js repo or a GitHub URL. The URL can use any branch and/or subdirectory.',
    }),
};
exports.default = InitCommand;
