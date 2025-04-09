import { createContext, useContext, useState, ReactNode } from 'react';
import { Habit, Skill } from '../models';

interface HabitSkillState {
  habits: Habit[];
  skills: Skill[];
  addHabit: (habit: Habit) => void;
  addSkill: (skill: Skill) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
}

const HabitSkillContext = createContext<HabitSkillState | undefined>(undefined);

export const HabitSkillProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const addHabit = (habit: Habit) => setHabits([...habits, habit]);
  const addSkill = (skill: Skill) => setSkills([...skills, skill]);

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(habits.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setSkills(skills.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  return (
    <HabitSkillContext.Provider value={{ habits, skills, addHabit, addSkill, updateHabit, updateSkill }}>
      {children}
    </HabitSkillContext.Provider>
  );
};

export const useHabitSkill = () => {
  const context = useContext(HabitSkillContext);
  if (!context) throw new Error('useHabitSkill must be used within HabitSkillProvider');
  return context;
};