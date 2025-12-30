// config/AiModal.jsx
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

export const generateCourseTitles = async (topic) => {
  try {
    if (!API_KEY) {
      throw new Error("API Key is not configured. Please add EXPO_PUBLIC_GEMINI_API_KEY to your .env file");
    }

    const prompt = `Learn ${topic} :: As you are coaching Teacher
* User want to learn about the topic
* Generate 5-7 course title for study (short)
* Make sure it is related to the description
* Output only array of string JSON format only
* Do not add any plain text to the output`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if response has the expected structure
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Unexpected API response structure");
    }
    
    // Extract text from response
    const text = data.candidates[0].content.parts[0].text;
    
    // Clean and parse JSON
    const cleanedText = text.trim().replace(/```json\n?/g, '').replace(/```\n?/g, '');
    const courseTitles = JSON.parse(cleanedText);
    
    return courseTitles;
  } catch (error) {
    console.error("Error generating course titles:", error);
    throw error;
  }
};

export const generateCourseContent = async (prompt) => {
  try {
    if (!API_KEY) {
      throw new Error("API Key is not configured");
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};