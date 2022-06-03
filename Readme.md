# Stats Ironfish
stats-ironfish is a log parser for the [ironfish node](https://github.com/iron-fish/ironfish). It aims to be a way for node developers to easily and flexibly get visibility into stats about the node. Currently this is done by storing log lines from the node into a SQLite Database to be queried.

Here is an example of how a log line from the ironfish node might be modified to use with this log parser
Original log line:
```typescript
    this.logger.info('INCOMING_TRANSACTION', {
      hash,
      inMemPool,
      peer
    })
```

Modified log line:
```typescript
    this.logger.info('INCOMING_TRANSACTION', {
      hash,
      inMemPool,
      peer,
      dbTable: 'transactions',
    })
```

When the This will create a database when the node starts up, a new table `transactions` and insert all the log lines into this table.

## Installation
1) Install [`node`](https://nodejs.org/en/download/)
2) Install [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install)
3) Install the [ironfish node](https://github.com/iron-fish/ironfish)
4) Clone this repo `git clone git@github.com:iron-fish/stats-ironfish.git`

## Running
Add logs to the ironfish node source code that have a `dbTable` key as shown above. Logs without this key will be ignored in the output.

Set the config parameter on the ironfish node to log to the console as JSON
```bash
ironfish config:set jsonLogs true
```

Then run the ironfish node (with modified log lines as shown above) and stream the output to this program
```bash
ironfish start | yarn --cwd ${PATH_TO_THIS_REPO} start ${FOLDER_FOR_SQLDB_OUTPUT}
```

The `--cwd` option on yarn will run a yarn command in a specific directory. In this case we want to run it in the directory of this project so we can start the log parser. The only argument taken by the parser is the folder where the database should be created. A new database is created on each run prefixed with the time of creation