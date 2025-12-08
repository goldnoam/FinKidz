// AI features have been disabled. 
// This service is now a stub to prevent import errors.

export const askFinancialTutor = async (question: string, ageGroup: string = 'נוער'): Promise<string> => {
  return "שירות המורה החכם אינו זמין כרגע.";
};

export const generateQuizQuestion = async (topic: string): Promise<{question: string, options: string[], answer: number, explanation: string} | null> => {
  return null;
};