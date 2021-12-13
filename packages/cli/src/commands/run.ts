// @ts-ignore
import { findPath, getPaths, isDebug, replaceAll, shell } from '@lskjs/cli-utils';
import { Command, flags } from '@oclif/command';
import { existsSync } from 'fs';

export class RunCommand extends Command {
  static strict = false;
  async run() {
    // console.log('this.argv', this.argv)
    let barePos = this.argv.indexOf('--');
    const isRealBare = barePos === -1;
    if (barePos === -1) {
      barePos = 0;
    }
    const argv = this.argv.slice(0, isRealBare ? 1 : barePos);
    const bareArgv = this.argv.slice(barePos + 1);
    // console.log({argv,bareArgv })

    const {
      args: { script: npmScriptName },
      flags: { explain },
    } = this.parse(RunCommand, argv);
    const script = npmScriptName.replace(/:/g, '-');

    const cwd = process.cwd();

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
  ...Array.from(Array(10).keys()).map((a) => ({
    name: `arg${a}`,
  })),
];

RunCommand.flags = {
  explainPath: flags.string({
    description: 'explain of path',
  }),
};

export default RunCommand;
