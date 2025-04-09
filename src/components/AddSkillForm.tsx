import React, { useState } from 'react';
import { Skill, SkillCategory } from '../types';
import { useAppContext } from '../context/AppContext';

const AddSkillForm: React.FC = () => {
  const { skills, addSkill } = useAppContext();
  const [formOpen, setFormOpen] = useState(false);
  const [newSkill, setNewSkill] = useState<Partial<Omit<Skill, 'id' | 'createdAt' | 'children'>>>({
    name: '',
    description: '',
    category: 'Technology',
    currentLevel: 1,
    maxLevel: 10,
    progress: 0,
    parentId: undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.name) {
      addSkill(newSkill as Omit<Skill, 'id' | 'createdAt' | 'children'>);
      setNewSkill({
        name: '',
        description: '',
        category: 'Technology',
        currentLevel: 1,
        maxLevel: 10,
        progress: 0,
        parentId: undefined
      });
      setFormOpen(false);
    }
  };

  const categories: SkillCategory[] = [
    'Technology', 
    'Fitness', 
    'Health', 
    'Languages', 
    'Arts', 
    'Professional',
    'Personal'
  ];

  return (
    <div className="add-skill-container">
      {!formOpen ? (
        <button 
          className="add-skill-button"
          onClick={() => setFormOpen(true)}
        >
          + Add New Skill
        </button>
      ) : (
        <form className="add-skill-form" onSubmit={handleSubmit}>
          <h3>Add New Skill</h3>
          
          <div className="form-group">
            <label>Skill Name</label>
            <input 
              type="text" 
              value={newSkill.name || ''} 
              onChange={e => setNewSkill({...newSkill, name: e.target.value})}
              placeholder="e.g., TypeScript"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description (optional)</label>
            <textarea 
              value={newSkill.description || ''} 
              onChange={e => setNewSkill({...newSkill, description: e.target.value})}
              placeholder="Brief description of this skill"
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select 
              value={newSkill.category} 
              onChange={e => setNewSkill({
                ...newSkill, 
                category: e.target.value as SkillCategory
              })}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Parent Skill (optional)</label>
            <select 
              value={newSkill.parentId || ''} 
              onChange={e => setNewSkill({...newSkill, parentId: e.target.value || undefined})}
            >
              <option value="">None (Root Skill)</option>
              {skills.map(skill => (
                <option key={skill.id} value={skill.id}>{skill.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Starting Level</label>
              <input 
                type="number" 
                min="1"
                value={newSkill.currentLevel || 1} 
                onChange={e => setNewSkill({...newSkill, currentLevel: parseInt(e.target.value)})}
              />
            </div>
            
            <div className="form-group">
              <label>Max Level</label>
              <input 
                type="number" 
                min="1"
                value={newSkill.maxLevel || 10} 
                onChange={e => setNewSkill({...newSkill, maxLevel: parseInt(e.target.value)})}
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => setFormOpen(false)}>Cancel</button>
            <button type="submit" className="primary">Add Skill</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddSkillForm;