module.exports = () => ({
  title: 'King James Bible',
  language: require(`../../common/languages/en.json`),
  metadata: require('./kjv.json').metadata,
  verses: require('./kjv.json').verses,
  paragraphs: require(`../../common/paragraphs.json`),
  inscriptions: require(`../../common/inscriptions.json`),
  sections: require(`../../common/sections.json`)
})