# har-compare [![Build Status](https://travis-ci.org/mitsuruog/har-compare.svg?branch=master)](https://travis-ci.org/mitsuruog/har-compare)

> Compare HAR files tools that prevent regression by front-end API calls.


## Install

```
$ npm install --save mitsuruog/har-compare
```


## Usage

```js
const harCompare = require('har-compare');

harCompare('before.har', 'after.har');
```

## API

### harCompare(file1, file2)

#### file1

Type: `string`

The file path to be compared.

#### file2

Type: `string`

The file path to be compared.

## CLI

```
$ npm install --global mitsuruog/har-compare
```

```
$ har-compare --help

  Usage
    $ har-compare [file1] [file2]

  Options

  Examples
    $ har-compare before.har after.har
```

## TODO

- Add options for custom filter settings.

## License

MIT © [Mitsuru Ogawa](https://github.com/mitsuruog)
