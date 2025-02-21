const {pipe, groupBy, prop, map, toPairs} = require('ramda')

module.exports = () => ({
  title: 'Coverdale Bible',
  version: '0.1.0',
  verses: require('./coverdale.json').verses,
  metaInfo: require(`${process.cwd()}/common/metaInfo.json`),
  bookNames: require(`${process.cwd()}/common/languages/en/bookNames.json`),
})