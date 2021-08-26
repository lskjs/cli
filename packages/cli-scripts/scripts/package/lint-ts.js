#!/usr/bin/env node
const { shell, run, hasTs, findBin } = require('@lskjs/cli-utils');

const DIST = process.env.DIST || 'build';
async function main() {
  const tsGrepPath = `${process.cwd()}/src/**/*.ts`;
  const isHasTs = hasTs(tsGrepPath) || hasTs(`${tsGrepPath}x`);
  if (isHasTs) {
    // NOTE: Why? https://github.com/babel/babel/issues/9668#issuecomment-602221154
    await shell(`${findBin('tsc')} --project tsconfig.types.json --outDir ${DIST}`);
  }
}

run(main);
