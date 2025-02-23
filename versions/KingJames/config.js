const inscriptions = require(`../../common/inscriptions.json`)

const cleanVerse = (inscriptions) => (verse) => ({
  ...verse, 
  text: verse.text.replace('\u00b6', '').replace(inscriptions[`${verse.book_name} ${verse.chapter}`], '').trim()
})

const verses = require('./kjv.json').verses.map(cleanVerse(inscriptions))

module.exports = () => ({
  title: 'King James Bible',
  language: require(`../../common/languages/en.json`),
  metadata: require('./kjv.json').metadata,
  verses,
  paragraphs: require(`../../common/paragraphs.json`),
  inscriptions,
  sections: require(`../../common/sections.json`)
})