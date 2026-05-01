// src/types/quiz.ts
export interface QuizOption {
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty: 1 | 2 | 3;
  country_code: string;
}

export type QuizAnswerState = "unanswered" | "correct" | "incorrect";
