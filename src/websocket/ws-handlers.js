import { createMessage } from '../utils/messageConstructor.js';
import { generateSugestions } from '../api/openaiClient.js';
import { validateMessageFormat } from '../utils/validators.js';

export function handleReceivedMessage(ws, message) {
  let parsedMessage;

  try {
    parsedMessage = JSON.parse(message);
  } catch (e) {
    console.error(`Error when parsing message: ${e}`);
    ws.send(createMessage('ERROR', { message: 'Failed to parse message' }));
  }

  const isValid = validateMessageFormat(parsedMessage);

  if (!isValid) {
    ws.send(createMessage('ERROR', { message: 'Failed to validate message' }));
    return;
  }

  switch (parsedMessage.type) {
    case 'REQUEST_GENERATE_SUGGESTION':
      handleGenerateSuggestion(ws, parsedMessage);
      break;
    default:
      console.log(`Message type not handled: ${type}`);
      ws.send(
        createMessage('ERROR', {
          message: 'Unable to handle this message type',
        })
      );
  }
}

export async function handleGenerateSuggestion(ws, parsedMessage) {
  const { requestId, query } = parsedMessage;

  console.log('Generating suggestions...');
  const response = await generateSugestions(requestId, query);

  const parsedResponse = JSON.parse(response.choices[0].message.content);
  const { suggestions } = parsedResponse;

  console.log(suggestions);

  ws.send(
    createMessage(requestId, 'RESPONSE_GENERATE_SUGGESTION', {
      suggestions: suggestions,
    })
  );
}
