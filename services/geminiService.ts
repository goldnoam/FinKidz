import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Safely access process.env to prevent crashes if process is undefined in the browser
const getApiKey = () => (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';

export const askFinancialTutor = async (question: string, ageGroup: string = 'נוער'): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "נראה שאין מפתח API מוגדר. לא ניתן להתחבר למורה החכם כרגע.";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const prompt = `
      אתה מורה מומחה לחינוך פיננסי לילדים ונוער בישראל.
      המשתמש שואל שאלה בנושא פיננסי.
      קהל היעד הוא: ${ageGroup}.
      
      הנחיות:
      1. ענה בעברית פשוטה, ברורה ומעניינת.
      2. השתמש בדוגמאות מעולם הילדים (דמי כיס, משחקי מחשב, לקנות פיצה).
      3. אם השאלה נוגעת למונחים מורכבים (כמו ריבית דריבית, מדדים, אינפלציה), פשט אותם באמצעות אנלוגיות.
      4. היה מעודד וחיובי.
      5. אל תיתן ייעוץ השקעות ספציפי (כמו "תקנה מניית טסלה"), אלא הסבר עקרונות.
      6. שמור על תשובה קצרה יחסית (עד 150 מילים) אלא אם כן התבקש פירוט.

      השאלה: "${question}"
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a friendly, educational financial tutor for kids in Israel. Speak Hebrew.",
        temperature: 0.7,
      }
    });

    return response.text || "מצטער, לא הצלחתי לייצר תשובה כרגע. נסה שוב מאוחר יותר.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "אופס! הייתה בעיה בתקשורת עם המורה החכם. אנא נסו שוב.";
  }
};

export const generateQuizQuestion = async (topic: string): Promise<{question: string, options: string[], answer: number, explanation: string} | null> => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const ai = new GoogleGenAI({ apiKey });

  try {
    const prompt = `
      צור שאלת טריוויה אמריקאית (רב-ברירה) בנושא: ${topic}.
      השאלה מיועדת לילדים/נוער.
      
      החזר את התשובה בפורמט JSON בלבד, ללא טקסט נוסף, במבנה הבא:
      {
        "question": "השאלה עצמה",
        "options": ["תשובה 1", "תשובה 2", "תשובה 3", "תשובה 4"],
        "answer": 0, (האינדקס של התשובה הנכונה, 0-3)
        "explanation": "הסבר קצר מדוע זו התשובה הנכונה"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);

  } catch (error) {
    console.error("Error generating quiz:", error);
    return null;
  }
}

export const generateLessonVideo = async (title: string, description: string): Promise<string | null> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("No API key available");
  }

  // Always create a new instance to ensure we use the fresh key
  const ai = new GoogleGenAI({ apiKey });

  try {
    const prompt = `A short educational 3D animation clip suitable for children explaining the financial concept of: ${title}. Context: ${description}. Bright colors, friendly style, abstract minimalist representation of money and growth.`;

    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p', 
        aspectRatio: '16:9'
      }
    });

    // Poll until complete
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) return null;

    // Fetch the video bytes using the key
    const response = await fetch(`${downloadLink}&key=${apiKey}`);
    if (!response.ok) {
      throw new Error("Failed to download video");
    }
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);

  } catch (error) {
    console.error("Error generating video:", error);
    throw error;
  }
};