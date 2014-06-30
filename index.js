'use strict';

var rest = require('rest');
var interceptor = require('rest/interceptor');

function Socrata(urlDomain, dataSetIdentifier) {
  if(!(this instanceof Socrata)) {
    return new Socrata(urlDomain, dataSetIdentifier);
  }

  this.coolio = 'Gangsters Paradise';
}

module.exports = exports = Socrata;
