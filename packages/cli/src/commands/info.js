#!/usr/bin/env node
const { Command } = require("@oclif/command");
const { drawLogo } = require("@lskjs/cli-utils");
const { printInfo } = require("../utils");

class InfoCommand extends Command {
  async run() {
    // eslint-disable-next-line no-console
    drawLogo(this);
    printInfo(this);
  }
}

module.exports = InfoCommand;
