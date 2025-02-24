module.exports = () => ({
  title: 'Coverdale Bible',
  verses: require('./coverdale.json').verses,
  metadata: require('./coverdale.json').metadata,
  language: require(`../../common/languages/en.json`),
  paragraphs: require(`../../common/paragraphs.json`),
  sections: require(`../../common/sections.json`),
  inscriptions: require(`../../common/inscriptions.json`),
  stanzas: require(`../../common/stanzas.json`)
})