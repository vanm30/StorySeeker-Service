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
          schema: {
            type: 'object',
            properties: {
              suggestions: {
                type: 'object',
                properties: {
                  books: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          description: 'Full name of the book.',
                        },
                        coverImage: {
                          type: 'string',
                          description:
                            'Link to an open-source cover image of the book.',
                        },
                        link: {
                          type: 'string',
                          description: 'Link to the wiki page of the book.',
                        },
                        shortDesc: {
                          type: 'string',
                          description:
                            'Short description of plot. Max two sentences.',
                        },
                        plot: {
                          type: 'string',
                          description: 'Spoiler free plot.',
                        },
                        genre: {
                          type: 'string',
                          description: 'Genre of the book.',
                        },
                        rating: {
                          type: 'string',
                          description: 'Rating based on reviews.',
                        },
                        author: {
                          type: 'string',
                          description: 'Author of the book.',
                        },
                        ISBN: {
                          type: 'string',
                          description: 'ISBN code of the book.',
                        },
                        pageCount: {
                          type: 'string',
                          description: 'Number of pages of the book.',
                        },
                      },
                      required: [
                        'name',
                        'coverImage',
                        'link',
                        'shortDesc',
                        'plot',
                        'genre',
                        'rating',
                        'author',
                        'ISBN',
                        'pageCount',
                      ],
                      additionalProperties: false,
                    },
                  },
                  movies: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          description: 'Full name of the movie title.',
                        },
                        coverImage: {
                          type: 'string',
                          description:
                            'Link to an open-source cover image of the movie.',
                        },
                        link: {
                          type: 'string',
                          description: 'Link to the wiki page of the movie.',
                        },
                        shortDesc: {
                          type: 'string',
                          description:
                            'Short description of plot. Max two sentences.',
                        },
                        plot: {
                          type: 'string',
                          description: 'Spoiler free plot.',
                        },
                        genre: {
                          type: 'string',
                          description: 'Genre of the movie.',
                        },
                        rating: {
                          type: 'string',
                          description: 'Rating based on reviews.',
                        },
                        director: {
                          type: 'string',
                          description: 'Director of the movie.',
                        },
                        boxOffice: {
                          type: 'string',
                          description: 'Net profit of the movie.',
                        },
                        runtime: {
                          type: 'string',
                          description: 'How long the movie is.',
                        },
                      },
                      required: [
                        'name',
                        'coverImage',
                        'link',
                        'shortDesc',
                        'plot',
                        'genre',
                        'rating',
                        'director',
                        'boxOffice',
                        'runtime',
                      ],
                      additionalProperties: false,
                    },
                  },
                },
                required: ['books', 'movies'],
                additionalProperties: false,
              },
            },
            required: ['suggestions'],
            additionalProperties: false,
          },

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
