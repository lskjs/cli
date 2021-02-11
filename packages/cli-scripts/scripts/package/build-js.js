#!/usr/bin/env node
/* eslint-disable no-console */
const { shell, run, hasTs } = require('@lskjs/cli-utils');
// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies

const DIST = process.env.DIST || 'build';
const BUILD_PARAMS = process.env.BUILD_PARAMS || '--copy-files';

async function main() {
  if (process.env.DEBUG) console.log(`DIST=${DIST} BUILD_PARAMS=${BUILD_PARAMS}`);
  await shell(`mkdir -p ${DIST}`);
  await shell(`cp -R package.json package-lock.json README.md ${DIST}/`);
  // --minified
  await shell(`babel src --out-dir ${DIST} --source-maps both --extensions ".js,.jsx,.ts,.tsx" ${BUILD_PARAMS}`);

  if (hasTs()) {
    // NOTE: Why? https://github.com/babel/babel/issues/9668#issuecomment-602221154
    await shell(`tsc --project tsconfig.types.json --outDir ${DIST}`);
  }
  // #  --minified
}

run(main);
