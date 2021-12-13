"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyCommand = void 0;
/* eslint-disable max-len */
// @ts-ignore
const cli_utils_1 = require("@lskjs/cli-utils");
const command_1 = require("@oclif/command");
class CopyCommand extends command_1.Command {
    async run() {
        const { args: { from, to }, flags: { nodemodules, git }, } = this.parse(CopyCommand);
        await (0, cli_utils_1.checkSoft)(['rsync']);
        await (0, cli_utils_1.copy)({
            from,
            to,
            nodemodules,
            git,
        });
    }
}
exports.CopyCommand = CopyCommand;
CopyCommand.description = `Recursive incremental copy dirs with rsync
...

`;
CopyCommand.args = [
    {
        name: 'from',
        required: true,
    },
    {
        name: 'to',
        required: true,
    },
];
CopyCommand.flags = {
    nodemodules: command_1.flags.string({
        char: 'n',
        description: 'include node_modules folder',
    }),
    git: command_1.flags.string({ char: 'g', description: 'include .git folder' }),
};
exports.default = CopyCommand;
