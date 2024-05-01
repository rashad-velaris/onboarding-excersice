/**
 * @param {List} resultList
 * @param {string} keyAttribute
 * @param {string} format
 */
export function responseFormatter(resultList, keyAttribute, format) {
  if (format === 'list') {
    return resultList;
  }
  const resultMap = {};

  resultList.forEach((column) => {
    resultMap[column[keyAttribute]] = column;
  });

  return resultMap;
}

/**
 *
 * @param {String} str
 */
export function snakeToCamel(str) {
  return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
}
