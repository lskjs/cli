#!/usr/bin/env node
/* eslint-disable no-console */
const logo = require("fs").readFileSync(`${__dirname}/logo.txt`).toString();
const { bold, red, blue, cyan, yellow, bgYellow } = require("kleur/colors");

const colors = [
  (str) => bold(red(str)),
  (str) => bold(blue(str)),
  (str) => bold(cyan(str)),
  (str) => yellow(str),
];

function drawLogo(ctx) {
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
  ctx.log(coloredLogo);
}

module.exports = {
  drawLogo,
};
