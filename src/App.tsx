import { useState } from 'react';
import './App.css';
import ApiKeyInput from './ApiKeyInput';
import ThemeInput from './ThemeInput';
import generateStory from './generateStory';
import PlaceholderInputs from './PlaceholderInputs';
import { type StoryToken } from './story';

interface FilledStory {
  title: StoryToken[];
  body: StoryToken[];
}

function App() {
  const [story, setStory] = useState('');
  const [filledStory, setFilledStory] = useState<FilledStory | null>(null);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(() => Boolean(localStorage.getItem('apiKey')));

  const handleGenerateStory = async (theme: string) => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      setError('Please enter your API key first.');
      return;
    }

    try {
      setError('');
      setIsGenerating(true);
      const generatedStory = await generateStory(apiKey, theme);
      setStory(generatedStory);
      setFilledStory(null); // Reset filled story when a new story is generated
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFilledStory = (titleTokens: StoryToken[], bodyTokens: StoryToken[]) => {
    setFilledStory({ title: titleTokens, body: bodyTokens });
  };

  const handleApiKeySaved = () => {
    setHasApiKey(true);
    setShowSettings(false);
  };

  const handleApiKeyCleared = () => {
    setHasApiKey(false);
  };

  const handleWriteAnother = () => {
    setStory('');
    setFilledStory(null);
    setError('');
  };

  return (
    <div className="app">
      <header className="site-header">
        <h1 className="wordmark">
          Loco{' '}
          <span className="libs">
            Libs
            <svg viewBox="0 0 120 12" aria-hidden="true" preserveAspectRatio="none">
              <path
                d="M2 8 C 20 2, 32 11, 50 6 S 84 2, 118 7"
                fill="none"
                stroke="var(--red)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        <button
          className="btn btn-ghost btn-sm key-status"
          onClick={() => setShowSettings(!showSettings)}
          aria-expanded={showSettings}
        >
          <span className={'key-dot' + (hasApiKey ? ' saved' : '')} aria-hidden="true" />
          {showSettings ? 'Close API key settings' : 'API key settings'}
        </button>
      </header>
      <p className="tagline">
        Pick a theme, fill in the blanks, and read your ridiculous AI-generated story out
        loud.
      </p>

      {showSettings && (
        <section className="card" aria-label="API key settings">
          <ApiKeyInput onSave={handleApiKeySaved} onClear={handleApiKeyCleared} />
        </section>
      )}

      {!showSettings && (
        <>
          <section className="card" aria-label="Pick a theme">
            <h2 className="card-title">
              <span className="step-num" aria-hidden="true">
                1
              </span>
              Pick a theme
            </h2>
            <p className="card-lede">
              Anything goes — the sillier the better. Leave it empty and the AI picks for
              you.
            </p>
            <ThemeInput onGenerate={handleGenerateStory} busy={isGenerating} />
            {!hasApiKey && (
              <p className="notice notice-hint">
                To write stories you need a free Gemini API key —{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSettings(true);
                  }}
                >
                  add it in API key settings
                </a>
                . It never leaves your browser.
              </p>
            )}
            {error && (
              <p className="notice notice-error" role="alert">
                {error}
              </p>
            )}
          </section>

          {story && !filledStory && (
            <PlaceholderInputs storyTemplate={story} onSubmit={handleFilledStory} />
          )}

          {filledStory && (
            <section className="card story-card" aria-label="Your story">
              {filledStory.title.length > 0 && (
                <h2 className="story-title">
                  {filledStory.title.map((token, i) =>
                    token.isFill ? <mark key={i}>{token.text}</mark> : <span key={i}>{token.text}</span>,
                  )}
                </h2>
              )}
              {/* Preserve line breaks */}
              <p className="story-body">
                {filledStory.body.map((token, i) =>
                  token.isFill ? <mark key={i}>{token.text}</mark> : <span key={i}>{token.text}</span>,
                )}
              </p>
              <div className="story-footer">
                <button className="btn btn-primary" onClick={handleWriteAnother}>
                  Write another story
                </button>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default App;
