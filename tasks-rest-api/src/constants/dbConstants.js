import { ENV } from '../config/configs';

const envMapping = new Map([
  ['dev', { READER_MAX: 10, READER_MIN: 5, MASTER_MAX: 20, MASTER_MIN: 10 }],
  ['qa', { READER_MAX: 10, READER_MIN: 5, MASTER_MAX: 20, MASTER_MIN: 10 }],
  ['perf', { READER_MAX: 10, READER_MIN: 5, MASTER_MAX: 20, MASTER_MIN: 10 }],
  ['stage', { READER_MAX: 10, READER_MIN: 5, MASTER_MAX: 20, MASTER_MIN: 10 }],
  ['prod', { READER_MAX: 50, READER_MIN: 25, MASTER_MAX: 100, MASTER_MIN: 50 }]
]);

const envValues = envMapping.get(ENV);
const readerValues = envValues || { READER_MAX: 10, READER_MIN: 5 };
const masterValues = envValues || { MASTER_MAX: 20, MASTER_MIN: 10 };

export const READER_CONNECTION_COUNT = {
  MAX_CONNECTION_COUNT: readerValues.READER_MAX,
  MIN_CONNECTION_COUNT: readerValues.READER_MIN
};

export const MASTER_CONNECTION_COUNT = {
  MAX_CONNECTION_COUNT: masterValues.MASTER_MAX,
  MIN_CONNECTION_COUNT: masterValues.MASTER_MIN
};

export const POOL_TYPE = {
  READ_WRITE_POOL: false,
  READ_POOL: true
};
