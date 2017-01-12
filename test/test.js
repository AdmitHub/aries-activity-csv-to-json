import _ from 'highland';
import fs from 'fs';
import { assert } from 'chai';
import isEqual from 'lodash.isequal';
import CsvToJson from '../lib/index';
import escapeNestedQuotes from '../lib/util/preProcess';

describe('CsvToJson', () => {
    // need to test private methods because
    // decorators complicate testing onTask
    describe('#convertCsvToJson', function() {
        it('should transform csv file to json', function (done) {
            const expectedOutput = _(fs.createReadStream('test/output.json'));
            expectedOutput.split().toArray((outputArray) => {
                const rs = _(fs.createReadStream('test/input.csv'));
                const csvToJson = new CsvToJson();
                const stream = csvToJson.convertCsvToJson(rs);
                stream.on('data', (data) => {
                    const actual = JSON.parse(data);
                    const expected = JSON.parse(outputArray.shift());
                    // assert deep equal
                    assert(isEqual(actual, expected));
                });
                stream.on('finish', () => done());
            });
        });

        it('should escape line by line for malformed csv files', function (done) {
            const expectedOutput = _(fs.createReadStream('test/dataWithCommaAndQuotes.json'));
            expectedOutput.split().toArray((outputArray) => {
                const rs = _(fs.createReadStream('test/dataWithCommaAndQuotes.csv'));
                const csvToJson = new CsvToJson();
                const stream = csvToJson.convertCsvToJson(rs, { escapeNestedQuotes: true });
                stream.on('data', (data) => {
                    const actual = JSON.parse(data);
                    const expected = JSON.parse(outputArray.shift());
                    assert(isEqual(actual, expected));
                });
                stream.on('finish', () => done());
            });
        });
    });

    describe('#applyConfig', function () {
        it('sets preProcessLine if escapeNestedQuotes is true', function () {
            const csvToJson = new CsvToJson();
            csvToJson.applyConfig({ escapeNestedQuotes: true });
            assert(csvToJson.converter.preProcessLine.toString() === escapeNestedQuotes.toString());
        });
    });

});
