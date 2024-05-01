import getDbConnection from './dbConnection';

export default async (wrappedFunction, ...args) => {
  const dbConnection = await getDbConnection();

  return dbConnection.transaction(async (transaction) => {
    const txn = {
      query: (query, options) => dbConnection.query(query, { ...options, transaction })
    };

    return wrappedFunction(txn, ...args);
  });
};
