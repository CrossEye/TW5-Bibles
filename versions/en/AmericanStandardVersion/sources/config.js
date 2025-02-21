const {pipe, groupBy, prop, map, toPairs} = require('ramda')

module.exports = () => ({
  title: 'American Standard Bible',
  version: '0.1.0',
  verses: require('./asv.json').verses,
  metaInfo: require(`${process.cwd()}/common/metaInfo.json`),
  bookNames: require(`${process.cwd()}/common/languages/en/bookNames.json`),
})