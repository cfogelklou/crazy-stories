# Crazy-Stories (Enhanced for GitHub Copilot Agent)

## 1. Project Goal & Introduction

This app is a **client-side web application** implementing an infinite Mad Libs-style game. It leverages a Large Language Model (LLM) via an API on the backend (called directly from the browser) to generate stories with placeholders that the user fills in to create a humorous result. The primary goal is to deliver a fun, single-user experience running entirely in the browser.

## 2. Technology Stack

- **Frontend:**  
  - React Typescript, Vite
  - Standard browser APIs

- **AI Backend:**  
  - User-provided API key for Google Gemini
  - Direct API calls from client-side JavaScript

- **Styling:**  
  - Basic CSS for layout and readability  
  - *(Optional: CSS frameworks like Bootstrap or Tailwind CSS can be specified)*

## 3. Core Functionality & User Flow

### Initial State

- The app loads with a simple interface:
  - **API Key Input:** An input field or settings area to enter and save the LLM API key.
  - **Theme Input:** An optional input field for a story theme/topic.
  - **Generate Button:** A "Generate Story Prompt" button.
  - **Placeholder Area:** An area where prompts for words will appear.
  - **Final Story Area:** An initially hidden or empty area where the final story will be displayed.

### API Key Handling

- **User entry:** The user must enter their LLM API key.
- **Persistence:** The key is stored locally in the browser using localStorage.
- **Updates:** Provide a button or mechanism to clear/update the stored API key.
- **Security Note:** Include a note warning about the security implications of storing API keys client-side (suitable for personal tools, but generally insecure for production apps).

### Story Generation

- **Theme Choice:**  
  - The user can optionally enter a story theme (e.g., "space adventure", "pirate treasure hunt", "talking animals"). If left blank, use a generic or random theme.
- **API Call:**  
  - Clicking "Generate Story Prompt" triggers an API call to the chosen LLM service.
- **AI Prompt Engineering:**  
  - Request the LLM to generate a short story (100-200 words) based on the provided or random theme.
  - **Placeholder Inclusion:** The story must include a variety of placeholders, embedded directly in the text using a consistent format, such as:
    - `<noun>`
    - `<verb-past-tense>`
    - `<adjective>`
    - `<place>`
    - `<celebrity-name>`
    - `<body-part>`
    - `<plural-noun>`
    - `<funny-sound>`
    - *(etc. – aim for 10-15 placeholders per story)*
  - **Output:** The LLM should return only the story text with these placeholders.

### Placeholder Extraction & Prompting

- **Parsing:**  
  - Once the story text is received, parse it to identify all unique placeholder types.
- **Dynamic Input Creation:**  
  - Dynamically generate input fields on the page, one for each placeholder instance. For example:
    - "Enter a Noun:"
    - "Enter a Past Tense Verb:"
- **Interface Adjustment:**  
  - At this stage, hide the original story text.

### User Input

- **Word Entry:**  
  - The user fills in each input field with their chosen words.
- **Action Button:**  
  - Include a "Create My Story!" button.
  - **Validation:** (Simple validation) Handle empty inputs by replacing them with " [blank] " or a default value.

### Display Final Story

- **Story Assembly:**  
  - When "Create My Story!" is clicked, take the original story template.
  - Replace each placeholder sequentially with the corresponding user inputs.
- **Display:**  
  - Show the completed, funny story in the designated output area.
- **Restart Option:**  
  - Include a "Play Again" button that clears the inputs and generated story, allowing the user to generate a new story prompt.

## 4. Error Handling

- **API Errors:**  
  - Provide basic handling for API errors (e.g., invalid key, network issues, rate limits) with user-friendly messages.
- **Format Verification:**  
  - Handle cases where the LLM response might not follow the expected format (e.g., no placeholders found).

## 5. Example Placeholder Types to Request

- `<noun>`
- `<plural-noun>`
- `<verb>`
- `<verb-ending-in-ing>`
- `<verb-past-tense>`
- `<adjective>`
- `<adverb>`
- `<place>`
- `<person-name>`
- `<celebrity-name>`
- `<body-part>`
- `<type-of-liquid>`
- `<number>`
- `<animal>`
- `<funny-sound>`
- `<exclamation>`
- `<piece-of-clothing>`