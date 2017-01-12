import { Activity, singleS3StreamInput, singleS3StreamOutput } from 'aries-data';
import { Converter } from 'csvtojson';
import escapeNestedQuotes from './util/preProcess';

/**
 * Loads a csv file, transforms it to JSON, then loads back to s3.
 * Currently requires first line to contain headers
 */
export default class CsvToJson extends Activity {

    constructor() {
        super();
        this.converter = new Converter({ constructResult: false });
    }

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
        this.applyConfig(config);
        return stream.pipe(this.converter);
    }

    /**
     * Checks settings in config and applies appropriately to this.converter
     * @param config
     */
    applyConfig(config) {
        if ((config || {}).escapeNestedQuotes) {
            this.converter.preProcessLine = escapeNestedQuotes;
        }
    }
}
