import React, { useState } from 'react';
import { Skill, SkillActivity } from '../types';
import { useAppContext } from '../context/AppContext';

interface SkillTreeProps {
  rootSkills: Skill[];
}

const SkillTree: React.FC<SkillTreeProps> = ({ rootSkills }) => {
  const { skills, updateSkill, addSkillActivity } = useAppContext();
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());

  const toggleExpand = (skillId: string) => {
    const newExpanded = new Set(expandedSkills);
    if (newExpanded.has(skillId)) {
      newExpanded.delete(skillId);
    } else {
      newExpanded.add(skillId);
    }
    setExpandedSkills(newExpanded);
  };

  const getChildSkills = (parentId: string): Skill[] => {
    return skills.filter(skill => skill.parentId === parentId);
  };

  const renderSkillNode = (skill: Skill, depth = 0) => {
    const childSkills = getChildSkills(skill.id);
    const isExpanded = expandedSkills.has(skill.id);
    
    return (
      <div key={skill.id} className="skill-node" style={{ marginLeft: `${depth * 20}px` }}>
        <div className="skill-header">
          <div 
            className={`expand-icon ${childSkills.length > 0 ? 'has-children' : ''}`}
            onClick={() => childSkills.length > 0 && toggleExpand(skill.id)}
          >
            {childSkills.length > 0 && (isExpanded ? '▼' : '►')}
          </div>
          
          <div className="skill-info">
            <h3>{skill.name}</h3>
            <div className="skill-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${skill.progress}%` }}
                ></div>
              </div>
              <span>Level {skill.currentLevel} ({skill.progress}%)</span>
            </div>
          </div>
          
          <button 
            className="add-progress-btn"
            onClick={() => showAddProgressModal(skill.id)}
          >
            Log Activity
          </button>
        </div>
        
        {isExpanded && childSkills.length > 0 && (
          <div className="child-skills">
            {childSkills.map(childSkill => renderSkillNode(childSkill, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [activityModal, setActivityModal] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<SkillActivity>>({
    name: '',
    description: '',
    progressValue: 1
  });

  const showAddProgressModal = (skillId: string) => {
    setSelectedSkillId(skillId);
    setActivityModal(true);
  };

  const handleAddActivity = () => {
    if (selectedSkillId && newActivity.name && newActivity.progressValue) {
      const skill = skills.find(s => s.id === selectedSkillId);
      if (skill) {
        // Add the activity
        addSkillActivity({
          id: Date.now().toString(),
          skillId: selectedSkillId,
          name: newActivity.name,
          description: newActivity.description,
          progressValue: newActivity.progressValue,
          date: new Date()
        });
        
        // Update skill progress
        let newProgress = skill.progress + newActivity.progressValue;
        let newLevel = skill.currentLevel;
        
        // Level up if progress reaches 100%
        if (newProgress >= 100) {
          newLevel = Math.min(skill.maxLevel, skill.currentLevel + 1);
          newProgress = newProgress - 100;
        }
        
        updateSkill(selectedSkillId, {
          progress: newProgress,
          currentLevel: newLevel
        });
        
        // Reset form
        setNewActivity({
          name: '',
          description: '',
          progressValue: 1
        });
        setActivityModal(false);
      }
    }
  };

  return (
    <div className="skill-tree">
      {rootSkills.map(skill => renderSkillNode(skill))}
      
      {activityModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Log Activity</h3>
            <div className="form-group">
              <label>Activity Name</label>
              <input 
                type="text" 
                value={newActivity.name || ''} 
                onChange={e => setNewActivity({...newActivity, name: e.target.value})}
                placeholder="e.g., Read TypeScript book chapter"
              />
            </div>
            
            <div className="form-group">
              <label>Description (optional)</label>
              <textarea 
                value={newActivity.description || ''} 
                onChange={e => setNewActivity({...newActivity, description: e.target.value})}
                placeholder="Details about what you learned or accomplished"
              />
            </div>
            
            <div className="form-group">
              <label>Progress Value (%)</label>
              <input 
                type="number" 
                min="0.1" 
                max="100" 
                step="0.1"
                value={newActivity.progressValue || 1} 
                onChange={e => setNewActivity({...newActivity, progressValue: parseFloat(e.target.value)})}
              />
            </div>
            
            <div className="modal-actions">
              <button onClick={() => setActivityModal(false)}>Cancel</button>
              <button onClick={handleAddActivity} className="primary">Add Activity</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTree;