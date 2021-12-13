#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkallCommand = void 0;
// @ts-ignore
const cli_utils_1 = require("@lskjs/cli-utils");
const command_1 = require("@oclif/command");
class LinkallCommand extends command_1.Command {
    async run() {
        const { args: { config: configPath }, flags: { nodemodules, git }, } = this.parse(LinkallCommand);
        await (0, cli_utils_1.checkSoft)(['rsync']);
        // eslint-disable-next-line import/no-dynamic-require
        const config = require(`${process.cwd()}/${configPath}`);
        await (0, cli_utils_1.linkAll)(config, { nodemodules, git });
    }
}
exports.LinkallCommand = LinkallCommand;
LinkallCommand.description = `Recursive watching and incremental copy dirs with rsync
...
`;
LinkallCommand.args = [
    {
        name: 'config',
        required: true,
    },
];
LinkallCommand.flags = {
    nodemodules: command_1.flags.string({
        char: 'n',
        description: 'include node_modules folder',
    }),
    git: command_1.flags.string({ char: 'g', description: 'include .git folder' }),
};
exports.default = LinkallCommand;
