
import React from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Our Project</h1>
        <p className={styles.description}>
          Our project aims to provide a comprehensive solution for user authentication and profile management. Built with a modern tech stack, it offers secure and user-friendly features to manage your account and profile settings.
        </p>
        <h2 className={styles.subtitle}>Key Features:</h2>
        <ul className={styles.features}>
          <li>Seamless user registration and login</li>
          <li>Profile management with real-time updates</li>
          <li>Secure authentication using JWT</li>
          <li>Responsive and intuitive UI</li>
        </ul>
        <p className={styles.footer}>
          © 2024 Our Project. All rights reserved by Kelangi Raj Kiran.
        </p>
      </div>
    </div>
  );
};

export default Home;
