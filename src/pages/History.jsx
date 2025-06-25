import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/habits/history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="container py-5">
      <h3 className="text-primary mb-4">📊 Habit Progress History</h3>
      <ul className="list-group">
        {history.map((record, i) => (
          <li key={i} className="list-group-item">
            {record.habit} - Completed on: {record.completedDates.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
