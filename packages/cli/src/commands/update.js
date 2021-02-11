#!/usr/bin/env node
const { Command } = require("@oclif/command");
const { shell } = require("@lskjs/cli-utils");

class UpdateCommand extends Command {
  async run() {
    await shell("lsk run update:starter-kit");
    await shell("lsk run npm:install");
    await shell("lsk run npm:update");
    await shell("lsk run npm:bootstrap");
  }
}

module.exports = UpdateCommand;
