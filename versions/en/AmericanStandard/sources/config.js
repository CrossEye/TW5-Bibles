const extractInscriptions = (vs) => vs.reduce(
  ({verses, inscriptions}, v) => {
    const matches = v.text.match(/^\[([^\]]*)\]\.\s*(.*)$/)
    return matches 
      ? {verses: verses.concat({...v, text: matches[2]}), inscriptions: {...inscriptions, [`${v.book_name} ${v.chapter}`]: matches[1]}}
      : {verses: verses.concat(v), inscriptions}
  } 
  , {verses: [], inscriptions: {}}
)

const {inscriptions, verses} = extractInscriptions(require('./asv.json').verses)

module.exports = () => ({
  title: 'American Standard Bible',
  version: '0.1.0',
  verses,
  inscriptions,
  paragraphs: require(`${process.cwd()}/common/paragraphs.json`),
  sections: require(`${process.cwd()}/common/sections.json`),
  bookNames: require(`${process.cwd()}/common/languages/en/bookNames.json`),
})