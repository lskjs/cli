#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogCommand = void 0;
const command_1 = require("@oclif/command");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { stdin } = process;
class LogCommand extends command_1.Command {
    async run() {
        require('@lskjs/log/cli');
    }
}
exports.LogCommand = LogCommand;
exports.default = LogCommand;
