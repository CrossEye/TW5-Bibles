module.exports = () => ({
  title: 'World English Bible',
  verses: require('./web.json').verses,
  metadata: require('./web.json').metadata,
  language: require(`../../common/languages/en.json`),
  paragraphs: require(`../../common/paragraphs.json`),
  sections: require(`../../common/sections.json`),
  inscriptions: require(`../../common/inscriptions.json`),
  stanzas: require(`../../common/stanzas.json`),
})