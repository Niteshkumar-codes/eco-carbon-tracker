import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ActivityForm from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';
import { fetchActivities } from '../services/activityService';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadActivities() {
    try {
      setLoading(true);
      const data = await fetchActivities();
      setActivities(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadActivities();
  }, []);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="page dashboard-page">
      <div className="card dashboard-card">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.name || 'eco user'}.</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <section>
          <h2>Add activity</h2>
          <ActivityForm onAdded={loadActivities} />
        </section>

        <section>
          <h2>Your activities</h2>
          {loading ? <p>Loading activities...</p> : <ActivityList activities={activities} />}
        </section>
      </div>
    </div>
  );
}
