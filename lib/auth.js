'use strict';

var rest = require('rest');
var interceptor = require('rest/interceptor');
var defaultRequest = require('rest/interceptor/defaultRequest');
var errorCode = require('rest/interceptor/errorCode');
var mime = require('rest/interceptor/mime');
var entity = require('rest/interceptor/entity');

function Auth(credentials, params, cb) {
  if(!(this instanceof Auth)) {
    return new Auth(credentials, params, cb);
  }

  if (!credentials.hostDomain || !credentials.resource) {
    cb('Error provide a domain url and resource table.');
  }

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

	client()
		.then(function(res) {
			var response = {
				headers: res.request.headers,
				path: res.request.path,
				method: res.request.method,
				status: res.status.code
			};
			var data = res.entity;
			cb(null, response, data);
		});
}

function resourcePath(credentials) {
  var path = credentials.hostDomain + '/resource/' + credentials.resource;
  return path;
}

module.exports = exports = Auth;
