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
  language: require(`../../common/languages/en.json`),
  metadata: require('./asv.json').metadata,
  verses,
  paragraphs: require(`../../common/paragraphs.json`),
  inscriptions,
  sections: require(`../../common/sections.json`)
})