TiddlyWiki Bibles
=================

Creating various Bible versions in simple [TiddlyWiki 5][tw] files.

You can see the results at https://crosseye.github.io/TW5-Bibles/.  This page is
as bare-bones as it gets.  But you can see the generated wikis and their
intermediate files there.  Currently this includes,

  - [AmericanStandard][asv]
  - [Coverdale][cdv] (if you're a fan of *Olde Ænglisc* spellings!)
  - [KingJames][kjv]  
  - [WorldEnglish][web]

We hope to add more versions soon, and to expand to other languages.


Installing
----------

```shell
git clone https://github.com/CrossEye/TW5-Bibles.git
cd TW5-Bibles
npm install
```


Running
-------

To rebuild all the current wikis, run

```shell
node index all
```

Or you can regenerate a single version with, for instance,

```shell
node index AmericanStandard
```

This latter will log something like this to the console:

```text
--------------------
Wrote "/path/to/TW5-Bibles/docs/AmericanStandard/raw.json"
Wrote "/path/to/TW5-Bibles/docs/AmericanStandard/enhanced.json"
Wrote "/path/to/TW5-Bibles/docs/AmericanStandard/tiddlers.json"
Wrote "/path/to/TW5-Bibles/docs/AmericanStandard/index.html"

Completed writing "AmericanStandard"
```


Files Generated per Wiki
------------------------

- **`raw.json`**: a near-copy of the input data as discussed in [Adding a
  Version](#adding-a-version), mostly just Verse objects.

- **`enhanced.json`**: a logical structuing of Book > Chapter > Verse, with
  various metadata at different levels

- **`tiddlers.json`**: a flattened version containing Tiddlywiki tiddlers for
  every Book, every Chapter, and every Verse

- **`index.html`**: a simple Tiddlywiki with all these tiddlers plus a few
  templates and other infrastructure tiddlers used to render these all as
  a readable online Bible.

We can ignore all the intermediate files and just concentrate on `index.html`
for most purposes.  But the other files could be useful in debugging.  And
`tiddlers.json` lets us reuse these tiddlers in a different way.  (Note that
while it's quite possible to drag this file to another wiki and import them,
there are over 32,000 tiddlers, and it will take many seconds to respond.)


Adding a Version
----------------

To start a new version, we would create a `config.js` file, added to a new
directory under `versions`.  That should have a default export of a function
that generates structured object.

Before this looks overwhelming, we should note that almost everything in here
will be in the form of references to other files, most of which are supplied and we can override as we choose.

For instance, `versions/Coverdale/config.js` looks like this:

```js
module.exports = () => ({
  title: 'Coverdale Bible',
  verses: require('./coverdale.json').verses,
  metadata: require('./coverdale.json').metadata,
  language: require(`../../common/languages/en.json`),
  paragraphs: require(`../../common/paragraphs.json`),
  sections: require(`../../common/sections.json`,)
  inscriptions: require(`../../common/inscriptions.json`),
  stanzas: require(`../../common/stanzas.json`)
})
```

where everything but `title`, `verses` and `metadata` point to common  implementations.

But in its full glory, the config object will look something like this:

```json
{
  "title": "King James Bible",
  "verses": [
    {
      "book_name": "Genesis", 
      "book": 1, 
      "chapter": 1, 
      "verse": 1, 
      "text": "In the beginning God created the heaven and the earth."
    }, 
    {
      "book_name": "Genesis", 
      "book": 1, 
      "chapter": 1, 
      "verse": 2, 
      "text": "And the earth was without form, and void; and darkness [was] upon the face of the deep. And the Spirit of God moved upon the face of the waters."
    },
    /* ... */
  ],
  "metadata": {/* for future use */},
  "language": { /* To be used for internationalization of the interface */
    "Chapter": "Chapter", 
    "Book": "Book", 
    "Books": "Books", 
    "Verse": "Verse", 
    "books": {
      "Genesis"        : "Genesis"        , 
      "Exodus"         : "Exodus"         , 
      "Leviticus"      : "Leviticus"      , 
      "Numbers"        : "Numbers"        , 
      /* ... */
    ]
  },
  "paragraphs": {
    "Genesis 1": [
      [ 1,  2                ], 
      [ 3,  4,  5            ], 
      [ 6,  7,  8            ], 
      [ 9, 10, 11, 12, 13    ], 
      [14, 15, 16, 17, 18, 19], 
      [20, 21, 22, 23        ], 
      [24, 25                ], 
      [26, 27, 28            ], 
      [29, 30                ], 
      [31                    ]  
    ], 
    "Genesis 2": [
      [ 1,  2,  3                    ], 
      [ 4,  5,  6,  7                ], 
      [ 8,  9, 10, 11, 12, 13, 14, 15], 
      [16, 17                        ], 
      [18, 19, 20                    ], 
      [21, 22, 23, 24, 25            ]  
    ],
    /* ... */ 
  },
  "sections": {
    "Psalms": [
      {
        "title": "Book I", 
        "chapters": [
           1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 
          23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41
        ]
      }, 
      {
        "title": "Book II", 
        "chapters": [
          42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 
          64, 65, 66, 67, 68, 69, 70, 71, 72
        ]
      },
      /* ... */ 
    ]
  },
  "inscriptions": {
    "Psalms 3": "A Psalm of David, when he fled from Absalom his son.", 
    "Psalms 4": "To the chief Musician on Neginoth, A Psalm of David.", 
    "Psalms 5": "To the chief Musician upon Nehiloth, A Psalm of David.", 
    /* ... */
  },
  "stanzas": {
    "Psalms 119": [
      {"title": "ALEPH" , "verses": [  1,   2,   3,   4,   5,   6,   7,   8]}, 
      {"title": "BETH"  , "verses": [  9,  10,  11,  12,  13,  14,  15,  16]}, 
      {"title": "GIMEL" , "verses": [ 17,  18,  19,  20,  21,  22,  23,  24]},
      /* ... */ 
    ]
  }
}
```

### Properties ###

  - **`title`**: This should be obvious.

  - **`verses`**: [Bible SuperSearch][bss] has many JSON versions that contain
    such verse objects.  That has been the basis for the current translations.
    All existing versions use that file, and use to it by reference in their
    config object.

  - **`metadata`**: This is available in the same document that has verses.  We
    will probably add this information to the output wiki soon.

  - **`language`**: Although not yet fully incorporated, this mapping from the
    English text that this was written in to the our target language should let
    wikis use language-appropriate Tags and other bit of interface .

  - **`paragraphs`**: Biblical text tends to be written in paragraphs.  While
    the `common` values were extracted from the King James version, they may be
    close to universal.  But that will need to be checked.  But for the moment,
    the common version may be enough.

The remaining properties are specific to Psalms, which have substantially
different formatting needs from the other chapters.

  - **`sections`**: The book of Psalms has five sections, which usually have fairly
    subtle text annotations.  This lists them.
  - **`inscriptions`**: A majority of the Psalms have some inscription above
    them.
  - **`stanzas`**: Psalm 119 has a specific breakdown into stanzas named for the
    Hebrew letters.



TODO
----

  - [ ] Update the `inscriptions` for the various translations.
  - [ ] Finish translation tools (75% compete?)
  - [ ] Add metadata to the output (perhaps as fields in an About page?)
  - [ ] Allow alternate view templates per version
  - [ ] Simplify config construction with defaults


  [asv]: https://crosseye.github.io/TW5-Bibles/AmericanStandard
  [bss]: https://www.biblesupersearch.com/bible-downloads/
  [cdv]: https://crosseye.github.io/TW5-Bibles/Coverdale
  [kjv]: https://crosseye.github.io/TW5-Bibles/KingJames  
  [tw]: https://tiddlywiki.com
  [web]: https://crosseye.github.io/TW5-Bibles/WorldEnglish

