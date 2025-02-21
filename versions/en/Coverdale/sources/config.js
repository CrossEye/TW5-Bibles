module.exports = () => ({
  title: 'Coverdale Bible',
  version: '0.1.0',
  verses: require('./coverdale.json').verses,
  inscriptions: require(`${process.cwd()}/common/inscriptions.json`),
  paragraphs: require(`${process.cwd()}/common/paragraphs.json`),
  sections: require(`${process.cwd()}/common/sections.json`),
  bookNames: require(`${process.cwd()}/common/languages/en/bookNames.json`),
})