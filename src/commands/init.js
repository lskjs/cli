const {Command, flags} = require('@oclif/command')
const logo = require('fs').readFileSync(__dirname + '/logo.txt').toString()
const {bold, red, green, blue, yellow} = require('kleur/colors')

const colors = [
  str => bold(red(str)),
  str => bold(green(str)),
  str => bold(blue(str)),
  str => yellow(str),
]

class InitCommand extends Command {
  async run() {
    const {flags} = this.parse(InitCommand)
    const name = flags.name || 'world'
    const coloredLogo = logo.split('\n').map(row => {
      return row.split('$').map((str, cellId) => {
        return colors[cellId] && colors[cellId](str) || ''
      }).join('')
    }).join('\n')
    // this.log(logo)
    this.log(coloredLogo)
  }
}

InitCommand.description = `Init LSK.js project
...
Extra documentation goes here
`

InitCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = InitCommand
