import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Habit, Skill, SkillActivity } from '../types';

interface AppContextType {
  habits: Habit[];
  skills: Skill[];
  skillActivities: SkillActivity[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id' | 'createdAt' | 'children'>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  addSkillActivity: (activity: SkillActivity) => void;
  getRootSkills: () => Skill[];
  getSkillById: (id: string) => Skill | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillActivities, setSkillActivities] = useState<SkillActivity[]>([]);

  // Habit functions
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

  // Skill functions
  const addSkill = (skill: Omit<Skill, 'id' | 'createdAt' | 'children'>) => {
    const newSkill: Skill = {
      ...skill,
      id: Date.now().toString(),
      createdAt: new Date(),
      children: []
    };
    
    setSkills(prevSkills => {
      const updatedSkills = [...prevSkills, newSkill];
      
      // If this skill has a parent, update the parent's children array
      if (skill.parentId) {
        return updatedSkills.map(s => 
          s.id === skill.parentId 
            ? { ...s, children: [...s.children, newSkill.id] } 
            : s
        );
      }
      
      return updatedSkills;
    });
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setSkills(
      skills.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill))
    );
  };

  const deleteSkill = (id: string) => {
    // Get the skill to be deleted
    const skillToDelete = skills.find(s => s.id === id);
    if (!skillToDelete) return;
    
    // Get all descendant skill IDs (recursive)
    const getAllDescendantIds = (skillId: string): string[] => {
      const skill = skills.find(s => s.id === skillId);
      if (!skill || !skill.children.length) return [];
      
      const childIds = [...skill.children];
      skill.children.forEach(childId => {
        childIds.push(...getAllDescendantIds(childId));
      });
      
      return childIds;
    };
    
    const descendantIds = getAllDescendantIds(id);
    const idsToRemove = new Set([id, ...descendantIds]);
    
    // Remove the skill and all its descendants
    setSkills(skills.filter(skill => !idsToRemove.has(skill.id)));
    
    // If the skill has a parent, update the parent's children array
    if (skillToDelete.parentId) {
      setSkills(prevSkills => 
        prevSkills.map(s => 
          s.id === skillToDelete.parentId 
            ? { ...s, children: s.children.filter(childId => childId !== id) } 
            : s
        )
      );
    }
  };

  // Skill activity functions
  const addSkillActivity = (activity: SkillActivity) => {
    setSkillActivities([...skillActivities, activity]);
  };

  // Helper functions
  const getRootSkills = (): Skill[] => {
    return skills.filter(skill => !skill.parentId);
  };

  const getSkillById = (id: string): Skill | undefined => {
    return skills.find(skill => skill.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        habits,
        skills,
        skillActivities,
        addHabit,
        updateHabit,
        deleteHabit,
        addSkill,
        updateSkill,
        deleteSkill,
        addSkillActivity,
        getRootSkills,
        getSkillById
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
