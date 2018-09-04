# dambackup
Backup folders and run cmd
### Folder backup Example:
```javascript
const { backup, ezDate } = require('dambackup')
const date = ezDate(new Date(), { t: ';' })
const copyDate = `${date.dmy} ${date.hms}_${date.ms}`
const outputFolder = `/var/opt/backups/${copyDate}/`

backup({
  folder: process.cwd(),
  outputFolder,
  name: `Current Project Folder`
})

```
### Folder backup + CMD Example:
```javascript
const { backup, ezDate } = require('dambackup')
const date = ezDate(new Date(), { t: ';' })
const copyDate = `${date.dmy} ${date.hms}_${date.ms}`
const outputFolder = `/var/opt/backups/${copyDate}/`

backup({
  folder: process.cwd(),
  outputFolder,
  name: `Current Project Folder`,
  cmd: [{ command: `mongodump --db dbName --out "${outputFolder}/DB"` }]
})

```
`npm i dambackup`
