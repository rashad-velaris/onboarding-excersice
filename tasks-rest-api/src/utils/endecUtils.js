export const encodeBase64 = (text) => Buffer.from(text).toString('base64');

export const decodeBase64 = (text) => Buffer.from(text, 'base64').toString();
