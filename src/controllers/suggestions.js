import { generateSugestions } from '../services/openaiClient.js';

const handleSuggestionRequest = async (res, req) => {
  console.log('Received request body:', req.body);
  
  const { query } = req.body;

  try {
    console.log('Calling OpenAI API with query:', query);

    const response = await generateSugestions(query);
    console.log(`Received response:`, JSON.stringify(response, null, 2));

    const suggestions = response.choices[0]?.message?.content;   

    if (!suggestions || !response) {
      throw new Error('No suggestions received from the API');
    }

    console.log('Succesfully sending response back to client...');
    res.status(200).json(suggestions);
  } catch (error) {
    console.error('Error generating suggestions:', error.message);
    res
      .status(500)
      .json({ error: error.message || 'Failed to generate suggestions' });
  }
};

export { handleSuggestionRequest };
