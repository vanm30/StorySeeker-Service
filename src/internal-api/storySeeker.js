import { generateSugestions } from '../external-api/openaiClient.js';
import { createMessage } from '../utils/messageHandlers.js';

export async function handleGenerateSuggestion(res, parsedMessage) {
  const { requestId, query } = parsedMessage;

  console.log('Generating suggestions...');
  const response = await generateSugestions(requestId, query);

  console.log(`Parsing: ${response}`);
  const parsedResponse = JSON.parse(response.choices[0].message.content);
  const { suggestions } = parsedResponse;

  console.log(`Sending response ${suggestions}`);

  res.status(200).json(
    createMessage(requestId, 'RESPONSE_GENERATE_SUGGESTION', {
      suggestions: suggestions,
    })
  );
}
