import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';

const ajv = new Ajv();

const schemaFilePath = path.resolve('message-schemas.json');
export const schemas = JSON.parse(fs.readFileSync(schemaFilePath, 'utf-8'));

export const compiledSchemas = {};
Object.keys(schemas).forEach((key) => {
  compiledSchemas[key] = ajv.compile(schemas[key]);
});