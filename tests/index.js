const { backup, ezDate } = require('../index')
const date = ezDate(new Date(), { t: '-' })
const copyDate = `${date.dmy} ${date.hms}_${date.ms}`
const outputFolder = `${process.cwd()}/tests/test_backup/${copyDate}/`
let cmd

if (process.platform === 'win32') {
  cmd = [
    {
      command: `./mongodump --db dbname --out "${outputFolder}/DB"`,
      cwd: 'C:\\Program Files\\MongoDB\\Server\\4.0\\bin'
    }
  ]
} else {
  cmd = [
    {
      command: `mongodump --db dbname --out "${outputFolder}/DB"`
    }
  ]
}

backup({
  folder: process.cwd() + '/tests/test_backup_data', // process.cwd(),
  outputFolder,
  name: `test`,
  cmd
})
