import { useState } from 'react';

function PlaceholderInputs({ storyTemplate, onSubmit }: { storyTemplate: string; onSubmit: (filledStory: string) => void }) {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  // Extract placeholders from the story template
  const placeholders = Array.from(new Set(storyTemplate.match(/<[^>]+>/g) || []));

  const handleChange = (placeholder: string, value: string) => {
    setInputs((prev) => ({ ...prev, [placeholder]: value }));
  };

  const handleSubmit = () => {
    let filledStory = storyTemplate;
    placeholders.forEach((placeholder) => {
      const value = inputs[placeholder] || `[${placeholder}]`;
      filledStory = filledStory.split(placeholder).join(value);
    });
    onSubmit(filledStory);
  };

  return (
    <div>
      <h2>Fill in the Placeholders</h2>
      {placeholders.map((placeholder) => (
        <div key={placeholder}>
          <label htmlFor={placeholder}>{`Enter ${placeholder.replace(/[<>]/g, '')}:`}</label>
          <input
            type="text"
            id={placeholder}
            value={inputs[placeholder] || ''}
            onChange={(e) => handleChange(placeholder, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Create My Story!</button>
    </div>
  );
}

export default PlaceholderInputs;