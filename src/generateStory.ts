async function generateStory(apiKey: string, theme: string): Promise<string> {
    const promptText = theme.trim().length > 0
      ? `Please generate a short, creative, and humorous story suitable for use as a Mad Libs game. Avoid starting the story with "Here is your story". Instead, provide a clear title on the first line, surrounded by asterisks on each side, followed by two line breaks, and then the story text. The story should include placeholders for various parts of speech and categories: <noun>, <verb>, <adjective>, <colour>, <body-part>, <person-name>, <place>, <plural-noun>, <funny-sound>, and <exclamation>. Ensure the placeholders are evenly distributed. Theme: ${theme}.`
      : `Please generate a short, creative, and humorous story suitable for use as a Mad Libs game. Avoid starting the story with "Here is your story". Instead, provide a clear title on the first line, surrounded by asterisks on each side, followed by two line breaks, and then the story text. The story should include placeholders for various parts of speech and categories: <noun>, <verb>, <adjective>, <colour>, <body-part>, <person-name>, <place>, <plural-noun>, <funny-sound>, and <exclamation>. Additionally, please choose a fun theme for the story.`;
  
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