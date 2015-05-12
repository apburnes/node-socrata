'use strict';

var _ = require('lodash');
var auth = require('./lib/auth');
var client = require('./lib/client');

function Socrata(config) {
  if (!(this instanceof Socrata)) {
    return new Socrata(config)
  }

  config = config || {};

  this.credentials = {
    hostDomain: config.hostDomain || '',
    resource: config.resource || '',
    XAppToken: config.XAppToken || '',
    clientId: config.clientId || '',
    clientSecret: config.clientSecret || '',
    username: config.username || '',
    password: config.password || ''
  };

  return;
}

Socrata.prototype.get = function getData(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  }

  auth.getAuth(this.credentials, params, cb);
}

Socrata.prototype.post = function postData(data, cb) {
  if (typeof data === 'function') {
    cb = data;
    data = {};
  }

  auth.postAuth(this.credentials, data, cb);
}

function prettyList(data) {
  return _.filter(data, function(item) {
    var url = item[12][0];
    return url !== null;
  });
}

module.exports = exports = Socrata;
