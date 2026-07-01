import { useState } from 'react';
import { createActivity } from '../services/activityService';

const categories = ['Transport', 'Electricity', 'Food', 'Waste'];

export default function ActivityForm({ onAdded }) {
  const [category, setCategory] = useState('Transport');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      await createActivity({ category, date, quantity, unit, description });
      setSuccess('Activity added.');
      setCategory('Transport');
      setDate('');
      setQuantity('');
      setUnit('');
      setDescription('');
      if (onAdded) {
        onAdded();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label>Date</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

      <label>Quantity</label>
      <input type="number" min="0" step="0.1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

      <label>Unit</label>
      <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="km, kWh, kg, meals" required />

      <label>Description</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional note" />

      {error ? <p className="error">{error}</p> : null}
      {success ? <p className="success">{success}</p> : null}

      <button type="submit">Save activity</button>
    </form>
  );
}
