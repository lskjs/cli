#!/usr/bin/env node
import { drawLogo } from '@lskjs/cli-utils';
import { Command } from '@oclif/command';

import { printInfo } from '../utils';

export class InfoCommand extends Command {
  async run() {
    // eslint-disable-next-line no-console
    drawLogo(this);
    printInfo(this);
  }
}

export default InfoCommand;
