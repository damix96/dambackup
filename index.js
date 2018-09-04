const fs = require('fs')
const { ncp } = require('ncp')
const makedir = require('makedir')
const command = require('node-run-cmd')

const backupFolder = process.cwd() + '/backups/'

const copy = async (from, to) =>
  new Promise((resolve, reject) => {
    const start = new Date().getTime()
    ncp(from, to, { stopOnErr: true }, err => {
      if (err) return reject(err)
      const stop = new Date().getTime()
      resolve(stop - start)
    })
  })

async function backup (options) {
  try {
    const start = new Date().getTime()
    let { folder, outputFolder = backupFolder, name, cmd, log = true } = options
    let cmdResult = command.run(cmd)
    if (!folder) throw new Error('Nothing to backup')
    createFolder(outputFolder)
    if (outputFolder[outputFolder.length - 1] !== '/') outputFolder += '/'
    outputFolder += name
    await createFolder(outputFolder)
    if (log) console.log('Backup start...', { name, folder, outputFolder, cmd })
    await copy(folder, outputFolder)
    await cmdResult
    const stop = new Date().getTime()
    if (log) console.log('Backup done in', stop - start, 'ms.')
    return Promise.resolve({ ms: stop - start, cmdResult })
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

function createFolder (folder) {
  if (!fs.existsSync(folder)) {
    return new Promise((resolve, reject) => makedir.makedir(folder, (err) => err ? reject(err) : resolve(folder)))
  }
}

function ezDate (timestamp, { t = ':', d = '.' }) {
  let date
  if (typeof timestamp === 'number') date = new Date(Math.round(timestamp))
  else date = new Date(timestamp)
  return {
    fullDate: date,
    year: date.getFullYear(),
    month: fmt(date.getMonth() + 1),
    date: fmt(date.getDate()),
    y: date.getFullYear(),
    m: date.getMonth(),
    d: date.getDate(),
    day: date.getDay(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    ms: date.getTime(),
    time: fmt(date.getHours()) + t + fmt(date.getMinutes()),
    hms:
      fmt(date.getHours()) +
      t +
      fmt(date.getMinutes()) +
      t +
      fmt(date.getSeconds()),
    dmy:
      fmt(date.getDate()) +
      d +
      fmt(date.getMonth() + 1) +
      d +
      date.getFullYear(),
    dm: fmt(date.getDate()) + d + fmt(date.getMonth() + 1)
  }
}
function fmt (n) {
  return (n > 9 && n >= 0 ? n : '0' + n) + ''
}

module.exports = {
  backup,
  ezDate,
  createFolder,
  copy
}
