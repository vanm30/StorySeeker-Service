import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';

const ajv = new Ajv();

const schemaFilePath = path.resolve('message-schemas.json');
const schemas = JSON.parse(fs.readFileSync(schemaFilePath, 'utf-8'));

export const compiledSchemas = {};
Object.keys(schemas).forEach((key) => {
  compiledSchemas[key] = ajv.compile(schemas[key]);
});

export function createMessage(type, content) {
  const schema = schemas[type];
  if (!schema) {
    throw new Error(`Unknown message type: ${type}`);
  }
  const message = { type, ...content };

  const validate = compiledSchemas[type];
  if (validate && !validate(message)) {
    throw new Error(
      `Invalid message format for type ${type}: ${ajv.errorsText(
        validate.errors
      )}`
    );
  }

  return JSON.stringify(message);
}

export function parseMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {
    console.error(`Error when parsing message: ${e}`);
    return null;
  }
}
