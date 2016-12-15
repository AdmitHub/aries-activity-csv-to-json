/**
 * Utility functions for preprocessing csv files line by line
 */

/**
 * Scans a line of a csv file, replacing all quotes within cells delimited by " on the left and
 * either ", or "\n on the right
 * @param line the string representing a line of the csv file
 * @param lineNumber the lineNumber
 * @return {String} the processed line
 */
export function escapeNestedQuotes(line, lineNumber) {
  const escapedLine = line.replace(/"(.*?)((\",)|(\"$))/ig, match => {
    const start = 1; //ignore starting quote
    let end =  match.length - 1;
    if (match[end] === ',') end--;
    const replacedQuotes = match.substring(start, end).replace(/"/ig, '$&"');
    return `"${replacedQuotes}"${ end < (match.length - 1) ? ',' : ''}`;
  });
  return escapedLine;
}
