import OpenAI from 'openai';
import { schemas } from '../utils/getSchemas.js';

export async function generateSugestions(query) {
  const openai = new OpenAI();
  const schema = schemas['RESPONSE_GENERATE_SUGGESTION'];
  const suggestions = await openai.chat.completions.create({
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
        schema: schema,
        strict: true,
      },
    },
  });

  return suggestions;
}
