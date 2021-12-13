#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkCommand = void 0;
// @ts-ignore
const cli_utils_1 = require("@lskjs/cli-utils");
const command_1 = require("@oclif/command");
class LinkCommand extends command_1.Command {
    async run() {
        const { args: { from, to }, flags: { nodemodules, git }, } = this.parse(LinkCommand);
        await (0, cli_utils_1.checkSoft)(['rsync']);
        await (0, cli_utils_1.link)({ from, to, nodemodules, git });
    }
}
exports.LinkCommand = LinkCommand;
LinkCommand.description = `Recursive watching and incremental copy dirs with rsync
...
`;
LinkCommand.args = [
    {
        name: 'from',
        required: true,
    },
    {
        name: 'to',
        required: true,
    },
];
LinkCommand.flags = {
    nodemodules: command_1.flags.string({
        char: 'n',
        description: 'include node_modules folder',
    }),
    git: command_1.flags.string({ char: 'g', description: 'include .git folder' }),
};
exports.default = LinkCommand;
