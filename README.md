# Aries Integration for CSV to JSON

[![CircleCI](https://circleci.com/gh/aries-data/aries-activity-csv-to-json.svg?style=svg)](https://circleci.com/gh/aries-data/aries-activity-csv-to-json)

This is an integration to convert CSV files to JSON format.

## Methods
This integration uses one method, `onTask`. The method is called by default.

### onTask
`onTask` -- Returns the file, given in CSV format, and transforms it to JSON format.

## Configuration
###Escape Nested Quotes
Allows for preprocessing the file line by line to escape nested double quotes
```javascript
"escapeNestedQuotes": false
```

### No Header
Incoming csv file does not have a header row
```javascript
"noHeader": false
```

### Headers
An array of strings to use as the header. If the incoming data does not have a header
row, noHeader must also be set to true in order for headers to be set.
```javascript
"headers": ['header1', 'header2']
```


## Response
```javascript
{"street":"3526 HIGH ST","city":"SACRAMENTO","zip":95838,"state":"CA","beds":2,"baths":1,"sq__ft":836,"type":"Residential","sale_date":"Wed May 21 00:00:00 EDT 2008","price":59222,"latitude":38.631913,"longitude":-121.434879}
{"street":"51 OMAHA CT","city":"SACRAMENTO","zip":95823,"state":"CA","beds":3,"baths":1,"sq__ft":1167,"type":"Residential","sale_date":"Wed May 21 00:00:00 EDT 2008","price":68212,"latitude":38.478902,"longitude":-121.431028}
{"street":"2796 BRANCH ST","city":"SACRAMENTO","zip":95815,"state":"CA","beds":2,"baths":1,"sq__ft":796,"type":"Residential","sale_date":"Wed May 21 00:00:00 EDT 2008","price":68880,"latitude":38.618305,"longitude":-121.443839}
```

## License
MIT
