import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Safely access process.env to prevent crashes if process is undefined in the browser
const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY_TO_PREVENT_INIT_CRASH' });

export const askFinancialTutor = async (question: string, ageGroup: string = 'נוער'): Promise<string> => {
  if (!apiKey) {
    return "נראה שאין מפתח API מוגדר. לא ניתן להתחבר למורה החכם כרגע.";
  }

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
  if (!apiKey) return null;

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