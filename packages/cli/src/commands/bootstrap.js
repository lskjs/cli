#!/usr/bin/env node
const { Command } = require('@oclif/command');
const { shell } = require('@lskjs/cli-utils');

class BootstrapCommand extends Command {
  async run() {
    await shell('lsk run bootstrap');
  }
}

module.exports = BootstrapCommand;
