import logger from './logger';

export const logString = (params) => {
  return Object.keys(params)
    .map((key) => {
      const value = params[key];
      return `${key}: ${typeof value === 'object' || Array.isArray(value) ? JSON.stringify(value) : value}`;
    })
    .join(', ');
};

export const removeEmpty = (object) => {
  return JSON.parse(JSON.stringify(object, (_, v) => v || undefined));
};

export const partition = (array, fn, parameters) => {
  return parameters
    ? array.reduce(
        (partitioned, element) => {
          const _partitionIndex = parameters.findIndex((parameter) => fn(element, parameter));
          if (_partitionIndex !== -1) {
            partitioned[_partitionIndex].push(element);
          } else {
            partitioned[parameters.length].push(element);
          }
          return partitioned;
        },
        [...parameters.map(() => []), []]
      )
    : array.reduce(
        (partitioned, element) => {
          if (fn(element)) {
            partitioned[0].push(element);
          } else {
            partitioned[1].push(element);
          }
          return partitioned;
        },
        [[], []]
      );
};

export const chunkify = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export const sleep = (timeout) => {
  return new Promise((resolve) => {
    logger.info(`sleeping for ${timeout} ms`);
    setTimeout(() => {
      logger.info(`woke up after sleeping for ${timeout} ms`);
      resolve();
    }, timeout);
  });
};

export const generateName = (firstName, lastName) => {
  return `${firstName || ''} ${lastName || ''}`.trim();
};
