import { ACCOUNT_ID, ENV } from '../config/configs';

export const EVENT_QUEUE = {
  GLOBAL: {
    queueUrl: `https://sqs.eu-west-2.amazonaws.com/${ACCOUNT_ID}/${ENV}-event-listener-queue.fifo`,
    region: 'eu-west-2'
  },

  SAMPLE: {
    queueUrl: `https://sqs.eu-west-2.amazonaws.com/${ACCOUNT_ID}/${ENV}-task-api-listener-queue.fifo`,
    region: 'eu-west-2'
  }
};
