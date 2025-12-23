
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import NewsBar from './components/NewsBar';
import JobsPage from './components/JobsPage';
import ProfilePage from './components/ProfilePage';
import NetworkPage from './components/NetworkPage';
import MessagingPage from './components/MessagingPage';
import NotificationsPage from './components/NotificationsPage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import { Page } from './types';
import { storage, STORAGE_KEYS } from './services/storage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const isAuth = storage.load<boolean>(STORAGE_KEYS.AUTH_TOKEN, false);
    setIsAuthenticated(isAuth);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage(Page.HOME);
  };

  const handleLogout = () => {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    setIsAuthenticated(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case Page.HOME:
        return (
          <div className="flex flex-col lg:flex-row gap-6 w-full animate-in fade-in duration-500">
            <Sidebar />
            <Feed />
            <NewsBar />
          </div>
        );
      case Page.NETWORK:
        return (
          <div className="w-full">
            <NetworkPage />
          </div>
        );
      case Page.MESSAGING:
        return (
          <div className="w-full">
            <MessagingPage />
          </div>
        );
      case Page.NOTIFICATIONS:
        return (
          <div className="w-full">
            <NotificationsPage />
          </div>
        );
      case Page.JOBS:
        return (
          <div className="w-full animate-in slide-in-from-bottom-2 duration-500">
            <JobsPage />
          </div>
        );
      case Page.PROFILE:
        return (
          <div className="w-full animate-in slide-in-from-bottom-2 duration-500">
            <ProfilePage />
          </div>
        );
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return authView === 'login' ? (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess} 
        onSwitchToRegister={() => setAuthView('register')} 
      />
    ) : (
      <RegisterPage 
        onRegisterSuccess={handleLoginSuccess} 
        onSwitchToLogin={() => setAuthView('login')} 
      />
    );
  }

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
