import { useState, useEffect } from 'react';

function ApiKeyInput() {
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
  };

  const handleClear = () => {
    localStorage.removeItem('apiKey');
    setApiKey('');
    alert('API key cleared!');
  };

  return (
    <div>
      <label htmlFor="apiKey">Enter your API Key:</label>
      <input
        type="password" // Changed input type to password so that the key is hidden
        id="apiKey"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={handleSave}>Save API Key</button>
      <button onClick={handleClear}>Clear API Key</button>
    </div>
  );
}

export default ApiKeyInput;