import { generateSugestions } from '../external-api/openaiClient.js';

export async function handleGenerateSuggestion(res, parsedMessage) {
  const { query } = parsedMessage;

  try {
    const response = await generateSugestions(query);
    console.log(`Received response:`, JSON.stringify(response, null, 2));

    const suggestions = response.choices[0]?.message?.content;
    console.log(`Parsed Suggestions: ${suggestions}`);

    if (!suggestions || !response) {
      throw new Error('No suggestions received from the API');
    }

    res.status(200).json(suggestions);
  } catch (e) {
    console.error('Error generating suggestions:', e.message);
    res
      .status(500)
      .json({ error: e.message || 'Failed to generate suggestions' });
  }
}
