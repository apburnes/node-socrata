'use strict';

var socrata = require('./../index');
var test = require('tape').test;

var domain = 'https://controllerdata.lacity.org';
var resource = 'revenue';
var rsrc = 'https://controllerdata.lacity.org/resource/revenue.json'

var config = {
  hostDomain: 'https://controllerdata.lacity.org',
  resource: 'revenue',
  XAppToken: process.env.SODA_TOKEN
}

var soda = new socrata(config);

test('Initial Function', function(t) {
  soda.listSources(function(data) {
    t.equal(typeof data, 'object', 'Returns list of API domain urls.');
    t.end();
  });
});

test('Get Requested Revenue Data', function(t) {
  soda.get({}, function(data) {
    t.equal(typeof data, 'object', 'Responds with requested data.');
    t.equal(data.status.code, 200, 'Responds with a 200 success status.')
    t.end();
  })
})
