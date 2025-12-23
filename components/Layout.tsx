
import React from 'react';
import Header from './Header';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="max-w-6xl mx-auto pt-20 px-4 md:px-6 pb-12">
        {children}
      </main>
    </div>
  );
};

export default Layout;
