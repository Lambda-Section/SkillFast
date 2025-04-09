import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'habits' | 'skills'>('habits');

  return (
    <div className="app-container">
      <header>
        <h1>SkillFast</h1>
        <div className="tab-navigation">
          <button 
            className={activeTab === 'habits' ? 'active' : ''} 
            onClick={() => setActiveTab('habits')}
          >
            Habits
          </button>
          <button 
            className={activeTab === 'skills' ? 'active' : ''} 
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
        </div>
      </header>
      
      <main>
        {activeTab === 'habits' ? (
          <div className="habits-container">
            <h2>Habit Tracker</h2>
            {/* Habit tracking components will go here */}
          </div>
        ) : (
          <div className="skills-container">
            <h2>Skill Progression</h2>
            {/* Skill tracking components will go here */}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
