'use strict';

var _ = require('lodash');
var request = require('request');
var Auth = require('./lib/auth');
var rest = require('rest');
var interceptor = require('rest/interceptor');

var srcListUrl = 'https://opendata.socrata.com/api/views/6wk3-4ija/rows.json';

module.exports = Socrata;

function Socrata(config) {

	this.config = config;
  this.config.srcListUrl = srcListUrl;
	this.config.dataType = config.dataType || 'json';

	var credentials = {
		hostDomain: config.hostDomain,
		resource: config.resource,
		XAppToken: config.XAppToken,
		secretToken: config.secretToken || ''
	};

	this.auth = new Auth(credentials);
}

// Get list of Governemts using Socrata
Socrata.prototype.listSources = function(cb) {
  var opts = {
    url: this.config.srcListUrl,
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
	var client = this.auth;
	client
		.then(function(res) {
			var response = {
				headers: res.request.headers,
				path: res.request.path,
				method: res.request.method,
				status: res.status.code
			};
			var data = res.entity;
			cb(null, response, data);
		})
}

function prettyList(string) {
	var parsed = JSON.parse(string);
  return _.filter(parsed.data, function(item) {
		var url = item[12][0];
    return url !== null;
	});
}
