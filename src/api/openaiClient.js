import OpenAI from "openai";

const openai = new OpenAI();

export async function generateSugestions() {

  
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Your job is to generate movies or books suggestions based on users explanation or feelings." }],
    model: "gpt-4o-mini",
    response_format: {
        type: "json_schema",
        json_schema: {
            name: "math_response",
            schema: {
                type: "object",
                properties: {
                    steps: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                explanation: { type: "string" },
                                output: { type: "string" }
                            },
                            required: ["explanation", "output"],
                            additionalProperties: false
                        }
                    },
                    final_answer: { type: "string" }
                },
                required: ["steps", "final_answer"],
                additionalProperties: false
            },
            strict: true
        }
    }
  });

  return ['yo', 'yo'];
}
