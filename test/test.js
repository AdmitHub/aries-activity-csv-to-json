import CsvToJson from '../lib/index';
import _ from 'highland';
import fs from 'fs';
import chai from 'chai';
import isEqual from 'lodash.isequal';
const assert = chai.assert;

describe('CsvToJson', () => {

  //need to test private methods because
  //decorators complicate testing onTask
  describe('#_convertCsvToJson', () => {
    it('should transform csv file to json', (done) => {
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
});
