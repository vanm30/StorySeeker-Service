import { schemas, compiledSchemas } from './getSchemas.js';

export function createMessage(requestId, type, content) {
  const schema = schemas[type];

  if (!schema) {
    console.error(`Unknown message type: ${type}`);
    return null;
  }
  const message = { requestId, type, ...content };

  const validate = compiledSchemas[type];
  if (validate && !validate(message)) {
    console.error(
      `Invalid message format for type ${type}: ${ajv.errorsText(
        validate.errors
      )}`
    );
    return null;
  }

  return JSON.stringify(message);
}
