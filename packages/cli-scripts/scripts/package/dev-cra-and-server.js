#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell } = require("@lskjs/cli-utils");

const main = async () => {
  const commands = ["lsk run dev:cra", "lsk run dev:server"];
  const cmd = commands.map((c) => `"${c}"`).join(" ");
  await shell(`concurrently -rki ${cmd} `);
};

run(main);
