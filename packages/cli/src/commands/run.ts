// @ts-ignore
import { pathexec, run } from '@lskjs/cli-utils';
import { Command } from '@oclif/command';

export class RunCommand extends Command {
  static strict = false;
  async run() {
    await run(() => pathexec(this.argv.join(' ')));
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

export default RunCommand;
