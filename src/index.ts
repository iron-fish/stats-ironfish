import { createInterface } from 'node:readline'
import { LogArgs, LogsDatabase } from './logsDatabase'

const dbPath = process.argv[2]

LogsDatabase.init(dbPath).then((db) => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  rl.on('line', function (line) {
    let json
    try {
      json = JSON.parse(line)
    } catch (e) {
      console.log('Unparsable line: ', line)
    }

    if (json && 'dbTable' in json) {
      const filteredEntry = Object.fromEntries(
        Object.entries(json).filter(([key]) => {
          return !['dbTable', 'message', 'tag', 'date', 'level'].includes(key)
        })
      )
      console.log(`Adding to ${json.dbTable}: `, filteredEntry)
      db.insert(filteredEntry as LogArgs, json.dbTable as string)
    }
  })
})
