#!/usr/bin/env node
const { run, shell, findBin } = require("@lskjs/cli-utils");

const main = async () => {
  await shell("npm audit fix");
  await shell(`${findBin("lerna")} exec --parallel --no-bail -- npm audit fix`);
};

run(main);
