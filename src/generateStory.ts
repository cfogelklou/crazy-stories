// import { useState } from 'react';

async function generateStory(apiKey: string, theme: string): Promise<string> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: `Write a short creative story about: ${theme}` }]
      }]
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate story. Please check your API key and try again.');
  }

  const data = await response.json();
  // Extract the story from the Gemini API response format
  // The response structure has candidates with content parts
  console.log(JSON.stringify(data, null, 2)); // Log the entire response for debugging
  return data.candidates[0].content.parts[0].text;
}

export default generateStory;