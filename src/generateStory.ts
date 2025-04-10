// import { useState } from 'react';

async function generateStory(apiKey: string, theme: string): Promise<string> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: `Please generate a short, creative, and humorous story suitable for use as a Mad Libs game. The story should include placeholders for various parts of speech and categories, such as <noun>, <verb>, <adjective>, <colour>, <body-part>, <person-name>, <place>, <plural-noun>, <funny-sound>, and <exclamation>. Ensure the placeholders are evenly distributed and replace some of the words in the story with these placeholders. The story should be engaging and fun to complete. Theme: ${theme}` }]
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