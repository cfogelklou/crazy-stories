import { useState } from 'react';
import { placeholderType, splitTitle, tokenize, type StoryToken } from './story';

interface PlaceholderInputsProps {
  storyTemplate: string;
  onSubmit: (title: StoryToken[], body: StoryToken[]) => void;
}

function PlaceholderInputs({ storyTemplate, onSubmit }: PlaceholderInputsProps) {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  // Extract placeholders from the story template, preserving the unique ids
  const placeholders = Array.from(new Set(storyTemplate.match(/<[^>]+>/g) || []));

  const handleChange = (placeholder: string, value: string) => {
    setInputs((prev) => ({ ...prev, [placeholder]: value }));
  };

  // DOM-safe element id derived from the placeholder token: `<adjective-1>` -> `adjective-1`
  const blankId = (placeholder: string) => placeholder.replace(/[<>]/g, '');

  const handleSubmit = () => {
    const { title, body } = splitTitle(storyTemplate);
    onSubmit(tokenize(title, inputs), tokenize(body, inputs));
  };

  return (
    <section className="card" aria-label="Fill in the words">
      <h2 className="card-title">
        <span className="step-num" aria-hidden="true">
          2
        </span>
        Fill in the words
      </h2>
      <p className="card-lede">
        Don't overthink it — the weirder the word, the better the story. Anything you leave
        blank shows up as <em>[noun]</em>.
      </p>
      <div className="pad-grid">
        {placeholders.map((placeholder) => (
          <div key={placeholder}>
            <label className="blank-label" htmlFor={blankId(placeholder)}>
              {placeholderType(placeholder)}
            </label>
            <input
              className="blank-input"
              type="text"
              id={blankId(placeholder)}
              name={blankId(placeholder)}
              value={inputs[placeholder] || ''}
              onChange={(e) => handleChange(placeholder, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button className="btn btn-primary" type="button" onClick={handleSubmit}>
        Create my story!
      </button>
    </section>
  );
}

export default PlaceholderInputs;
