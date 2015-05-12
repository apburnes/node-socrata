##node-socrata##
A Node.js interface to access the Socrata Open Data API (SODA)


###*Note: Work in Progress###

####Install####
```bash
$ npm install node-socrata
```
###Examples###

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

####'POST' Requests####

To post data to your authorized Socrata tables use the `.post` method which
takes two arguments: data _(json)_ and a callback function which returns the
response.

To use the post method, you will have to setup your Socrata username and
password in the initial config to execute a successful post.

```javascript
//  Setup and configure the Socrata table to execute a 'POST' request
var Socrata = require('node-socrata');

var config = {
  hostDomain: 'https://opendata.socrata.com', // The host domain for the table.
  resource: 'my-table', // The table where data will be posted.
  username: process.env.SOCRATA_USERNAME || 'username',
  password: process.env.SOCRATA_PASSWORD || 'password',
  XAppToken: process.env.SOCRATA_APP_TOKEN || 'registered-app-token'
};

// **Note: Make sure to follow the table's existing schema;
var data = {
  foo: 'bar'
};

var soda = new Socrata(config);

// Post that data
soda.post(data, function(err, response, record) {
  // handle error, response, and record
});

```

With a successful post, the callback's __record__ argument will return
the number of records created, deleted, and updated.  With the post method,
records will only be created.

```
Output generated from the record

{ 'By RowIdentifier': 0,
  'Rows Updated': 0,
  'Rows Deleted': 0,
  'Rows Created': 1,
  Errors: 0,
  'By SID': 0
}

```

####TODO####
- Add 'DELETE' method
- Add 'PUT' method
- Add supported data types

####About####
by Andrew Burnes - apburnes@gmail.com
