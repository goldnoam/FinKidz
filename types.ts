export type Category = 'basics' | 'banking' | 'investing' | 'advanced';

export type Language = 'he' | 'en' | 'zh' | 'hi' | 'de' | 'es' | 'fr';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  iconName: string;
  category: Category;
  difficulty: 'מתחיל' | 'מתקדם' | 'מומחה';
  translations?: Record<string, { title: string; description: string; content: string }>;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  condition: (stats: UserStats) => boolean;
}

export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  iconName: string;
  category: 'tools' | 'news';
  color: string;
}

export interface UserStats {
  points: number;
  completedLessons: string[];
  favorites: string[];
  currentStreak: number;
  lastLoginDate: string; // ISO date string
  badges: string[]; // Array of badge IDs
}