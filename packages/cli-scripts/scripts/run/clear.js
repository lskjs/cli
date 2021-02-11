#!/usr/bin/env bash
const { shell, run, findBin } = require("@lskjs/cli-utils");

const main = async () => {
  await shell(`${findBin("lerna")} exec -- lsk run clear`);
  await shell(`rm -rf node_modules`);
};

run(main);
