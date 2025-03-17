const bible = require('./bible.json')
const es = require('../../common/languages/es.json')

const language = {
  ...es,
  books: {
    ...es.books,
    "Esther": "Ester",
    "Ecclesiastes": "Eclesiastés",
    "Song of Solomon": "Cantares",
    "Nahum": "Nahúm",
    "Haggai": "Hageo",
    "Matthew": "S. Mateo",
    "Mark": "S. Marcos",
    "Luke": "S. Lucas",
    "John": "S.Juan",
    "Revelation": "Apocalipsis"
  }
}


module.exports = () => ({
  title: 'La Biblia Reina Valera',
  verses: Object.keys(es.books).flatMap(
    (title, i) => Object.entries(bible[language.books[title]]).sort(([a], [b]) => a - b).flatMap(
      ([chapter, verses]) => Object.entries(verses).flatMap(([j, v]) => 
        ({book_name: language.books[title], book: i + 1, chapter, verse: Number(j), text: v})
      )
    )
  ),
  metadata: {}, // TODO: get this from somewhere
  language,
  paragraphs: require(`../../common/paragraphs.json`),
  sections: require(`../../common/sections.json`),
  inscriptions: {}, // TODO: get from elsewhere?
  stanzas: require(`../../common/stanzas.json`),
  languageTiddlers: require(`../../common/languages/es_tiddlers.json`)
})