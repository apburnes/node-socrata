##node-socrata##
A Node.js interface to access the Socrata Open Data API (SODA)


###*Note: Work in Progress###

####Install####
```bash
$ npm install node-socrata
```
###Examples###

####List Socrata Datasource Domains####
To quickly scan a list of Socrata data sources, use
the __listSources()__  method to see data source domains.

```javascript
var Socrata = require('node-socrata');

// List the Socrata Open Data API (SODA) data sources
var soda = new Socrata();
soda.listSources(function(list) {
  console.log(list);
})
```

####'GET' Requests####

__Request All Data:__ _default limit: 1000 records_

Using a default 'GET' request with no query parameter returns all records
and fields in the destination data resource table.

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

__Query Data with Socrata's 'SoQL' __

Use a query parameter object to filter/query the destination resource table.

Parameters | Description | Default
--- | --- | ---
`$select`|The set of columns to be returned|All columns
`$where`|Filters the rows to be returned|No filter
`$order`|Specifies the order of results| Unorder
`$group`|Column to group results on, similar to SQL Grouping|No grouping
`$limit`|Maximum number of results to return|1000 (and a maximum of 1000)
`$offset`|Offset count into the results to start at, used for paging|Starts at 0
`$q`|Performs a full text search for a value|No search

```javascript
// Create query parameter object:
// Return ten records & only fund_name and fiscal_year

/** Query Parameters initial "$" is optional **/
var params = {
  $select: ['fund_name', 'fiscal_year'],
  $limit: 10
}

soda.get(params, function(err, response, data) {
  // data... use it.
});

```

####TODO####
- Add 'Post' method
- Add OAuth

####About####
by Andrew Burnes - apburnes@gmail.com
