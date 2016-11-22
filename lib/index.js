import { Activity, singleS3StreamInput, singleS3StreamOutput } from 'aries-data';
import { Converter } from 'csvtojson';

/**
 * Loads a csv file, transforms it to JSON, then loads back to s3.
 */
export default class CsvToJson extends Activity {
    static props = {
        name: require('../package.json').name,
        version: require('../package.json').version,
    };

    @singleS3StreamInput()
    @singleS3StreamOutput()
    async onTask(activityTask, config) {
        const csvConverter = new Converter({ constructResult: false });
        return activityTask.input.file.pipe(csvConverter);
    }
};
