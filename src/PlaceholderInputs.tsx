import { useState } from 'react';

function PlaceholderInputs({ storyTemplate, onSubmit }: { storyTemplate: string; onSubmit: (filledStory: string) => void }) {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  // Extract placeholders from the story template, preserving the unique ids
  const placeholders = Array.from(new Set(storyTemplate.match(/<[^>]+>/g) || []));

  // Helper to obtain a clean placeholder type (removes angle brackets and incremental IDs)
  const getPlaceholderType = (placeholder: string) => {
    return placeholder.replace(/[<>]/g, '').replace(/-\d+$/, '');
  };

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
          <label htmlFor={placeholder}>{`Enter ${getPlaceholderType(placeholder)}:`}</label>
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