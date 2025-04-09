import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import SkillTree from './SkillTree';
import AddSkillForm from './AddSkillForm';
import { SkillCategory } from '../types';

const SkillsPage: React.FC = () => {
  const { skills, getRootSkills } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');
  
  const categories: SkillCategory[] = [
    'Technology', 
    'Fitness', 
    'Health', 
    'Languages', 
    'Arts', 
    'Professional',
    'Personal'
  ];
  
  const filteredRootSkills = getRootSkills().filter(skill => 
    selectedCategory === 'All' || skill.category === selectedCategory
  );

  return (
    <div className="skills-page">
      <div className="skills-header">
        <h2>Skill Progression</h2>
        <div className="category-filter">
          <label>Filter by Category:</label>
          <select 
            value={selectedCategory} 
            onChange={e => setSelectedCategory(e.target.value as SkillCategory | 'All')}
          >
            <option value="All">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="skills-content">
        {filteredRootSkills.length > 0 ? (
          <div className="skills-tree-container">
            {filteredRootSkills.map(skill => (
              <SkillTree key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <p className="no-skills-message">
            No skills found in this category. Add your first skill below!
          </p>
        )}
      </div>
      
      <AddSkillForm parentId={null} category={selectedCategory !== 'All' ? selectedCategory : undefined} />
    </div>
  );
};

export default SkillsPage;
