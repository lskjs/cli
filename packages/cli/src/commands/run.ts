// @ts-ignore
import { findPath, getPaths, isDebug, pathexec, replaceAll, shell } from '@lskjs/cli-utils';
import { Command, flags as commandFlags } from '@oclif/command';
import { existsSync } from 'fs';

export class RunCommand extends Command {
  static strict = false;
  async run() {
    // const { args, flags, bareArgv } = this.parseWithBare(RunCommand, this.argv);
    // console.log('[run]', this.argv, { args, flags, bareArgv });
    return pathexec(this.argv.join(' '));
  }

  parseWithBare(SomeClass: any, argv: string[]): Record<string, any> {
    let barePos = argv.indexOf('--');
    const isRealBare = barePos === -1;
    if (barePos === -1) {
      barePos = 0;
    }
    const baseArgv = argv.slice(0, isRealBare ? 1 : barePos);
    const bareArgv = argv.slice(barePos + 1);
    const res = super.parse(SomeClass, baseArgv);
    return {
      ...res,
      bareArgv,
    };
  }
  async run2() {
    const { args, flags, bareArgv } = this.parseWithBare(RunCommand, this.argv);
    console.log('[run]', this.argv, { args, flags, bareArgv });
    const { script: npmScriptName } = args;
    const { explain } = flags;
    const cwd = process.cwd();

    const script = npmScriptName.replace(/:/g, '-');
    const isRoot = existsSync(`${cwd}/lerna.json`);
    const isPackage =
      !isRoot &&
      (existsSync(`${cwd}/../lerna.json`) ||
        existsSync(`${cwd}/../../lerna.json`) ||
        existsSync(`${cwd}/../../../lerna.json`));
    // const isPackage = !isLernaRoot
    const dirname = isPackage ? 'package' : 'run';

    const name = `scripts/${dirname}/${script}`;
    const pathOptions = {
      name,
      exts: ['.sh', '.js'],
      nodemodules: 1,
      local: 1,
    };
    const paths = getPaths(pathOptions);
    const scriptPath = findPath(pathOptions);

    if (scriptPath) {
      if (explain) {
        this.log(`script path found  ${scriptPath} in paths: `, paths);
      }
    } else {
      this.log('script path not found in paths: ', getPaths(pathOptions));
      this.error('scriptPath not found');
      this.exit(1);
      return;
    }
    const cmd = [scriptPath, ...bareArgv].join(' ');
    await shell(cmd, {
      log: this.log.bind(this),
      error: this.log.bind(this),
      printCommand: (command: string) => {
        if (isDebug()) return command;
        let str = command;
        str = replaceAll(str, `${cwd}/`, '');
        str = replaceAll(command, cwd, '.');
        str = replaceAll(command, 'node_modules/', '');
        return str;
      },
    });
  }
}

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
  explainPath: commandFlags.string({
    description: 'explain of path',
  }),
};

export default RunCommand;
