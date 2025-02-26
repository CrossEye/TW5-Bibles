const extractInscriptions = (vs) => vs.reduce(
  ({verses, inscriptions}, v) => {
    const matches = v.text.match(/^«([^»]+)»\s*(.*)$/u)
    return matches 
      ? {verses: verses.concat({...v, text: matches[2]}), inscriptions: {...inscriptions, [`${v.book_name} ${v.chapter}`]: matches[1]}}
      : {verses: verses.concat(v), inscriptions}
  } 
  , {verses: [], inscriptions: {}}
)

const removeStanzaPrefixes = (verses) => verses.map(
  v => v.book_name == 'Salmos' && v.chapter == 119 && v.verse % 8 === 1
    ? {...v, text: v.text.replace(/^[A-Za-z\s]+\.\s/, '')} 
    : v
)

const {inscriptions, verses} = extractInscriptions(require('./rvg.json').verses)

module.exports = () => ({
  title: 'La Biblia Reina Valera Gómez',
  verses: removeStanzaPrefixes(verses),
  metadata: require('./rvg.json').metadata,
  language: require(`../../common/languages/es.json`),
  paragraphs: require(`../../common/paragraphs.json`),
  sections: require(`../../common/sections.json`),
  inscriptions,
  stanzas: require(`../../common/stanzas.json`),
  languageTiddlers: require(`../../common/languages/es_tiddlers.json`)
})