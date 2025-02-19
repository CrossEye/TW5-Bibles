const books = require('../sources/RAW-KJV.json')

const converted = Object.fromEntries(books.flatMap(({chapters}) => chapters.flatMap(({title, meta}) => [[title, meta]])))

console.log(JSON.stringify(converted, null, 2))