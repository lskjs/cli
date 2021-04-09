#!/usr/bin/env node
/* eslint-disable max-len */
/* eslint-disable no-console */
const { shell, drawLogo } = require('@lskjs/cli-utils');
const { Command, flags } = require('@oclif/command');
const { isDebug } = require('@lskjs/cli-utils');
const { printInfo } = require('../utils');

async function gitDownload(uri, { dest, depth = 1, rm = true } = {}) {
  let url;
  let git;
  let branch;
  try {
    url = new URL(uri);
  } catch (err) {
    git = 'https://github.com/lskjs/kit.git';
    branch = uri;
  }
  if (url) {
    if (url.hostname === 'github.com') {
      const paths = url.pathname.split('/');
      if (!paths[1]) throw '!invalid url';
      git = `https://github.com/${paths[0]}/${paths[1]}.git`;
      if (paths[2] === 'tree') {
        // eslint-disable-next-line prefer-destructuring
        branch = paths[3];
      }
    } else {
      throw '!github';
    }
  }
  await shell(`git clone --depth=${depth} ${branch ? `-b ${branch}` : ''} ${git} ${dest}`);
  if (rm) await shell(`rm -rf ${dest}/.git`, { debug: 1 });
}

class InitCommand extends Command {
  async run() {
    const {
      args: { projectName },
      flags: { template },
    } = this.parse(InitCommand);
    this.log('===== 🚀 Preparing for launght 🚀 =====');
    printInfo(this);
    this.log("============ 🚀 Let's go 🚀 ============");

    await gitDownload(template || 'https://github.com/lskjs/kit.git', {
      dest: projectName,
    });

    // await shell(`git clone --depth=1 https://github.com/lskjs/kit.git ${projectName} && rm -rf ${projectName}/.git`);
    this.log('====== 🚀 First stage dropped 🚀 ======');
    const npmInstallParams = isDebug() ? '' : '--no-fund --no-audit --loglevel=error';
    // await shell(
    //   `npm i ${npmInstallParams} -g lerna nodemon npm-check-updates`,
    //   {
    //     cwd: projectName,
    //   }
    // );
    const cwd = `${process.cwd()}/${projectName}`;
    await shell(`npm i ${npmInstallParams}`, { cwd });
    this.log('====== 🚀 Second stage dropped 🚀 ======');
    await shell(`lsk run bootstrap`, { cwd });
    this.log('======== 🚀 Landed successful 🚀 =========');
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
    name: 'projectName',
    required: true,
  },
];

InitCommand.flags = {
  template: flags.string({
    char: 't',
    description:
      'An example to bootstrap the app with. You can use an example name from the LSK.js repo or a GitHub URL. The URL can use any branch and/or subdirectory.',
  }),
};

module.exports = InitCommand;
