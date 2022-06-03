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
5) Run the ironfish node (with modified log lines as shown above) and stream the output to this program
```
ironfish start | yarn --cwd ${PATH_TO_THIS_REPO} start ${FOLDER_FOR_SQLDB_OUTPUT}
```