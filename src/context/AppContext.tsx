import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Habit, Skill } from '../types';

interface AppContextType {
  habits: Habit[];
  skills: Skill[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id' | 'createdAt'>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setHabits([...habits, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(
      habits.map((habit) => (habit.id === id ? { ...habit, ...updates } : habit))
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const addSkill = (skill: Omit<Skill, 'id' | 'createdAt'>) => {
    const newSkill: Skill = {
      ...skill,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setSkills(
      skills.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill))
    );
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        habits,
        skills,
        addHabit,
        updateHabit,
        deleteHabit,
        addSkill,
        updateSkill,
        deleteSkill,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}