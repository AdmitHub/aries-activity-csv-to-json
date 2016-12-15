import CsvToJson from '../lib/index';
import { escapeNestedQuotes } from '../lib/util/preProcess';
import _ from 'highland';
import fs from 'fs';
import chai from 'chai';
import isEqual from 'lodash.isequal';
const assert = chai.assert;

describe('CsvToJson', () => {

  //need to test private methods because
  //decorators complicate testing onTask
  describe('#_convertCsvToJson', function() {

    it('should transform csv file to json', function(done) {
      const expectedOutput = _(fs.createReadStream('test/output.json'));
      expectedOutput.split().toArray(outputArray => {
        const rs = _(fs.createReadStream('test/input.csv'));
        const source = new CsvToJson();
        const stream = source._convertCsvToJson(rs);
        stream.on('data', (data) => {
          const actual = JSON.parse(data);
          const expected = JSON.parse(outputArray.shift());
          //assert deep equal
          assert(isEqual(actual, expected));
        });
        stream.on('finish', () => done());
      });
    });

  });

  it('should escape line by line for malformed csv files', function() {
    const expectedOutput = _(fs.createReadStream('test/dataWithCommasAndQuotes.json'));
    expectedOutput.split().toArray(outputArray => {
      const rs = _(fs.createReadStream('test/dataWithCommaAndQuotes.csv'));
      const source = new CsvToJson();
      const stream = source._convertCsvToJson(rs, { escapeNestedQuotes: true});
      stream.on('data', (data) => {
        const actual = JSON.parse(data);
        const expected = JSON.parse(outputArray.shift());
        assert(isEqual(actual, expected));
      });
      stream.on('finish', () => done());
    });
  });

  describe('#_buildConverter', function() {
    it('sets preProcessLine if escapeNestedQuotes is true', function() {
      const csvToJson = new CsvToJson();
      const converter = csvToJson._buildConverter({ escapeNestedQuotes: true});
      assert(converter.preProcessLine.toString() === escapeNestedQuotes.toString());
    });
  });
});
