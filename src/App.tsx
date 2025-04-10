import { useState } from 'react'
import './App.css'
import ApiKeyInput from './ApiKeyInput';
import ThemeInput from './ThemeInput';
import generateStory from './generateStory';
import PlaceholderInputs from './PlaceholderInputs';

function App() {
  
  const [story, setStory] = useState('');
  const [filledStory, setFilledStory] = useState('');
  const [error, setError] = useState('');

  const handleGenerateStory = async (theme: string) => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      setError('Please enter your API key first.');
      return;
    }

    try {
      setError('');
      const generatedStory = await generateStory(apiKey, theme);
      setStory(generatedStory);
      setFilledStory(''); // Reset filled story when a new story is generated
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleFilledStory = (finalStory: string) => {
    setFilledStory(finalStory);
  };

  return (
    <>
      <ApiKeyInput />
      <ThemeInput onGenerate={handleGenerateStory} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {story && !filledStory && (
        <PlaceholderInputs storyTemplate={story} onSubmit={handleFilledStory} />
      )}
      {filledStory && (
        <div>
          <h2>Your Final Story</h2>
          <p>{filledStory}</p>
        </div>
      )}
    </>
  );
}

export default App;
