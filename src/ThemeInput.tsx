import { useState } from 'react';

function ThemeInput({ onGenerate }: { onGenerate: (theme: string) => void }) {
  const [theme, setTheme] = useState('');

  const handleGenerate = () => {
    onGenerate(theme);
  };

  return (
    <div>
      <label htmlFor="theme">Enter a Story Theme (optional):</label>
      <input
        type="text"
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate Story Prompt</button>
    </div>
  );
}

export default ThemeInput;