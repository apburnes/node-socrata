'use strict';

var Socrata = require('./../index');
var test = require('tape').test;

var domain = 'https://controllerdata.lacity.org';
var resource = 'revenue';
var rsrc = 'https://controllerdata.lacity.org/resource/revenue.json'

var config = {
  hostDomain: 'https://controllerdata.lacity.org',
  resource: 'revenue',
  XAppToken: process.env.SODA_TOKEN
}

var soda = new Socrata(config);

test('Get Requested Revenue Data', function(t) {
  soda.get(function(err, response, data) {
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
  };

  soda.get(params, function(err, response, data) {
    t.equal(2, data.length);
    data.forEach(function(item) {
      t.ok(item.fund_name, 'fund_name column retrieved');
      t.ok(item.fiscal_year, 'fiscal_year column retrieved');
      t.notOk(item.fund, 'fund column not retrieved');
    });
  })
});

test('Normalize test params GET request', function(t) {
  t.plan(7);

  var params = {
    select: ['fund_name', 'fiscal_year'],
    limit: 2
  };

  soda.get(params, function(err, response, data) {
    t.equal(2, data.length);
    data.forEach(function(item) {
      t.ok(item.fund_name, 'fund_name column retrieved');
      t.ok(item.fiscal_year, 'fiscal_year retreived');
      t.notOk(item.fund, 'fund column not retrieved');
    });
  })
});

var basicConfig = {
  hostDomain: 'https://opendata.socrata.com',
  resource: '3cwu-pjde',
  username: process.env.SODA_USER,
  password: process.env.SODA_PASS,
  XAppToken: process.env.SODA_TOKEN
};

var postData = [{
  "location": {
    "needs_recoding": false,
    "longitude": "-101.5246",
    "latitude": "36.366"
  },
  "age": "100",
  "name": "Test McData"
}, {
    "location": {
    "needs_recoding": false,
    "longitude": "-116.5246",
    "latitude": "36.366"
  },
  "age": "5",
  "name": "Testa"
}];

var authed = new Socrata(basicConfig);

test('Successful HTTP Basic Auth for the API request', function(t) {
  t.plan(3);

  authed.post(postData, function(err, response, record) {
    t.equal(err, null, 'Successful HTTP Basic');
    t.equal(response.status, 200, 'Responds with a 200 success status.');
    t.ok(record, 'Returned record of posted data')
  });
});
