const path = require('path')
const Lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { rcFolder } = require('./appFolder')

const db = new Lowdb(new FileSync(path.resolve(rcFolder, 'db.json')))

// Seed an empty DB
db.defaults({
  config: {}
}).write()

module.exports = {
  db
}
