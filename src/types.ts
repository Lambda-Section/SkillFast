// Habit Types
export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completionPercentage: number;
  streak: number;
  history: HabitEntry[];
  createdAt: Date;
}

export interface HabitEntry {
  date: Date;
  completed: boolean;
}

// Skill Types
export interface Skill {
  id: string;
  name: string;
  description?: string;
  currentLevel: number;
  maxLevel: number;
  progress: number; // 0-100
  subskills: Skill[];
  createdAt: Date;
}