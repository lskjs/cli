#!/usr/bin/env node
const { run, shell, findBin } = require("@lskjs/cli-utils");

const main = async () => {
  const commands = ["lsk run dev:cra", "lsk run dev:server"];
  const cmd = commands.map((c) => `"${c}"`).join(" ");
  await shell(`${findBin("concurrently")} -rki ${cmd} `);
};

run(main);
