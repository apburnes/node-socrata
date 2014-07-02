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
  soda.listSources(function(err, data) {
    t.equal(typeof data, 'object', 'Returns list of API domain urls.');
    t.end();
  });
});

test('Get Requested Revenue Data', function(t) {
  soda.get({}, function(err, response, data) {
    t.equal(typeof data, 'object', 'Responds with requested data.');
    t.equal(response.status, 200, 'Responds with a 200 success status.')
    t.end();
  });
});

test('Limit GET request', function(t) {
  t.plan(7);
  var params = {
    $select: ['fund_name', 'fiscal_year'],
    $limit: 2
  }
  soda.get(params, function(err, res, data) {
    console.log(err);
    t.equal(2, data.length);
    data.forEach(function(item) {
      t.ok(item.fund_name);
      t.ok(item.fiscal_year);
      t.notOk(item.fund);
    });
  })
});

test('Normalize test params GET request', function(t) {
  t.plan(5);
  var params = {
    select: ['fund_name', 'fiscal_year'],
    limit: 2
  }
  soda.get(params, function(err, res, data) {
    console.log(err);
    t.equal(2, data.length);
    data.forEach(function(item) {
      t.ok(item.fund_name);
      t.ok(item.fiscal_year);
    });
  })
});
