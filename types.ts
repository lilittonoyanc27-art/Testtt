export type GameId = 'numbers' | 'accents' | 'months' | 'days' | 'time' | 'translations';

export interface GameMetadata {
  id: GameId;
  titleArm: string;
  titleSpan: string;
  titleRus: string;
  descriptionArm: string;
  descriptionRus: string;
  explanationArm: string;
  explanationRus: string;
  icon: string;
  difficulty: 'A1_EASY' | 'A1_MEDIUM' | 'A1_HARD';
}

export interface ScoreState {
  correct: number;
  total: number;
  streak: number;
  bestStreak: number;
}
