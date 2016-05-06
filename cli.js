#!/usr/bin/env node
'use strict';
var meow = require('meow');
var harCompare = require('./');

var cli = meow([
	'Usage',
	'  $ har-compare [file1] [file2]',
	'',
	'Options',
	'',
	'Examples',
	'  $ har-compare before.har after.har'
]);

harCompare(cli.input[0], cli.input[1]);
