import { useState } from 'react';
import CategorySelector from './CategorySelector';
import { createActivity } from '../services/activityService';

export default function ActivityForm({ onAdded }) {
  const [category, setCategory] = useState('Transport');
  const [activityType, setActivityType] = useState('');
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
      await createActivity({ category, activityType, date, quantity, unit, description });
      setSuccess('Activity added.');
      setCategory('Transport');
      setActivityType('');
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
      <CategorySelector value={category} onChange={(e) => setCategory(e.target.value)} />

      <label>Activity type</label>
      <input
        type="text"
        value={activityType}
        onChange={(e) => setActivityType(e.target.value)}
        placeholder="e.g. Bus, Solar, Lunch"
        required
      />

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
