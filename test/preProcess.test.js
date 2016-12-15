import { escapeNestedQuotes } from '../lib/util/preProcess';
import chai from 'chai';
const assert = chai.assert;

describe('preProcess', function() {
  describe('#escapeNestedQuotes', function() {
    it('escapes quotes nested within cells', function() {
      const testString = `"123,456 field with delimiter","11x6" field with quote","good field","field with quote on end""`;
      const actual = escapeNestedQuotes(testString);
      const expected = `"123,456 field with delimiter","11x6"" field with quote","good field","field with quote on end"""`;
      assert(actual === expected);
    });
  });
});
