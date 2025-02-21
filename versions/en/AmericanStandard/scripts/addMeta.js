// Usage: node scripts/addMeta > output/asv.json

const books = require('../output/nested.json')
const chapterMeta = require('../../../../common/chapterMeta.json')

const res = books.map(({chapters, meta, ...rest}) => ({
  ...rest,
  chapters: chapters.map(({title, ...rest}) => ({
    title,
    ...rest,
    meta: chapterMeta[title]
  })),
  ...(meta ? {meta} : {})
}))

console.log(JSON.stringify(res, null, 2))