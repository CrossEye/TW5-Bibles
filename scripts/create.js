const {pipe, groupBy, prop, map, toPairs} = require('ramda')
const { Formatter,  FracturedJsonOptions, EolStyle } = require('fracturedjsonjs');

const options = new FracturedJsonOptions();
options.MaxTotalLineLength = 100
options.MaxInlineComplexity = 2
options.JsonEolStyle = EolStyle.Lf
options.IndentSpaces = 2
options.SimpleBracketPadding = false
options.NestedBracketPadding = false

const formatter = new Formatter();
formatter.Options = options

const {title, version, verses, inscriptions, paragraphs, sections, bookNames} = 
    require(`${process.cwd()}/versions/${process.argv[2]}/sources/config`)()

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

const nested = toNested(verses)

const enhanced = nested.map(({title, chapters, ...rest}) => ({
  title,
  ...rest,
  chapters: chapters.map(({title, ...rest}) => ({
    title,
    ...rest,
    meta: {
      paragraphs: paragraphs[title],
      ...(inscriptions[title] ? {inscription: inscriptions[title]} : {})
    }
  })),
  meta: {
    ...(sections[title] ? {sections: sections[title]} : {})
  }
}))

const textFromObj = formatter.Serialize(enhanced);

console.log(textFromObj)