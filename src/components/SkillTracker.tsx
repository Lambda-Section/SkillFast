import { useHabitSkill } from '../store/HabitSkillContext';

const SkillTracker = () => {
  const { skills, updateSkill } = useHabitSkill();

  const addProgress = (id: string, amount: number) => {
    const skill = skills.find(s => s.id === id);
    if (skill) {
      const newProgress = Math.min(100, skill.progress + amount);
      const newLevel = newProgress === 100 ? skill.level + 1 : skill.level;
      const newLog = { date: new Date(), progressAdded: amount };
      updateSkill(id, {
        progress: newProgress === 100 ? 0 : newProgress,
        level: newLevel,
        logs: [...skill.logs, newLog],
        tree: unlockTree(skill.tree, newLevel),
      });
    }
  };

  const unlockTree = (tree: SkillTree, level: number): SkillTree => ({
    ...tree,
    unlocked: tree.levelRequired <= level,
    branches: tree.branches.map(b => unlockTree(b, level)),
  });

  const renderTree = (tree: SkillTree, depth = 0) => (
    <div style={{ marginLeft: `${depth * 20}px` }}>
      <p>{tree.name} (Level {tree.levelRequired}) - {tree.unlocked ? 'Unlocked' : 'Locked'}</p>
      {tree.branches.map(b => renderTree(b, depth + 1))}
    </div>
  );

  return (
    <div>
      <h2>Skills</h2>
      {skills.map(skill => (
        <div key={skill.id}>
          <p>{skill.name}: Level {skill.level}, Progress: {skill.progress}%</p>
          <button onClick={() => addProgress(skill.id, 20)}>Add 20%</button>
          {renderTree(skill.tree)}
        </div>
      ))}
    </div>
  );
};

export default SkillTracker;