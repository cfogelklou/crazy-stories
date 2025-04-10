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
          {(() => {
            const lines = filledStory.split('\n').filter(line => line.trim().length > 0);
            const titleRegex = /^(\*+)(.*?)\*+$/;
            let title = '';
            let rest = filledStory;
            if (lines.length && titleRegex.test(lines[0].trim())) {
              const match = lines[0].trim().match(titleRegex);
              title = match ? match[2].trim() : '';
              rest = lines.slice(1).join('\n');
            }
            return (
              <>
                {title && <h2 style={{ textAlign: 'center' }}>{title}</h2>}
                <p style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>{rest}</p>
              </>
            );
          })()}
        </div>
      )}
    </>
  );
}

export default App;