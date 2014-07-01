'use strict';

var _ = require('lodash');
var request = require('request');
var auth = require('./lib/auth');
var rest = require('rest');
var interceptor = require('rest/interceptor');

var SRCLIST = 'https://opendata.socrata.com/api/views/6wk3-4ija/rows.json';

function Socrata(config) {
  if (!(this instanceof Socrata)) {
    return new Socrata(config)
  }

  this.config = config || {};
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
    url: this.SRCLIST,
    headers: {
			'X-App-Token': this.config.XAppToken
    }
  }
  request(opts, function(err, res, data) {
    if (err) return err;
    var list = prettyList(data)
    cb(_.map(list, function(item) { return item[12][0] }));
  });
}

Socrata.prototype.get = function(params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  }

  auth(this.credentials, params, cb);

}

function prettyList(string) {
	var parsed = JSON.parse(string);
  return _.filter(parsed.data, function(item) {
		var url = item[12][0];
    return url !== null;
	});
}

module.exports = exports = Socrata;