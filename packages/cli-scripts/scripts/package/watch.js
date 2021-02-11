#!/usr/bin/env node
const { run, shell } = require("@lskjs/cli-utils");

const main = async () => {
  const dist = process.env.DIST;
  let params = process.env.BUILD_PARAMS || "---copy-files";
  params += " --watch";
  await shell(`DEBUG=1 DIST=${dist} BUILD_PARAMS=${params} lsk run build`);
};

run(main);
