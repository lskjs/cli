#!/usr/bin/env node
const { shell, run, findBin, shellParallel } = require('@lskjs/cli-utils');

async function main({ isRoot, ctx, args }) {
  if (isRoot) {
    await shellParallel(`lsk run build:nest`, { ctx });
    return;
  } 
  const isWatch = args.includes('--watch');
  if (isWatch) {
    await shell(`${findBin('nest')} start --debug --watch`, { ctx });
    } else {
      await shell(`${findBin('nest')} build`, { ctx });
    }
}

run(main);
