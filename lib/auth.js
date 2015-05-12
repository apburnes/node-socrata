'use strict';

var client = require('./client');
var basicAuth = require('rest/interceptor/basicAuth');
var _ = require('lodash');

function getAuth(credentials, params, cb) {
  if(!(this instanceof getAuth)) {
    return new getAuth(credentials, params, cb);
  }

  if (!credentials.hostDomain || !credentials.resource) {
    cb('Error provide a domain url and resource table.');
  }

  var reqObj = {
    path: resourcePath(credentials),
    headers: {
      'X-App-Token': credentials.XAppToken
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

function postAuth(credentials, data, cb) {
  if(!(this instanceof postAuth)) {
    return new postAuth(credentials, data, cb);
  }

  if (!credentials.hostDomain || !credentials.resource || !credentials.username || !credentials.password) {
    cb('Error provide a domain url and resource table.');
  }

  if (typeof data === 'function') {
    cb = data;
    data = {};
  }

  if (!Array.isArray(data)) {
    data = [data];
  }

  var reqObj = {
    method: 'POST',
    username: credentials.username,
    password: credentials.password,
    path: resourcePath(credentials),
    headers: {
      'X-App-Token': credentials.XAppToken,
      'Content-Length': 0,
      'Content-Type': 'application/json'
    },
    entity: data
  };

  client.wrap(basicAuth)(reqObj)
    .then(function(res) {
      var response = {
        headers: res.request.headers,
        path: res.request.path,
        method: res.request.method,
        status: res.status.code
      };
      var record = res.entity;
      cb(null, response, record);
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

var Auth = {
  getAuth: getAuth,
  postAuth: postAuth
}

module.exports = exports = Auth;
