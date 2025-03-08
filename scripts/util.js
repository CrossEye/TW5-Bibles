const pathEntries = (o, path = []) => [
  ... (path .length > 0 ? [[path, o]] : []),
  ... (Object (o) === o ? Object .entries (o) .flatMap (
        ([k, v], _, __, key = Array .isArray (o) ? Number (k) : k) => pathEntries (v, [...path, key])) : []
      )
]

module.exports = {
  pathEntries
}