const raw = require('../output/nested.json')

const books = Object.fromEntries(raw.map(b => b.title).map(b => [b, b]))

console.log(JSON.stringify(books, null, 2))