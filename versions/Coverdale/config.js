module.exports = () => ({
  title: 'Coverdale Bible',
  language: require(`../../common/languages/en.json`),
  metadata: require('./coverdale.json').metadata,
  verses: require('./coverdale.json').verses,
  paragraphs: require(`../../common/paragraphs.json`),
  inscriptions: require(`../../common/inscriptions.json`),
  sections: require(`../../common/sections.json`)
})