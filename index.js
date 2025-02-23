const {readdir} = require('fs/promises')
const makeVersionWiki = require('./scripts/makeVersionWiki')

const version = process.argv[2]

const res = (version == 'all')
  ? readdir('./versions')
    // Use a sequential `reduce` to ensure consistent output.  This wouldn't happen with `Promise.all`.
    .then(versions => versions.reduce((p, v) => p.then(() => makeVersionWiki(v)), Promise.resolve(null)))
    .then(() => console.log('\n====================\nWrote all versions'))
  : makeVersionWiki(version)

res.catch(console.warn)