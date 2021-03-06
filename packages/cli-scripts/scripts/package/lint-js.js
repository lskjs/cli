#!/usr/bin/env node
const { shell, run, findBin } = require('@lskjs/cli-utils');

const main = async (initParams) => {
  const argv = process.argv.slice(2);
  const params =
    '--cache --cache-location=.cache/eslint --ext .js,.jsx,.json,.ts,.tsx --report-unused-disable-directives';
  await shell(`NODE_ENV=production ${findBin('eslint')} ${params} src ${argv}`).catch((err) => {
    // eslint-disable-next-line no-console
    console.error({ err });
  });
};

run(main);
