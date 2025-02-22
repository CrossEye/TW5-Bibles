const {pipe, groupBy, prop, map, toPairs} = require('ramda')

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

const enhance = (nested) => nested.map(({title, chapters, ...rest}) => ({
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

const convert = (books) => books.flatMap(convertBook).map(addSeq)

const convertBook = ({title, chapters, meta}, i) => title == 'Psalms' 
  ? convertPsalms (title, chapters, meta, i)
  : [
    {title, tags: 'Book', 'book-seq': String(i + 1)},
    ...chapters.flatMap(convertChapter(title))
  ]

convertPsalms = (title, psalms, meta, i) => [
  {title, tags: 'Book', 'book-seq': String(i + 1)},
  ...psalms.flatMap(convertPsalm(meta))
]

const convertPsalm = (chapterMeta) => ({title, verses, meta}, i) => [
  {title, tags: 'Chapter Psalms', book: 'Psalms', chapter: String(i + 1),
    'psalm-section': getPsalmSection(i + 1, chapterMeta),
    ...('inscription' in meta ? {inscription: meta.inscription} : {}),
  },
  ...verses.flatMap(convertVerse('Psalms', title, meta))
]

const convertChapter = (book) => ({title, verses, meta}, i) => [
  {title, tags: `Chapter ${wrap(book)}`, book, chapter: String(i + 1)},
  ...verses.flatMap(convertVerse(book, title, meta))
]

const getPsalmSection = (i, meta) => meta.sections.find(({chapters}) => chapters.includes(i)).title

convertVerse = (book, chapter, meta) => ({title, text}, i) => [
  {title, tags: `Verse ${wrap(chapter)}`, book, chapter, verse: String(i + 1), text, para: getPara(i + 1, meta), ...getPreface(i + 1, meta)}
]

const getPreface = (i, meta, 
  idx = (meta.stanzas || []).findIndex(({verses}) => verses[0] == i)
) => idx > -1 ? {preface: meta.stanzas[idx].title + '.' } : {}

const getPara = (i, meta) => String (1 + meta.paragraphs.findIndex(ps => ps.includes(i)))

const addSeq = (tid, i) => ({...tid, seq: String(i + 1)})

const wrap = (s) => s.includes(' ') ? `[[${s}]]` : s

const makeInfrastructure = (tiddlers, title) => 
  tiddlers.map(t => Object.fromEntries(Object.entries(t).map(([k, v]) => [k, v.replaceAll('${title}', title)])))

const {title, version, verses, inscriptions, paragraphs, sections, bookNames} = 
    require(`${process.cwd()}/versions/${process.argv[2]}/sources/config`)()

const books = enhance(toNested(verses))

const tiddlers = [
  ...convert(books),
  ...makeInfrastructure(require(`${process.cwd()}/common/extraTids.json`), title)
]

console.log(JSON.stringify(tiddlers, null, 2))  // For dev (readable)
