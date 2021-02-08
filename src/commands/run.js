global.__DEV__ = false
const ready = require('@lskjs/utils/polyfill').default
const {Command, flags} = require('@oclif/command')
const fs = require('fs')
const path = require('path')
const {shell} = require('@lskjs/sh/shell')
ready()

class RunCommand extends Command {
  async run() {
    const {flags, args} = this.parse(RunCommand)
    const {script: npmScriptName} = args
    const script = npmScriptName.replace(/:/g, '-');

    const cwd = process.cwd()

    const isPackage = fs.existsSync(`${cwd}/../../lerna.json`)
    // const isPackage = !isLernaRoot
    const dirname = isPackage ? 'package' : 'run'
    const lernaRootCwd = isPackage ? `${cwd}/${isPackage ? '../../' : ''}` : cwd

    const scriptPaths = [
      `${cwd}/scripts/${dirname}/${script}.sh`,
      `${cwd}/scripts/${dirname}/${script}.js`,

      ...(isPackage ? [
        `${cwd}/../../scripts/${dirname}/${script}.sh`,
        `${cwd}/../../scripts/${dirname}/${script}.js`,
      ] : []),

      `${lernaRootCwd}/../lib-starter-kit/scripts/${dirname}/${script}.sh`,
      `${lernaRootCwd}/../lib-starter-kit/scripts/${dirname}/${script}.js`,

      `${lernaRootCwd}/node_modules/lsk/scripts/${dirname}/${script}.sh`,
      `${lernaRootCwd}/node_modules/lsk/scripts/${dirname}/${script}.js`,
    ].map(a => path.resolve(a))
    const filtered = scriptPaths.filter(a => fs.existsSync(a))

    // this.log({scriptPaths, filtered})

    const [scriptPath] = filtered
    if (!scriptPath) {
      this.log('script path not found in paths: ', scriptPaths)
      this.error('scriptPath not found')
      return this.exit(1)
    }
    // this.error('asdasdasd not found: ', scriptPaths)

    await shell(scriptPath, [], {
      log: this.log.bind(this),
      error: this.log.bind(this),
    })
  }
}

RunCommand.description = `Describe the command here
...
Extra documentation goes here
`
RunCommand.args = [
  {
    name: 'script',
    required: true,
  },
]
RunCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = RunCommand
