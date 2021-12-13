#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoCommand = void 0;
// @ts-ignore
const cli_utils_1 = require("@lskjs/cli-utils");
const command_1 = require("@oclif/command");
const utils_1 = require("../utils");
class InfoCommand extends command_1.Command {
    async run() {
        // eslint-disable-next-line no-console
        (0, cli_utils_1.drawLogo)(this);
        (0, utils_1.printInfo)(this);
    }
}
exports.InfoCommand = InfoCommand;
exports.default = InfoCommand;
