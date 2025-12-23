
import React, { useState } from 'react';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import NewsBar from './components/NewsBar';
import JobsPage from './components/JobsPage';
import ProfilePage from './components/ProfilePage';
import NetworkPage from './components/NetworkPage';
import MessagingPage from './components/MessagingPage';
import NotificationsPage from './components/NotificationsPage';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

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
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 bg-white rounded-lg border border-gray-200">
            <div className="text-4xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-gray-900">Coming Soon</h2>
            <p className="text-gray-500 mt-2 max-w-md">
              We're polishing this feature for the best professional experience.
            </p>
            <button 
              onClick={() => setCurrentPage(Page.HOME)}
              className="mt-6 bg-blue-600 text-white font-bold px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        );
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderContent()}
    </Layout>
  );
};

export default App;
