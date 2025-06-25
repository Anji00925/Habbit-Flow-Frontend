import React, { useState } from 'react';
import axios from 'axios';
import './HabitForm.css';

function HabitForm({ onHabitCreated }) {
  const [habit, setHabit] = useState('');
  const [frequency, setFrequency] = useState('daily');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('http://localhost:5000/api/habits', {
        habit,
        frequency
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setHabit('');
      setFrequency('daily');
      onHabitCreated(res.data);
    } catch (err) {
      console.error('Failed to create habit:', err.message);
    }
  };

  return (
    <form className="habit-form mb-4" onSubmit={handleSubmit}>
      <div className="row g-2 align-items-center">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter habit"
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary w-100">Add Habit</button>
        </div>
      </div>
    </form>
  );
}

export default HabitForm;
