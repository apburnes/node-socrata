'use strict';

var rest = require('rest');
var interceptor = require('rest/interceptor');
var defaultRequest = require('rest/interceptor/defaultRequest');
var errorCode = require('rest/interceptor/errorCode');
var entity = require('rest/interceptor/entity');

function connect(rsrcPath, token) {

  var reqObj = {
    path: rsrcPath,
    headers: {
      "X-App-Token": token
    }
  }

  var client = rest
		.wrap(defaultRequest, {
      path: rsrcPath,
      headers: {
        'X-App-Token': token
      }
    });

	return client()
};


