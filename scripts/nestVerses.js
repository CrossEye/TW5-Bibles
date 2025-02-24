const {pipe, groupBy, prop, map, toPairs} = require('ramda')

module.exports = (config) => 
  enhanced(config, toNested(config.verses))


const toNested = pipe(
  groupBy(prop('book_name')),
  map(groupBy(prop('chapter'))),
  map(toPairs),
  map(map(([title, verses]) => ({
    title: `${verses[0].book_name} ${title}`,
    verses: verses.map(({book_name, chapter, verse, text}) => ({
      title: `${book_name} ${chapter}:${verse}`,
      text
    }))
  }))),
  toPairs,
  map(([title, chapters]) => ({title, chapters}))
)

const enhanced = ({inscriptions, sections, paragraphs, stanzas}, nested) => nested.map(({title, chapters, ...rest}) => ({
  title,
  ...rest,
  chapters: chapters.map(({title, ...rest}) => ({
    title,
    ...rest,
    meta: {
      paragraphs: paragraphs[title],
      ...(inscriptions[title] ? {inscription: inscriptions[title]} : {}),
      ...(stanzas[title] ? {stanzas: stanzas[title]} : {})
    }
  })),
  meta: {
    ...(sections[title] ? {sections: sections[title]} : {})
  }
}))

