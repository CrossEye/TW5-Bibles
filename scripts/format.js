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

module.exports = (s) => formatter.Serialize(s)