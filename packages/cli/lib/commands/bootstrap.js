"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapCommand = void 0;
// @ts-ignore
const cli_utils_1 = require("@lskjs/cli-utils");
const command_1 = require("@oclif/command");
class BootstrapCommand extends command_1.Command {
    async run() {
        await (0, cli_utils_1.shell)('lsk run bootstrap');
    }
}
exports.BootstrapCommand = BootstrapCommand;
exports.default = BootstrapCommand;
