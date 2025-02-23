const {readFile} = require('fs/promises')
const extraTids = require('./../common/extraTids.json')

const makeScript = (config, tiddlers) =>  
  Promise.all([
    readFile('./common/empty.html', 'utf8'),
    readFile('./common/extraTids.json', 'utf8')
  ]).then(
    ([empty, extraTids]) => empty.replace('<!--~~ Replace Me ~~-->', ['', [...JSON.parse(extraTids).map(update(config)), ...tiddlers]
      .map(JSON.stringify)].join(',\n'))
  )

const update = ({title}) => (tiddler) => 
  Object.fromEntries(Object.entries(tiddler).map(([k, v]) => [k, v.replaceAll('${title}', title)]))

module.exports = makeScript
