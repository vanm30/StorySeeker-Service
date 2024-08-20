import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';

const ajv = new Ajv();

const schemaFilePath = path.resolve('message-schemas.json');
const schemas = JSON.parse(fs.readFileSync(schemaFilePath, 'utf-8'));

const compiledSchemas = {};
Object.keys(schemas).forEach((key) => {
  compiledSchemas[key] = ajv.compile(schemas[key]);
});

export function createMessage(type, content) {
  
  const schema = schemas[type];

  if (!schema) {
    console.error(`Unknown message type: ${type}`);
    return null;
  }
  const message = { type, ...content };

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

