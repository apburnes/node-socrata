'use strict';

var _ = require('lodash');
var auth = require('./lib/auth');
var client = require('./lib/client');

var SRCLIST = 'https://opendata.socrata.com/api/views/6wk3-4ija/rows.json';

function Socrata(config) {
  if (!(this instanceof Socrata)) {
    return new Socrata(config)
  }

  config = config || {};
  this.SRCLIST = SRCLIST;

	var credentials = {
		hostDomain: config.hostDomain || '',
		resource: config.resource || '',
		XAppToken: config.XAppToken || '',
		secretToken: config.secretToken || ''
	};

  this.credentials = credentials;

  return;
}

// Get list of Governemts using Socrata
Socrata.prototype.listSources = function(cb) {
  var opts = {
    path: this.SRCLIST,
    headers: {
			'X-App-Token': this.credentials.XAppToken
    }
  }
  client(opts)
    .then(function(res) {
      var list = prettyList(res.entity.data);
      cb(null, _.map(list, function(item) { return item[12][0] }))
    }, cb);
}

Socrata.prototype.get = function(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  }

  auth(this.credentials, params, cb);

}

function prettyList(data) {
	// var parsed = JSON.parse(string);
  return _.filter(data, function(item) {
		var url = item[12][0];
    return url !== null;
	});
}

module.exports = exports = Socrata;
