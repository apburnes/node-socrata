##node-socrata##
A Node.js interface to access the Socrata Open Data API (SODA)

####Install####
```bash
$ npm install node-socrata
```
####Examples####
----
__List Socrata Datasource Domains__
```javascript
var Socrata = require('node-socrata');

// List the Socrata Open Data API (SODA) data sources
var soda = new Socrata();
soda.listSources(function(list) {
  console.log(list);
})
```
----
__'GET' Request__
```javascript
var Socrata = require('node-socrata');

var config = {
  // find a hostDomain from the listSource method
  hostDomain: 'https://controllerdata.lacity.org',
  // An accessible API table from the host domain
  resource: 'revenue',
  // Create account and register app https://opendata.socrata.com
  XAppToken: process.env.SOCRATA_APP_TOKEN || 'registered-app-token'
};

var soda = new Socrata(config);

soda.get(function(err, response, data) {
  // response = json object returning headers, status, path, method
  // data  = json object of table records
});

```

####TODO####
- Add 'Get' filter params
- Add 'Post' method
- Add OAuth

####About####
by Andrew Burnes - apburnes@gmail.com
