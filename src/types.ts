// Skill Types
export interface Skill {
  id: string;
  name: string;
  description?: string;
  category: SkillCategory;
  currentLevel: number;
  maxLevel: number;
  progress: number; // 0-100
  parentId?: string; // For hierarchical structure
  children: string[]; // IDs of child skills
  createdAt: Date;
}

export type SkillCategory = 
  | 'Technology' 
  | 'Fitness' 
  | 'Health' 
  | 'Languages' 
  | 'Arts' 
  | 'Professional'
  | 'Personal';

export interface SkillActivity {
  id: string;
  skillId: string;
  name: string;
  description?: string;
  progressValue: number; // How much % this activity adds
  date: Date;
}

// Habit Types
export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completionPercentage: number;
  streak: number;
  history: HabitEntry[];
  relatedSkills?: string[]; // IDs of related skills
  createdAt: Date;
}

export interface HabitEntry {
  date: Date;
  completed: boolean;
}
