#!/usr/bin/env node
const { shell, run, findBin } = require("@lskjs/cli-utils");

const main = async () => {
  const params =
    "--cache --cache-location=.cache/eslint --ext .js,.jsx,.json,.ts,.tsx --report-unused-disable-directives";
  await shell(`NODE_ENV=production ${findBin("eslint")} ${params} src`);
};

run(main);
