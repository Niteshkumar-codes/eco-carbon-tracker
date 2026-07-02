export default function ActivityCard({ activity }) {
  return (
    <article className="activity-card">
      <div className="activity-card__header">
        <strong>{activity.category}</strong>
        <span>{activity.activityType}</span>
      </div>
      <p>
        {activity.quantity} {activity.unit} on {activity.date}
      </p>
      {activity.description ? <p>{activity.description}</p> : null}
    </article>
  );
}
