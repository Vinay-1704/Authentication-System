import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import {
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineLightningBolt,
} from 'react-icons/hi';

export default function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    API.get('/dashboard')
      .then((res) => setDashboardData(res.data))
      .catch(() => {});
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getDisplayName = () => {
    if (!user?.email) return '';
    return user.email.split('@')[0];
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <h1>
          {getGreeting()}, <span>{getDisplayName()}</span> 👋
        </h1>
        <p>Here&apos;s an overview of your account activity</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-label">Security Status</div>
              <div className="stat-card-value">Active</div>
              <div className="stat-card-change">✓ All systems nominal</div>
            </div>
            <div className="stat-card-icon">
              <HiOutlineShieldCheck />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-label">Session Duration</div>
              <div className="stat-card-value">30 min</div>
              <div className="stat-card-change">Token auto-refresh</div>
            </div>
            <div className="stat-card-icon">
              <HiOutlineClock />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-label">API Status</div>
              <div className="stat-card-value">{dashboardData ? 'Online' : '...'}</div>
              <div className="stat-card-change">
                {dashboardData ? '✓ Connected to backend' : 'Checking...'}
              </div>
            </div>
            <div className="stat-card-icon">
              <HiOutlineLightningBolt />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="stats-grid">
        <div className="stat-card" style={{ gridColumn: 'span 2' }}>
          <div className="stat-card-header">
            <div>
              <div className="stat-card-label">Quick Info</div>
            </div>
            <div className="stat-card-icon">
              <HiOutlineChartBar />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                background: 'rgba(99, 102, 241, 0.06)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(99, 102, 241, 0.1)',
              }}>
                <span style={{ color: 'var(--surface-200)', fontSize: '0.875rem' }}>Authentication Method</span>
                <span style={{ color: 'var(--primary-400)', fontWeight: 600, fontSize: '0.875rem' }}>JWT Bearer Token</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                background: 'rgba(236, 72, 153, 0.06)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(236, 72, 153, 0.1)',
              }}>
                <span style={{ color: 'var(--surface-200)', fontSize: '0.875rem' }}>Encryption</span>
                <span style={{ color: 'var(--accent-400)', fontWeight: 600, fontSize: '0.875rem' }}>HS256 + Bcrypt</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                background: 'rgba(6, 182, 212, 0.06)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(6, 182, 212, 0.1)',
              }}>
                <span style={{ color: 'var(--surface-200)', fontSize: '0.875rem' }}>Account Email</span>
                <span style={{ color: '#22d3ee', fontWeight: 600, fontSize: '0.875rem' }}>{user?.email || '...'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-label">Server Message</div>
            </div>
          </div>
          <div style={{
            marginTop: '0.5rem',
            padding: '1.25rem',
            background: 'rgba(99, 102, 241, 0.06)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem',
            }}>🎉</div>
            <div style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--surface-50)',
              marginBottom: '0.25rem',
            }}>
              {dashboardData?.message || 'Loading...'}
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--surface-200)',
              opacity: 0.6,
            }}>
              Authenticated as {dashboardData?.user || '...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
