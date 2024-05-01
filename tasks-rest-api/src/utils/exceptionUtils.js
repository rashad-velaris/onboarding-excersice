export function appendExceptionStack(error) {
  if (error instanceof Error) {
    const { stack } = new Error();
    error.stack += `\ncaused by ${stack}`; // eslint-disable-line no-param-reassign
    return error;
  }
  return new Error(error);
}
