#!/usr/bin/env node
const { Command } = require('@oclif/command');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { stdin } = process;

class LogCommand extends Command {
  async run() {
    require('@lskjs/log/cli');
  }
}

module.exports = LogCommand;
