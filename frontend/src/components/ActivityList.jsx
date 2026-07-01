export default function ActivityList({ activities }) {
  if (!activities.length) {
    return <p>No activities yet. Add your first entry.</p>;
  }

  return (
    <ul className="activity-list">
      {activities.map((activity) => (
        <li key={activity.id} className="activity-item">
          <div>
            <strong>{activity.category}</strong>
            <p>
              {activity.quantity} {activity.unit} on {activity.date}
            </p>
          </div>
          {activity.description ? <span>{activity.description}</span> : null}
        </li>
      ))}
    </ul>
  );
}
