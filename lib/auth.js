'use strict';

var client = require('./client');
var _ = require('lodash');

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
    },
    params: normalizeParams(params)
  };

	client(reqObj)
		.then(function(res) {
			var response = {
				headers: res.request.headers,
				path: res.request.path,
				method: res.request.method,
				status: res.status.code
			};
			var data = res.entity;
			cb(null, response, data);
		}, cb);
}

function resourcePath(credentials) {
  var path = credentials.hostDomain + '/resource/' + credentials.resource;
  return path;
}

function normalizeParams(params) {
  return _.transform(params, function(result, value, key) {
    if (key.indexOf('$') !== 0) {
      key = '$' + key;
    }
      result[key] = value;
  });
}

module.exports = exports = Auth;
