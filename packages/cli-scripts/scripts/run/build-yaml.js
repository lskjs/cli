#!/usr/bin/env node
const { run, shell } = require('@lskjs/cli-utils');

const main = async ({ ctx }) => {
  await shell('lsk run build:docker-stack', { ctx });
  await shell('lsk run build:gitlab-ci', { ctx });
};

module.exports = run(main);
