"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunCommand = void 0;
// @ts-ignore
const cli_utils_1 = require("@lskjs/cli-utils");
const command_1 = require("@oclif/command");
class RunCommand extends command_1.Command {
    async run() {
        await (0, cli_utils_1.run)(() => (0, cli_utils_1.pathexec)(this.argv.join(' ')));
    }
}
exports.RunCommand = RunCommand;
RunCommand.strict = false;
RunCommand.args = [
    {
        name: 'script',
        required: true,
    },
    // ...Array.from(Array(10).keys()).map((a) => ({
    //   name: `arg${a}`,
    // })),
];
exports.default = RunCommand;
