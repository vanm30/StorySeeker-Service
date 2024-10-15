import OpenAI from 'openai';
import { getCompiledSchema } from '../utils/getSchemas.js';

export async function generateSugestions(query) {
  const openai = new OpenAI();

  try {
    const compiledSchema = getCompiledSchema('RESPONSE_GENERATE_SUGGESTION');
    console.log('Using schema: ', JSON.stringify(schema, null, 2));

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'Your job is to generate movies or books suggestions based on users explanation or feelings.',
        },
        {
          role: 'system',
          content:
            'In your structured response, you shall include a link to an image of given book or movie. For movie use TMDb API and for books use Google Books API.',
        },
        { role: 'user', content: query },
      ],
      model: 'gpt-4o-mini',
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'RESPONSE_GENERATE_SUGGESTION',
          schema: compiledSchema.schema,
          strict: true,
        },
      },
    });

    if (!response || !response.choices || !response.choices.length) {
      throw new Error('No suggestions received from the API');
    }

    return response;
  } catch (error) {
    console.error('Error generating suggestions:', error.message);
    throw new Error('Failed to generate suggestions: ' + error.message);
  }
}
