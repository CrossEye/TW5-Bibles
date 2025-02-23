const {mkdir, writeFile, rm} = require('fs/promises')
const {join, resolve} = require('node:path')
const format = require('./format')
const nestVerses = require('./nestVerses')
const makeTiddlers = require('./makeTiddlers')
const makeScript = require('./makeScript')

const version = process.argv[2];
const config = (require('./loadConfig'))(version)

const enhanced = nestVerses(config)
const tiddlers = makeTiddlers(enhanced)

const outputDir = resolve(join('.', 'docs', version)),
      rawFile = join(outputDir, `raw.json`),
      enhancedFile = join(outputDir, `enhanced.json`),
      tiddlerFile = join(outputDir, `tiddlers.json`),
      wikiFile = join(outputDir, `index.html`)

mkdir(outputDir, {recursive: true})
  .then(() => writeFile(rawFile, format({metadata: config.metadata, verses: config.verses})))
  .then(() => console.log(`Wrote "${rawFile}"`))
  .then(() => writeFile(enhancedFile, format(enhanced)))
  .then(() => console.log(`Wrote "${enhancedFile}"`))
  .then(() => writeFile(tiddlerFile, JSON.stringify(tiddlers, null, 2)))
  .then(() => console.log(`Wrote "${tiddlerFile}"`))
  .then(() => makeScript(config, tiddlers))
  .then((wikiContent) => writeFile(wikiFile, wikiContent))
  .then(() => console.log(`Wrote "${wikiFile}"`))
  .catch(console.warn)