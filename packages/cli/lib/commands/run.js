"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunCommand = void 0;
// @ts-ignore
const cli_utils_1 = require("@lskjs/cli-utils");
const command_1 = require("@oclif/command");
const fs_1 = require("fs");
class RunCommand extends command_1.Command {
    async run() {
        // const { args, flags, bareArgv } = this.parseWithBare(RunCommand, this.argv);
        // console.log('[run]', this.argv, { args, flags, bareArgv });
        return (0, cli_utils_1.pathexec)(this.argv.join(' '));
    }
    parseWithBare(SomeClass, argv) {
        let barePos = argv.indexOf('--');
        const isRealBare = barePos === -1;
        if (barePos === -1) {
            barePos = 0;
        }
        const baseArgv = argv.slice(0, isRealBare ? 1 : barePos);
        const bareArgv = argv.slice(barePos + 1);
        const res = super.parse(SomeClass, baseArgv);
        return Object.assign(Object.assign({}, res), { bareArgv });
    }
    async run2() {
        const { args, flags, bareArgv } = this.parseWithBare(RunCommand, this.argv);
        console.log('[run]', this.argv, { args, flags, bareArgv });
        const { script: npmScriptName } = args;
        const { explain } = flags;
        const cwd = process.cwd();
        const script = npmScriptName.replace(/:/g, '-');
        const isRoot = (0, fs_1.existsSync)(`${cwd}/lerna.json`);
        const isPackage = !isRoot &&
            ((0, fs_1.existsSync)(`${cwd}/../lerna.json`) ||
                (0, fs_1.existsSync)(`${cwd}/../../lerna.json`) ||
                (0, fs_1.existsSync)(`${cwd}/../../../lerna.json`));
        // const isPackage = !isLernaRoot
        const dirname = isPackage ? 'package' : 'run';
        const name = `scripts/${dirname}/${script}`;
        const pathOptions = {
            name,
            exts: ['.sh', '.js'],
            nodemodules: 1,
            local: 1,
        };
        const paths = (0, cli_utils_1.getPaths)(pathOptions);
        const scriptPath = (0, cli_utils_1.findPath)(pathOptions);
        if (scriptPath) {
            if (explain) {
                this.log(`script path found  ${scriptPath} in paths: `, paths);
            }
        }
        else {
            this.log('script path not found in paths: ', (0, cli_utils_1.getPaths)(pathOptions));
            this.error('scriptPath not found');
            this.exit(1);
            return;
        }
        const cmd = [scriptPath, ...bareArgv].join(' ');
        await (0, cli_utils_1.shell)(cmd, {
            log: this.log.bind(this),
            error: this.log.bind(this),
            printCommand: (command) => {
                if ((0, cli_utils_1.isDebug)())
                    return command;
                let str = command;
                str = (0, cli_utils_1.replaceAll)(str, `${cwd}/`, '');
                str = (0, cli_utils_1.replaceAll)(command, cwd, '.');
                str = (0, cli_utils_1.replaceAll)(command, 'node_modules/', '');
                return str;
            },
        });
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
RunCommand.flags = {
    explainPath: command_1.flags.string({
        description: 'explain of path',
    }),
};
exports.default = RunCommand;
