const trim = require('@lskjs/utils/trimSpaces').default
const {spawn: nativeSpawn} = require('child_process')

function spawn(command, args = [], options = {}) {
  const {
    trace = console.log, // eslint-disable-line no-console
    log = console.log, // eslint-disable-line no-console
    error = console.error, // eslint-disable-line no-console
    // cwd = process.cwd(),
    ...otherOptions
  } = options

  if (trace) trace('>>>', trim(command))
  return new Promise((resolve, reject) => {
    const proc = nativeSpawn(command, args, otherOptions)
    if (proc.stdout) {
      proc.stdout.on('data', data => {
        const res = data.toString().trim()
        if (log) log(res)
      })
    }
    if (proc.stderr) {
      proc.stderr.on('data', data => {
        const res = data.toString().trim()
        if (error) error(res)
      })
    }
    proc.on('exit', code => {
      if (!code) return resolve(proc)
      reject({proc, code})
    })
  })
}

exports.default = spawn
