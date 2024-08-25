import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login'); // Redirect to login if not authenticated
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!profile) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.profileInfo}>
          <div className={styles.infoItem}>
            <strong>Username:</strong> {profile.username}
          </div>
          <div className={styles.infoItem}>
            <strong>Email:</strong> {profile.email}
          </div>
          <div className={styles.infoItem}>
            <strong>Phone:</strong> {profile.phone}
          </div>
          <div className={styles.infoItem}>
            <strong>City:</strong> {profile.city}
          </div>
        </div>
        <button onClick={() => navigate('/profile-update')} className={styles.updateButton}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styles from '../styles/Profile.module.css';

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/users/profile', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setProfile(response.data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         navigate('/login'); // Redirect to login if not authenticated
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   if (!profile) {
//     return <div className={styles.container}>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Profile</h1>
//       <div className={styles.profileInfo}>
//         <p><strong>Username:</strong> {profile.username}</p>
//         <p><strong>Email:</strong> {profile.email}</p>
//         <p><strong>Phone:</strong> {profile.phone}</p>
//         <p><strong>City:</strong> {profile.city}</p>
//       </div>
//       <button onClick={() => navigate('/profile-update')} className={styles.updateButton}>
//         Edit Profile
//       </button>
//     </div>
//   );
// };

// export default Profile;
