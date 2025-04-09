import { useHabitSkill } from '../store/HabitSkillContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const HabitTracker = () => {
  const { habits, updateHabit } = useHabitSkill();

  const markComplete = (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      const newLog = { date: new Date(), completed: true };
      updateHabit(id, {
        completion: Math.min(100, habit.completion + 10), // Increment by 10% for simplicity
        streak: habit.streak + 1,
        logs: [...habit.logs, newLog]
      });
    }
  };

  const chartData = (habit: Habit) => ({
    labels: habit.logs.map(log => log.date.toLocaleDateString()),
    datasets: [{
      label: habit.name,
      data: habit.logs.map((_, i) => (i + 1) * 10), // Simulated progress
      borderColor: 'blue',
      fill: false,
    }],
  });

  return (
    <div>
      <h2>Habits</h2>
      {habits.map(habit => (
        <div key={habit.id}>
          <p>{habit.name}: {habit.completion}% (Streak: {habit.streak})</p>
          <button onClick={() => markComplete(habit.id)}>Mark Complete</button>
          <Line data={chartData(habit)} />
        </div>
      ))}
    </div>
  );
};

export default HabitTracker;