// Usage: node scripts/importToNested > output/nested.json

const {pipe, groupBy, prop, map, toPairs} = require('ramda')
const raw = require('../sources/asv.json')

const convert = pipe(
  groupBy(prop('book_name')),
  map(groupBy(prop('chapter'))),
  map(toPairs),
  map(map(([title, verses]) => ({
    title: `${verses[0].book_name} ${title}`,
    verses: verses.map(({book_name, chapter, verse, text}) => ({
      title: `${book_name} ${chapter}:${verse}`,
      text
    }))
  }))),
  toPairs,
  map(([title, chapters]) => ({title, chapters}))
)

// readable, for dev
console.log(JSON.stringify(convert(raw.verses), null, 2))
// compressed, for production
//console.log(JSON.stringify(convert(raw), null, 2))