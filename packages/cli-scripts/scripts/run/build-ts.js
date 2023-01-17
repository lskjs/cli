#!/usr/bin/env node
const { run, shell, shellParallel, getCwdInfo, findBin } = require('@lskjs/cli-utils');

async function main({ isRoot, ctx, cwd, args } = {}) {
  if (isRoot) {
    await shellParallel(`lsk run buiild:ts`, { ctx });
    return;
  }
  const isWatch = args.includes('--watch');
  const isProd = process.env.NODE_ENV === 'production' || args.includes('--prod');
  const { isLib } = getCwdInfo({ cwd });
  let cmd = findBin('tsup');
  if (isWatch) cmd = `${cmd} --watch`;
  if (isProd) cmd = `${cmd} --env.NODE_ENV production`;
  if (isWatch && !isLib) cmd = `${cmd} --onSuccess "node lib"`;
  await shell(cmd, { ctx });
}

module.exports = run(main);
