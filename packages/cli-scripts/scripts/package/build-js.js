#!/usr/bin/env node
const { shell, run, hasTs, findBin } = require("@lskjs/cli-utils");

const DIST = process.env.DIST || "build";
const BUILD_PARAMS = process.env.BUILD_PARAMS || "--copy-files";

async function main() {
  await shell(`mkdir -p ${DIST}`);
  await shell(`cp -R package.json package-lock.json README.md ${DIST}/`);
  // --minified
  // const babel = "../../node_modules/@babel/cli/bin/babel.js";
  await shell(
    `${findBin(
      "babel"
    )} src --out-dir ${DIST} --source-maps both --extensions ".js,.jsx,.ts,.tsx" ${BUILD_PARAMS}`
  );

  if (hasTs(`${process.cwd()}/src/**/**.tsx?`)) {
    // NOTE: Why? https://github.com/babel/babel/issues/9668#issuecomment-602221154
    await shell(
      `${findBin("tsc")} --project tsconfig.types.json --outDir ${DIST}`
    );
  }
}

run(main);
