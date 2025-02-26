const inscriptions = require(`../../common/inscriptions.json`)

const cleanVerse = (inscriptions) => (verse) => ({
  ...verse, 
  text: verse.text.replace('\u00b6', '')
        .replace(inscriptions[`${verse.book_name} ${verse.chapter}`], '').trim()
        .replace(/\[([^\]]*)\]/g, '//$1//')
})

const verses = require('./kjv.json').verses.map(cleanVerse(inscriptions))

module.exports = () => ({
  title: 'King James Bible',
  verses,
  metadata: require('./kjv.json').metadata,
  language: require(`../../common/languages/en.json`),
  paragraphs: require(`../../common/paragraphs.json`),
  sections: require(`../../common/sections.json`),
  inscriptions,
  stanzas: require(`../../common/stanzas.json`),
  languageTiddlers: []
})