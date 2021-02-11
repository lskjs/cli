#!/usr/bin/env node

const { run, shell } = require("@lskjs/cli-utils");

const main = async () => {
  await shell("rm -rf cra/src");
  await shell("rm -rf cra/public/assets");
  await shell("ln -s src cra/src");
  await shell("cp -R public/assets cra/public/assets").catch(() => {
    // ignoring error
  });
  await shell("SKIP_PREFLIGHT_CHECK=true npm start", { cwd: "cra" });
};

run(main);
