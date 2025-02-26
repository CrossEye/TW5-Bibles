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

const enhanced = ({inscriptions, sections, paragraphs, stanzas, language}, nested, books = invert(language.books)) => 
  nested.map(({title, chapters, ...rest}) => ({
    title,
    ...rest,
    chapters: chapters.map(({title, key = getKey(books)(title), ...rest}) => ({
      title,
      ...rest,
      meta: {
        paragraphs: paragraphs[key],
        ...(inscriptions[title] ? {inscription: inscriptions[title]} : {}),
        ...(stanzas[key] ? {stanzas: stanzas[key]} : {})
      }
    })),
    meta: {
      ...(sections[books[title]] ? {sections: sections[books[title]]} : {})
    }
  }))

  const invert = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]))

  const getKey = (books) => (title, [_, book, location] = title.match(/(.+) (\d+)/)) =>  `${books[book]} ${location}`

