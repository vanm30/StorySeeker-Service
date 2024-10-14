import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';

const ajv = new Ajv();

export function getCompiledSchema(schemaKey) {
  const schemaFilePath = path.resolve('message-schemas.json');

  try {
    const schemas = JSON.parse(fs.readFileSync(schemaFilePath, 'utf-8'));

    if (!schemas[schemaKey]) {
      throw new Error(`Schema with key '${schemaKey}' does not exist.`);
    }

    const compiledSchema = ajv.compile(schemas[schemaKey]);
    return compiledSchema;
  } catch (error) {
    console.error('Error loading or compiling schema:', error.message);
    throw new Error('Failed to load schema: ' + error.message);
  }
}
