import { useState } from 'react';

const THEME_IDEAS = [
  'A space pirate birthday party',
  'The haunted school cafeteria',
  "Grandma runs a marathon",
  "A dragon's first day at work",
];

interface ThemeInputProps {
  onGenerate: (theme: string) => void;
  busy: boolean;
}

function ThemeInput({ onGenerate, busy }: ThemeInputProps) {
  const [theme, setTheme] = useState('');

  const handleGenerate = () => {
    onGenerate(theme);
  };

  return (
    <div>
      <form className="theme-row" onSubmit={(e) => e.preventDefault()}>
        <label className="sr-only-label" htmlFor="theme">
          Story theme (optional)
        </label>
        <input
          className="text-input"
          type="text"
          id="theme"
          name="theme"
          placeholder="e.g. a llama detective in outer space"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
        <button className="btn btn-primary" type="submit" onClick={handleGenerate} disabled={busy}>
          {busy ? 'Writing…' : 'Generate story'}
        </button>
      </form>
      <div className="chip-row" aria-label="Theme ideas">
        {THEME_IDEAS.map((idea) => (
          <button
            key={idea}
            type="button"
            className="chip"
            disabled={busy}
            onClick={() => setTheme(idea)}
          >
            {idea}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeInput;
