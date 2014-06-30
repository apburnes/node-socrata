'use strict';

var socrata = require('./../index');
var test = require('tape').test;

var tData = socrata();

test('Initial Function', function(t) {
  t.equal(tData.coolio, 'Gangsters Paradise');
  t.end();
});
