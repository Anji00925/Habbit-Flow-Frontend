import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';
import './Dashboard.css';

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('http://localhost:5000/api/habits', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHabits(res.data);
      } catch (err) {
        console.error('Could not fetch habits:', err.message);
      }
    };

    fetchHabits();
  }, []);

  // Add new habit to list
  const handleHabitCreated = (newHabit) => {
    setHabits((prev) => [...prev, newHabit]);
  };

  // Update existing habit in the list (e.g., after marking done)
  const handleHabitUpdated = (updatedHabit) => {
  setHabits((prev) =>
    prev.map((h) =>
      h._id === updatedHabit._id ? { ...updatedHabit } : h
    )
  );
};


  // Remove habit from the list after deletion
  const handleHabitDeleted = (deletedId) => {
    setHabits((prev) => prev.filter((h) => h._id !== deletedId));
  };

  return (
    <div className="dashboard-wrapper">
      <div className="container py-5">
        <h2 className="dashboard-title mb-4">
          👋 Welcome, <span className="text-primary">{username || 'Habit Hacker'}</span>
        </h2>

        <HabitForm onHabitCreated={handleHabitCreated} />

        <div className="row mt-4">
          {habits.length === 0 ? (
            <div className="col-12 text-center">
              <p className="no-habits-msg">
                You don't have any habits yet. Time to start building one! 🌱
              </p>
            </div>
          ) : (
            habits.map((habit) => (
              <div key={habit._id} className="col-md-6 col-lg-4">
                <HabitCard
                  habit={habit}
                  onHabitUpdated={handleHabitUpdated}
                  onDelete={handleHabitDeleted}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
