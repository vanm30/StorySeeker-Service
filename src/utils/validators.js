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

export function validateMessageFormat(message) {
  //Validate Type
  const { type } = message || null;
  if (!type || !compiledSchemas[type]) {
    console.log(`Message type is wrong or not defined`);
    return 0;
  }

  //Validate format (schema)
  const validate = compiledSchemas[type];
  if (!validate(message)) {
    console.error(
      `Invalid message format for type ${type}: ${ajv.errorsText(
        validate.errors
      )}`
    );
    return 0;
  }

  return 1;
}
