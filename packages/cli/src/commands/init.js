#!/usr/bin/env node
/* eslint-disable no-console */
const { shell } = require("../utils");
const { Command } = require("@oclif/command");
const logo = require("fs").readFileSync(`${__dirname}/logo.txt`).toString();
const { bold, red, blue, cyan, yellow, bgYellow } = require("kleur/colors");

const colors = [
  (str) => bold(red(str)),
  (str) => bold(blue(str)),
  (str) => bold(cyan(str)),
  (str) => yellow(str),
];

class InitCommand extends Command {
  async run() {
    const { args } = this.parse(InitCommand);
    const { projectName } = args;
    this.drawLogo();
    await shell(`git clone https://github.com/lskjs/kit.git ${projectName}`);
    await shell(`rm -rf ${projectName}/.git`);
    await shell(`npm i`, { cwd: projectName });
    await shell(`npm run bootstrap`, { cwd: projectName });
    console.log(`============= SUCCESS =============`);
    console.log(`now you should do: cd ${projectName} && npm run dev`);
  }

  drawLogo() {
    const coloredLogo = logo
      .split("\n")
      .map((row) =>
        row
          .split("$")
          .map((str, cellId) => {
            if (str === "#") return bgYellow(" ");
            if (!colors[cellId]) return "";
            return colors[cellId](str.replace(/#/g, bgYellow(" ")));
          })
          .join("")
      )
      .join("\n");
    // this.log(logo)
    this.log(coloredLogo);
  }
}

InitCommand.description = `Init new LSK.js project
...
Extra documentation goes here
`;

InitCommand.args = [
  {
    name: "projectName",
    required: true,
  },
];

module.exports = InitCommand;
