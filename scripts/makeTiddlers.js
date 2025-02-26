module.exports = (config) => (books) => books.flatMap(convertBook({...config, invertedBooks: invert(config.language.books)})).map(addSeq)
 
const convertBook = (config) => ({title, chapters, meta}, i) => config.invertedBooks[title] == 'Psalms' 
  ? convertPsalms (config)(title, chapters, meta, i)
  : [
    {title, tags: config.language.Book, 'book-seq': String(i + 1)},
    ...chapters.flatMap(convertChapter(config)(title))
  ]

convertPsalms = (config) => (title, psalms, meta, i) => [
  {title, tags: config.language.Book, 'book-seq': String(i + 1)},
  ...psalms.flatMap(convertPsalm(config)(meta))
]

const convertPsalm = (config) => (chapterMeta) => ({title, verses, meta}, i) => [
  {title, tags: `${config.language.Chapter} ${config.language.books.Psalms}`, book: config.language.books.Psalms, chapter: String(i + 1),
    'psalm-section': getPsalmSection(config)(i + 1, chapterMeta),
    ...('inscription' in meta ? {inscription: meta.inscription} : {}),
  },
  ...verses.flatMap(convertVerse(config)(config.language.books.Psalms, title, meta))
]

const convertChapter = (config) => (book) => ({title, verses, meta}, i) => [
  {title, tags: `${config.language.Chapter} ${wrap(book)}`, book, chapter: String(i + 1)},
  ...verses.flatMap(convertVerse(config)(book, title, meta))
]

const getPsalmSection = (config) => (i, meta) => meta.sections.find(({chapters}) => chapters.includes(i)).title

convertVerse = (config) => (book, chapter, meta) => ({title, text}, i) => [
  {title, tags: `${config.language.Verse} ${wrap(chapter)}`, book, chapter, verse: String(i + 1), text, para: getPara(config)(i + 1, meta), ...getPreface(config)(i + 1, meta)}
]

const getPreface = (config) => (i, meta, 
  idx = (meta.stanzas || []).findIndex(({verses}) => verses[0] == i)
) => idx > -1 ? {preface: meta.stanzas[idx].title + '.' } : {}

const getPara = (config) => (i, meta) => String (1 + meta.paragraphs.findIndex(ps => ps.includes(i)))

const addSeq = (tid, i) => ({...tid, seq: String(i + 1)})

const wrap = (s) => s.includes(' ') ? `[[${s}]]` : s

const invert = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]))
