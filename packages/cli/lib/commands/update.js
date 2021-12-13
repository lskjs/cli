"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommand = void 0;
// @ts-ignore
const cli_utils_1 = require("@lskjs/cli-utils");
const command_1 = require("@oclif/command");
class UpdateCommand extends command_1.Command {
    async run() {
        await (0, cli_utils_1.shell)('lsk run update:starter-kit');
        await (0, cli_utils_1.shell)('lsk run npm:install');
        await (0, cli_utils_1.shell)('lsk run npm:update');
        await (0, cli_utils_1.shell)('lsk run bootstrap');
    }
}
exports.UpdateCommand = UpdateCommand;
exports.default = UpdateCommand;
