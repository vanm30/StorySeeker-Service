import { error } from 'ajv/dist/vocabularies/applicator/dependencies.js';
import { generateSugestions } from '../external-api/openaiClient.js';
import { createMessage } from '../utils/messageHandlers.js';

export async function handleGenerateSuggestion(res, parsedMessage) {
  const { query } = parsedMessage;

  try {
    const response = await generateSugestions(query);
    console.log(`Received response: ${response}`);

    const suggestions = response.choices[0]?.message?.content;
    console.log(`Parsed Suggestions: ${suggestions}`);

    if (!suggestions || !response) {
      throw new Error('No suggestions received from the API');
    }

    res.status(200).json(
      createMessage('RESPONSE_GENERATE_SUGGESTION', {
        suggestions: suggestions,
      })
    );
  } catch (e) {
    console.error('Error generating suggestions:', e.message);
    res
      .status(500)
      .json({ error: e.message || 'Failed to generate suggestions' });
  }
}
