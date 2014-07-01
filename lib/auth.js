'use strict';

var rest = require('rest');
var interceptor = require('rest/interceptor');
var defaultRequest = require('rest/interceptor/defaultRequest');
var errorCode = require('rest/interceptor/errorCode');
var mime = require('rest/interceptor/mime');
var entity = require('rest/interceptor/entity');

function Auth(credentials) {

  var reqObj = {
    path: resourcePath(credentials),
    headers: {
      "X-App-Token": credentials.XAppToken
    }
  }

  var client = rest
    .wrap(defaultRequest, reqObj)
    .wrap(mime)
    .wrap(errorCode, { code: 500});

	return client();
}

function resourcePath(credentials) {
  var path = credentials.hostDomain + '/resource/' + credentials.resource;
  return path;
}

module.exports = Auth;
