import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/ProfileUpdate.module.css';
const BASEURL='http://localhost:5000/api'

const ProfileUpdate = () => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BASEURL}/users/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setAuth(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login'); // Redirect to login if not authenticated
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      username: auth?.username || '',
      email: auth?.email || '',
      phone: auth?.phone || '',
      city: auth?.city || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      city: Yup.string().required('City is required'),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await axios.put(`${BASEURL}/users/profile`, values, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Profile update error:', error);
      }
    },
  });

  const handleLogout = async () => {
    try {
      
     await  localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!auth) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Access Denied</h1>
        <p className={styles.subtitle}>You need to be logged in to access this page.</p>
        <div className={styles.link}>
          <a href="/login" className={styles.linkText}>Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Update Profile</h1>
        <p className={styles.subtitle}>Edit your profile information</p>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className={styles.error}>{formik.errors.username}</div>
        ) : null}

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.error}>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="text"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className={styles.error}>{formik.errors.phone}</div>
        ) : null}

        <label htmlFor="city">City:</label>
        <input
          id="city"
          type="text"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.city && formik.errors.city ? (
          <div className={styles.error}>{formik.errors.city}</div>
        ) : null}

        <button type="submit">Update Profile</button>
      </form>
      <div className={styles.link}>
        <a href="/" className={styles.linkText}>Back to Home</a>
      </div>
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
    </div>
  );
};

export default ProfileUpdate;

