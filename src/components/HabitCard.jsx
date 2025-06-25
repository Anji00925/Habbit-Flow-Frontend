import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './HabitCard.css';
import WeeklyTracker from '../pages/WeeklyTracker';

function HabitCard({ habit, onHabitUpdated, onDelete }) {
  const handleMarkDone = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        `http://localhost:5000/api/habits/${habit._id}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Mark Done clicked for:', habit._id);
      console.log('Updated Habit:', res.data);
      onHabitUpdated(res.data); // Trigger re-render in Dashboard
    } catch (err) {
      console.error('Error marking habit as done:', err.message);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/habits/${habit._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(habit._id);
    } catch (err) {
      console.error('Error deleting habit:', err.message);
    }
  };

  const isToday = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  };

  const completedToday = habit.completedDates?.some(isToday);

  return (
    <Card className="habit-card shadow-sm">
      <Card.Body>
        <Card.Title>{habit.habit}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Frequency: {habit.frequency}
        </Card.Subtitle>
        <Card.Text>
          Status:{' '}
          <span className={completedToday ? 'text-success' : 'text-danger'}>
            {completedToday ? 'Completed Today ✅' : 'Not Done Yet ❌'}
          </span>
        </Card.Text>

        <WeeklyTracker completedDates={habit.completedDates} />

        <div className="d-flex gap-2 mt-3">
          <Button
            variant={completedToday ? 'outline-secondary' : 'success'}
            disabled={completedToday}
            onClick={handleMarkDone}
          >
            {completedToday ? 'Completed' : 'Mark as Done'}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default HabitCard;
