import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ActivityCard from '../components/ActivityCard';
import { fetchActivities } from '../services/activityService';

export default function HistoryPage() {
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

  return (
    <div className="page">
      <div className="card">
        <div className="dashboard-header">
          <div>
            <h1>Activity history</h1>
            <p>Review everything you have logged so far.</p>
          </div>
          <div>
            <Link to="/activities">Log a new activity</Link>
          </div>
        </div>

        {loading ? (
          <p>Loading activities...</p>
        ) : activities.length ? (
          <div className="activity-list">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <p>No activity history yet.</p>
        )}
      </div>
    </div>
  );
}
