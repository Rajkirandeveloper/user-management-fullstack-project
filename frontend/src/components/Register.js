import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from '../styles/Register.module.css';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      city: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      phone: Yup.string().required('Phone number is required'),
      city: Yup.string().required('City is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          username: values.username,
          email: values.email,
          password: values.password,
          phone: values.phone,
          city: values.city,
        });
        alert('Registration successful!');
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Register</h1>
        <p className={styles.subtitle}>Create your account</p>
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

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.error}>{formik.errors.password}</div>
        ) : null}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className={styles.error}>{formik.errors.confirmPassword}</div>
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

        <button type="submit">Register</button>
      </form>
      <div className={styles.link}>
        <a href="/login">Already have an account? Log in</a>
      </div>
    </div>
  );
};

export default Register;









