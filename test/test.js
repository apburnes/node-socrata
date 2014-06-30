'use strict';

var socrata = require('./../index');
var test = require('tape').test;

var domain = 'https://controllerdata.lacity.org';
var resource = 'revenue';

var rsrc = 'https://controllerdata.lacity.org/resource/revenue.json'
var config = {
  domain: 'https://controllerdata.lacity.org',
  resource: 'revenue',
  XAppToken: process.env.SODA_TOKEN
}

var soda = new socrata(config);

test('Initial Function', function(t) {
  soda.listSources(function(data) {
    t.equal(typeof data, 'object');
    t.end();
  });
});
