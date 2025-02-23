module.exports = () => ({
  title: 'World English Bible',
  language: require(`../../common/languages/en.json`),
  verses: require('./web.json').verses,
  metadata: require('./web.json').metadata,
  paragraphs: require(`../../common/paragraphs.json`),
  inscriptions: require(`../../common/inscriptions.json`),
  sections: require(`../../common/sections.json`)
})