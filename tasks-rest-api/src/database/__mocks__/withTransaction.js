export default function withTransaction(wrappedFunction, ...args) {
  const transactions = {
    query: jest.fn()
  };
  return wrappedFunction(transactions, ...args);
}
