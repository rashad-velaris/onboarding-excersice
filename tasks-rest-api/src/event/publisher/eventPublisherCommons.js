import { Producer } from 'sqs-producer';
import { EVENT_QUEUE } from '../../constants/eventConstants';
import { getCorrelationId, getSchemaName } from '../../utils/contextUtils';
import { getTenantApplicationToken } from '../../connectors/tokenServiceConnector';
import { logString } from '../../utils/commonUtils';
import logger from '../../utils/logger';

const { GLOBAL } = EVENT_QUEUE;

const send = (sqsPayload, eventQueue = GLOBAL) => {
  const producer = Producer.create(eventQueue);

  logger.debug(`publishing event. payload: ${JSON.stringify(sqsPayload)}`);
  return producer.send(sqsPayload);
};

export const publishEvent = async (eventName, eventData, eventQueue = GLOBAL) => {
  const schema = getSchemaName();
  const timestamp = Date.now();
  const correlationId = getCorrelationId();

  // modify this to allow parallel event processing
  const groupId = `${schema}-${eventName}`;

  // use getAuthorizationToken() if you want to use same request token for events as well
  const authorizationToken = await getTenantApplicationToken();

  const deduplicationId = `${schema}-${eventName}-${timestamp}`;
  const id = `${timestamp}`;

  const sqsPayload = {
    id,
    body: JSON.stringify({
      eventName,
      eventData,
      initiator: 'task-api',
      correlationId,
      authorization: authorizationToken,
      timestamp,
      __sqsData: { groupId, deduplicationId, id }
    }),
    groupId,
    deduplicationId
  };

  logger.info(`publishing event. ${logString({ eventName, deduplicationId })}`);
  return send(sqsPayload, eventQueue);
};

export const publishEventBatch = async (eventName, eventDataList, eventQueue = GLOBAL) => {
  const schema = getSchemaName();
  const timestamp = Date.now();
  const correlationId = getCorrelationId();

  // modify this to allow parallel event processing
  const groupId = `${schema}-${eventName}`;

  // use getAuthorizationToken() if you want to use same request token for events as well
  const authorizationToken = await getTenantApplicationToken();

  const sqsPayload = eventDataList.map((eventData, index) => {
    const id = `${timestamp}-${index}`;
    const deduplicationId = `${schema}-${eventName}-${timestamp}-${index}`;

    return {
      id,
      body: JSON.stringify({
        eventName,
        eventData,
        initiator: 'task-api',
        correlationId,
        authorization: authorizationToken,
        timestamp,
        __sqsData: { groupId, deduplicationId, id }
      }),
      groupId,
      deduplicationId
    };
  });

  logger.info(`publishing event batch. ${logString({ eventName })}`);
  return send(sqsPayload, eventQueue);
};
