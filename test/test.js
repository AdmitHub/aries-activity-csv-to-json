import CsvToJson from '../lib';
import _ from 'highland';
import fs from 'fs';
import { assert } from 'chai';
import isEqual from 'lodash.isequal';

describe('CsvToJson', () => {
    // need to test private methods because
    // decorators complicate testing onTask
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

        it('should escape line by line for malformed csv files', (done) => {
            const expectedOutput = _(fs.createReadStream('test/dataWithCommaAndQuotes.json'));
            expectedOutput.split().toArray(outputArray => {
                const rs = _(fs.createReadStream('test/dataWithCommaAndQuotes.csv'));
                const source = new CsvToJson();
                const stream = source._convertCsvToJson(rs, { escapeNestedQuotes: true });
                stream.on('data', (data) => {
                    const actual = JSON.parse(data);
                    const expected = JSON.parse(outputArray.shift());
                    assert(isEqual(actual, expected));
                });
                stream.on('finish', () => done());
            });
        });
    });
});
