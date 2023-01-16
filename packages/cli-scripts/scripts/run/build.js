#!/usr/bin/env node
const { run, shell, getCwdInfo, joinArgs } = require('@lskjs/cli-utils');

async function main({ isRoot, log, cwd, args } = {}) {
  if (isRoot) {
    await shell(`pnpm -r run build ${joinArgs(args)}`);
    return;
  } 
  const isWatch = args.includes('--watch');
    const { isJs, isTs, isNest } = getCwdInfo({ cwd });
    let wasBuild;
    if (isNest) {
      await shell(`lsk run build:nest ${joinArgs(args)}`, { ctx });
   
    } else if (isJs) {
      await shell(`lsk run build:js ${joinArgs(args)}`, { ctx });
      wasBuild = 1;
    } else if (isTs) {
      await shell(`lsk run build:ts ${joinArgs(args)}`, { ctx });
      wasBuild = 1;
    }
    if (!wasBuild) {
      log.trace('build skip');
    }
    // await pathexec('build-after');
}

module.exports = run(main);
