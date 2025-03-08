const {readdir} = require('fs/promises')
const makeVersionWiki = require('./scripts/makeVersionWiki')

const version = process.argv[2]

const res = (version == 'all')
  ? readdir('./versions')
    // Use a sequential `reduce` to ensure consistent output.  This wouldn't happen with `Promise.all`.
    .then(versions => versions.reduce((p, v) => p.then(() => makeVersionWiki(v)), Promise.resolve(null)))
    .then(() => console.log(`\n================================\nWrote all versions`))
    .then(() => console.log(`Completed at ${new Date().toISOString().slice(0, -5).replace('T', ' ')}\n================================`))
  : makeVersionWiki(version)

res.catch(console.warn)