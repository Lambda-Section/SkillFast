// Habit
interface Habit {
    id: string;
    name: string;
    completion: number; // 0-100 percentage
    streak: number;    // Days in a row
    logs: HabitLog[];
  }
  
  // Habit Log Entry
  interface HabitLog {
    date: Date;
    completed: boolean;
  }
  
  // Skill
  interface Skill {
    id: string;
    name: string;
    level: number;
    progress: number;  // 0-100 percentage to next level
    tree: SkillTree;
    logs: SkillLog[];
  }
  
  // Skill Tree Node
  interface SkillTree {
    id: string;
    name: string;
    levelRequired: number;
    unlocked: boolean;
    branches: SkillTree[];
  }
  
  // Skill Log Entry
  interface SkillLog {
    date: Date;
    progressAdded: number;
  }
  
  export type { Habit, HabitLog, Skill, SkillTree, SkillLog };