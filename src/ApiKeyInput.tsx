import { useState, useEffect } from 'react';

interface ApiKeyInputProps {
  onSave?: (apiKey: string) => void;
  onClear?: () => void;
}

function ApiKeyInput({ onSave, onClear }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('');
  const [revealKey, setRevealKey] = useState(false);

  useEffect(() => {
    // Load the API key from localStorage on component mount
    const storedKey = localStorage.getItem('apiKey');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('apiKey', apiKey);
    setStatus(apiKey ? 'API key saved — it stays in this browser.' : 'API key cleared.');
    if (onSave) {
      onSave(apiKey);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('apiKey');
    setApiKey('');
    setStatus('API key cleared.');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div>
      <h2 className="card-title">Gemini API key</h2>
      <p className="card-lede">
        Loco Libs runs on your own key — it is stored only in this browser and sent
        straight to Google when generating a story.
      </p>
      <div className="settings-form">
        <div className="field">
          <label className="field-label" htmlFor="apiKey">
            Your key
          </label>
          <input
            className="text-input"
            type={revealKey ? 'text' : 'password'}
            id="apiKey"
            name="apiKey"
            autoComplete="off"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="button" onClick={handleSave}>
          Save key
        </button>
        <button className="btn btn-ghost" type="button" onClick={handleClear}>
          Clear
        </button>
      </div>
      <p className="settings-note">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setRevealKey(!revealKey)}
        >
          {revealKey ? 'Hide key' : 'Show key'}
        </button>{' '}
        · No key yet?{' '}
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          title="Get your free Gemini API Key by clicking this link"
        >
          Get a free Gemini API key
        </a>
      </p>
      {status && (
        <p className="status-ok" role="status">
          {status}
        </p>
      )}
    </div>
  );
}

export default ApiKeyInput;
