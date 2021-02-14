#!/usr/bin/env node
const { run, findPath, shell } = require("@lskjs/cli-utils");
const runTemplate = require("remark-template/run");
const getBaseFile = require("remark-template/getFile");

const getFile = (name) => {
  // console.log({name})
  const path = findPath(name);
  // console.log({path})
  if (!path) return "";
  const res = getBaseFile(path);
  return res;
};

const main = async () => {
  const bodyPath = findPath("scripts/templates/body.md", {
    dirs: 1,
    nodemodules: 0,
  });
  if (!bodyPath) {
    await shell(`rm -rf README.md`);
    return;
  }
  await runTemplate({
    from: "scripts/templates/index.md",
    to: "README.md",
    getFile,
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.error({ err });
  });
};

module.exports = run(main);
