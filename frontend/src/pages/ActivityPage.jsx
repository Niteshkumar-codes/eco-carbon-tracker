import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ActivityCard from '../components/ActivityCard';
import ActivityForm from '../components/ActivityForm';
import { fetchActivities } from '../services/activityService';

export default function ActivityPage() {
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
            <h1>Log an activity</h1>
            <p>Record daily transport, electricity, food, and waste actions.</p>
          </div>
          <div>
            <Link to="/history">View full history</Link>
          </div>
        </div>

        <section>
          <ActivityForm onAdded={loadActivities} />
        </section>

        <section>
          <h2>Recent entries</h2>
          {loading ? (
            <p>Loading activities...</p>
          ) : activities.length ? (
            <div className="activity-list">
              {activities.slice(0, 5).map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <p>No activities yet. Add your first log.</p>
          )}
        </section>
      </div>
    </div>
  );
}
