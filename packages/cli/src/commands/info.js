#!/usr/bin/env node
const { Command } = require("@oclif/command");
const { drawLogo } = require("@lskjs/cli-utils");

class InfoCommand extends Command {
  async run() {
    // eslint-disable-next-line no-console
    drawLogo(this);
    this.log("Version: ", this.config.version);
    this.log("System:  ", this.config.userAgent);
    this.log("Path:    ", __dirname);
    this.log("Root:    ", this.config.root);
    this.log("Cwd:     ", process.cwd());
    // eslint-disable-next-line no-console
    if (process.env.USER === "isuvorov") console.log(this.config);
  }
}

module.exports = InfoCommand;
