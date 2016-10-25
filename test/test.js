import { ActivityTester } from 'aries-data';
import test from 'blue-tape';
import CsvToJson from '..';
import fs from 'fs';
import _ from 'highland';
import output from 'test/output';

test('proper configuration', t => {
    t.equal(CsvToJson.props.name, require('../package.json').name);
    t.equal(CsvToJson.props.version, require('../package.json').version);
    t.end();
});

test('transforms csv file to json', async (t) =>  {
	const source = new CsvToJson();
	const rs = fs.createReadStream('test/input.csv')
	const activityTask = {
		input: {
			file: _(rs)
		}
	}
	const data = await source.onTaskCopy(activityTask);
	data.on('data', (dat) => {
		fs.appendFile('test.txt', dat);
	});
});
