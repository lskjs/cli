#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const { run, shell, shellParallel } = require('@lskjs/cli-utils');

const main = async ({ isRoot, args, log, cwd, ctx } = {}) => {
  if (isRoot) {
    const passArgs = args.filter((a) => a !== '--');
    await shellParallel(`lsk run show ${passArgs.join(' ')}`, { ctx });
  } else {
    const package = require(`${cwd}/package.json`);
    const packageName = package.name;
    args.forEach((arg) => {
      if (arg.startsWith('--')) {
        const key = arg.replace('--', '');
        log.info(packageName.padEnd(20), `[${key}]`, package[key]);
      }
    });
  }
};

module.exports = run(main);
