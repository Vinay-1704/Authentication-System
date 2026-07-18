import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import {
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineStatusOnline,
} from 'react-icons/hi';

export default function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    API.get('/profile')
      .then((res) => setProfileData(res.data))
      .catch(() => {});
  }, []);

  const getInitial = () => {
    if (!profileData?.email) return '?';
    return profileData.email.charAt(0).toUpperCase();
  };

  return (
    <div className="profile-section">
      <div className="dashboard-welcome">
        <h1>Your <span>Profile</span></h1>
        <p>Manage your account information</p>
      </div>

      <div className="profile-card">
        {/* Avatar */}
        <div className="profile-avatar">{getInitial()}</div>

        {/* Profile Info */}
        <div className="profile-info">
          <div className="profile-info-item">
            <div className="icon">
              <HiOutlineMail />
            </div>
            <div>
              <div className="profile-info-label">Email Address</div>
              <div className="profile-info-value">
                {profileData?.email || 'Loading...'}
              </div>
            </div>
          </div>

          <div className="profile-info-item">
            <div className="icon">
              <HiOutlineShieldCheck />
            </div>
            <div>
              <div className="profile-info-label">Authentication Status</div>
              <div className="profile-info-value" style={{ color: 'var(--success-400)' }}>
                ● Authenticated
              </div>
            </div>
          </div>

          <div className="profile-info-item">
            <div className="icon">
              <HiOutlineClock />
            </div>
            <div>
              <div className="profile-info-label">Session Expiry</div>
              <div className="profile-info-value">30 minutes from login</div>
            </div>
          </div>

          <div className="profile-info-item">
            <div className="icon">
              <HiOutlineStatusOnline />
            </div>
            <div>
              <div className="profile-info-label">Account Type</div>
              <div className="profile-info-value">Standard User</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
