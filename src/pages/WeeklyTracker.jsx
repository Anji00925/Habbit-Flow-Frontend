import React from 'react';
import './WeeklyTracker.css';

function WeeklyTracker({ completedDates = [] }) {
  // Helper to get the start of the current week (Monday)
  const getStartOfWeek = (date) => {
    const day = date.getDay(); // Sun=0 ... Sat=6
    const diff = day === 0 ? -6 : 1 - day; // If Sunday, go back 6 days else Monday offset
    const monday = new Date(date);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(date.getDate() + diff);
    return monday;
  };

  const startOfWeek = getStartOfWeek(new Date());

  // Array for weekdays short names
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Create array of 7 dates starting from Monday
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  // Convert completedDates strings to simplified ISO dates for easy comparison (yyyy-mm-dd)
  const completedDaysSet = new Set(
    completedDates.map((dateStr) => new Date(dateStr).toISOString().slice(0, 10))
  );

  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <div className="weekly-tracker">
      {weekDates.map((date, idx) => {
        const dateStr = date.toISOString().slice(0, 10);
        const isCompleted = completedDaysSet.has(dateStr);
        const isToday = dateStr === todayStr;

        return (
          <div
            key={idx}
            className={`day-circle ${isCompleted ? 'completed' : 'not-completed'} ${
              isToday ? 'today' : ''
            }`}
            title={`${weekdays[idx]} ${date.getDate()}`}
          >
            {isCompleted ? '✔' : weekdays[idx]}
          </div>
        );
      })}
    </div>
  );
}

export default WeeklyTracker;
