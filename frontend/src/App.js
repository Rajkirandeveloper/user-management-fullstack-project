import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import ProfileUpdate from './components/ProfileUpdate';
import Home from './components/Home';
import Layout from './components/Layout';
import Profile from './components/Profile';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route
          path="/profile-update" element={<ProfileUpdate/>}
        />
            
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
