/* eslint-disable class-methods-use-this */
import { Activity, singleS3StreamInput, singleS3StreamOutput } from 'aries-data';
import { Converter } from 'csvtojson';
import escapeNestedQuotes from './util/preProcess';

/**
 * Loads a csv file, transforms it to JSON, then loads back to s3.
 * Currently requires first line to contain headers
 */
export default class CsvToJson extends Activity {

    @singleS3StreamInput()
    @singleS3StreamOutput()
    onTask(activityTask, config) {
        return this.convertCsvToJson(activityTask.input.file, config);
    }

    /**
     * Processes a readable stream of csv objects, converting them to JSON
     * @param stream a readable stream of CSV
     * @param config
     * @return {Stream} a readable stream
     */
    convertCsvToJson(stream, config) {
        const converter = this.buildConverter(config);
        return stream.pipe(converter);
    }

    /**
     * Checks settings in config and applies appropriately to this.converter
     * @param config
     */

    buildConverter(config = {}) {
        const opts = { constructResult: false };
        if (config.headers) {
            opts.noheader = config.replaceHeader;
            opts.headers = config.headers;
        }
        const converter = new Converter(opts);
        if (config.escapeNestedQuotes) {
            converter.preProcessLine = escapeNestedQuotes;
        }
        return converter;
    }
}
