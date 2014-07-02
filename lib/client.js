'use strict';

var rest = require('rest');
var errorCode = require('rest/interceptor/errorCode');
var mime = require('rest/interceptor/mime');

var client = rest
  .wrap(mime)
  .wrap(errorCode);

module.exports = client;
