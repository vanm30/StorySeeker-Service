import { generateSugestions } from '../api/openaiClient.js';
import { createMessage } from './messageConstructor.js';

export async function handleGenerateSuggestion(res, parsedMessage) {
  const { requestId, query } = parsedMessage;

  console.log('Generating suggestions...');
  const response = await generateSugestions(requestId, query);

  const parsedResponse = JSON.parse(response.choices[0].message.content);
  const { suggestions } = parsedResponse;

  res.status(200).json(
    createMessage(requestId, 'RESPONSE_GENERATE_SUGGESTION', {
      suggestions: suggestions,
    })
  );
}
