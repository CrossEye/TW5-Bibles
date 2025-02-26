const verses = require('./web.json').verses.map(
  v => v.book_name == 'Psalms' && v.chapter == 119 && v.verse % 8 === 0
    ? {...v, text: v.text.replace(/\.\s[A-Za-z\s]+\.?$/, '')} 
    : v
)

module.exports = () => ({
  title: 'World English Bible',
  verses: verses,
  metadata: require('./web.json').metadata,
  language: require(`../../common/languages/en.json`),
  paragraphs: require(`../../common/paragraphs.json`),
  sections: require(`../../common/sections.json`),
  inscriptions: require(`../../common/inscriptions.json`),
  stanzas: require(`../../common/stanzas.json`),
})