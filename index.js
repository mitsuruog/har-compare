'use strict';

const jsdiff = require('diff');
const chalk = require('chalk');
const fs = require('fs');
const deepFilter = require('deep-filter-object');

const pattern = [
  '*',
  '!startedDateTime',
  '!time',
  '!headersSize',
  '!bodySize',
  '!timings',
  '!connection'
];

const headerFilterPattern = [
  'Origin',
  'Referer',
  'Date',
  'Content-Length'
];

function headerFillter(headers) {
  return headers.filter(header => {
    return headerFilterPattern.indexOf(header.name) === -1;
  });
}

function readHarFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if(err) reject(err);
      resolve(data);
    });
  });
}

function scrubHarFile(data) {
  let scrubbed;
  const jsonData = JSON.parse(data).log.entries;
  scrubbed = jsonData.map(json => {
    json.request.headers = headerFillter(json.request.headers);
    json.response.headers = headerFillter(json.response.headers);
    return deepFilter(json, pattern);
  });
  return JSON.stringify(scrubbed, null, 2);
}

function report(data) {
  console.log('');
  console.log(`Result:`);
  console.log(`===================================================================`);
  console.log(chalk.cyan(`---`));
  console.log(chalk.magenta(`+++`));

  data.hunks.forEach((hunk) => lineReporter(hunk));
  return Promise.resolve();
}

function lineReporter(data) {
  console.log(chalk.cyan(`@@`, `-${data.oldStart},${data.oldLines}`), chalk.magenta(`+${data.newStart},${data.newLines}`, `@@`));

  data.lines.forEach((line) => {
    const color = line.startsWith('+') ? 'magenta' : line.startsWith('-') ? 'cyan' : 'white';
    console.log(chalk[color](line));
  });
}

function compare(file1, file2) {
  
  console.log(chalk.underline(`start comparing "${file1}" and "${file2}" ...`));

  Promise.all([
    readHarFile(file1),
    readHarFile(file2)
  ]).then(data => {
    const diff = jsdiff.structuredPatch(file1, file2, scrubHarFile(data[0]), scrubHarFile(data[1]));
    return report(diff);
  }).then(() => {
    console.log('');
    console.log(chalk.underline(`comparing done.`));
  }).catch(err => {
    console.log(chalk.red(err.stack));
  });
}

module.exports = compare;
