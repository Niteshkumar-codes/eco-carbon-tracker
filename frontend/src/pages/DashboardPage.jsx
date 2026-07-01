import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="page">
      <div className="card dashboard-card">
        <h1>Dashboard</h1>
        <p>Welcome, {user?.name || 'eco user'}.</p>
        <p>This is the protected area for EcoTrack v1.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
