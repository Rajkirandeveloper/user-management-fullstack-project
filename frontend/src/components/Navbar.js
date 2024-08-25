import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>Profile Management</NavLink>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Home</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/register" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Register</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/login" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Login</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/profile" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}>Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;




