#!/usr/bin/env node
const { shell, run } = require("@lskjs/cli-utils");

const main = async () => {
  const cwd = `${process.cwd()}/.storybook`;

  await shell(`lsk run npm:install`, { cwd });
  await shell(`rm -f packages/node_module`);
  await shell(`ln -s /node_modules ../packages/node_modules`);
};

run(main);
