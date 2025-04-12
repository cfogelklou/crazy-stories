import { useState, useEffect } from 'react';

interface ApiKeyInputProps {
  onSave?: (apiKey: string) => void;
}

function ApiKeyInput({ onSave }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // Load the API key from localStorage on component mount
    const storedKey = localStorage.getItem('apiKey');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('apiKey', apiKey);
    alert('API key saved!');
    if (onSave) {
      onSave(apiKey);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('apiKey');
    setApiKey('');
    alert('API key cleared!');
  };

  return (
    <div>
      <label htmlFor="apiKey">Gemini API Key:</label>
      <input
        type="password" // Changed input type to password so that the key is hidden
        id="apiKey"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={handleSave}>Save API Key</button>
      <button onClick={handleClear}>Clear API Key</button>
      <p>
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          title="Get your free Gemini API Key by clicking this link"
        >
          Get your Gemini API Key
        </a>
      </p>
    </div>
  );
}

export default ApiKeyInput;