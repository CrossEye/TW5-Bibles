// Usage: `node sources/toTids > sources/TW5-KJV.json`

const books = require('./RAW-KJV.json')

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


console.log(JSON.stringify(convert(books), null, 2))  // For dev (readable)
// console.log(JSON.stringify(convert(books)))  // For prod (compressed)