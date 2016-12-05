import { Activity, singleS3StreamInput, singleS3StreamOutput } from 'aries-data';
import { Converter } from 'csvtojson';

/**
 * Loads a csv file, transforms it to JSON, then loads back to s3.
 */
export default class CsvToJson extends Activity {

    @singleS3StreamInput()
    @singleS3StreamOutput()
    onTask(activityTask, config) {
      return this._convertCsvToJson(activityTask.input.file, config);
    }

    /**
     * Processes a readable stream of csv objects, converting them to JSON
     * @param stream a readable stream of CSV
     * @param config
     * @return {Stream} a readable stream
     */
    _convertCsvToJson(stream, config) {
      const csvConverter = new Converter({ constructResult: false });
      return stream.pipe(csvConverter);
    }
};
