'use strict';

var _ = require('lodash');
var request = require('request');
var rest = require('rest');
var interceptor = require('rest/interceptor');

var srcUrl = 'https://opendata.socrata.com/api/views/6wk3-4ija/rows.json';

module.exports = Socrata;

function Socrata(config) {

	this.config = config;
  this.config.srcUrl = srcUrl;

}

// Get list of Governemts using Socrata
Socrata.prototype.listSources = function(cb) {
  var opts = {
    url: this.config.srcUrl,
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

function prettyList(string) {
	var parsed = JSON.parse(string);
  return _.filter(parsed.data, function(item) {
		var url = item[12][0];
    return url !== null;
	});
}
