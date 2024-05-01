/* eslint-disable */
const AWS = require('aws-sdk');

const ecs = new AWS.ECS({ region: 'eu-west-2' });

const { ENV, CLUSTER_NAME, MS_NAME } = process.env;

if (ENV !== 'dev' && ENV !== 'qa' && ENV !== 'stage' && ENV !== 'prod') {
  console.log('Specify ENV environment variable(should be dev/qa)');
  process.exit(1);
}

const clusterName = `${CLUSTER_NAME}-${ENV}-ecs-cluster`;
const serviceName = `${ENV}-${CLUSTER_NAME}-${MS_NAME}-ecs-service`;

/**
 *
 * @param {*} tasks
 * @param {*} index
 */
function shutDownTasks(tasks, index = 0) {
  if (index === tasks.length) {
    console.log('Stopped all tasks');

    return;
  }
  const arn = tasks[index];
  const params = {
    task: arn,
    cluster: clusterName
  };

  ecs.stopTask(params, function (err, data) {
    if (err) {
      console.log('Failed to stop: ', arn);
      console.log(err, err.stack); // an error occurred
    } else {
      console.log('Successfully stopped: ', arn);
      console.log(data);
      shutDownTasks(tasks, ++index);
    } // successful response
  });

  console.log('Processing Task: ', arn);
}

AWS.config.getCredentials(function (err) {
  if (err) {
    console.log(err.stack);

    return;
  }

  const params = {
    cluster: clusterName,
    serviceName: serviceName,
    desiredStatus: 'RUNNING'
  };

  ecs.listTasks(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);

      return;
    }
    const tasks = data.taskArns;

    console.log(`Received ${tasks.length} tasks`);
    if (tasks.length > 0) {
      shutDownTasks(tasks);
    }
  });
});
