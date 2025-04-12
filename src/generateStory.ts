async function generateStory(apiKey: string, theme: string): Promise<string> {

  const commonText = `Please generate a short, creative, and humorous story suitable for use as a Mad Libs game. Avoid starting the story with "Here is your story". Instead, provide a clear title on the first line, surrounded by asterisks on each side, followed by two line breaks, and then the story text. The story should include placeholders for various parts of speech and categories. For any type that appears multiple times, assign each an incremental unique identifier (e.g. <noun-1>, <noun-2>, <verb-1>, <verb-2>, etc.). The categories include: noun, verb, adjective, adverb, colour, body-part, person-name, place, plural-noun, funny-sound, animal, food, emotion, vehicle, occupation, celebrity, etc. Each placeholder may appear zero, one, or several times throughout the story. The story should be funny, engaging, and suitable for all ages.`;
  
  const themeText = theme.trim().length > 0
    ? `Theme: ${theme}.`
    : `Additionally, please choose a fun theme for the story.`;
  const promptText = `${commonText} ${themeText}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: promptText }]
      }]
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate story. Please check your API key and try again.');
  }

  const data = await response.json();
  // Extract the story from the Gemini API response format
  console.log(JSON.stringify(data, null, 2)); // Log the entire response for debugging
  return data.candidates[0].content.parts[0].text;
}

export default generateStory;