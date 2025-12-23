
import React from 'react';
import { Page } from '../types';
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  Search,
  User as UserIcon,
  Cpu
} from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: Page.HOME, label: 'Home', icon: Home },
    { id: Page.NETWORK, label: 'My Network', icon: Users },
    { id: Page.JOBS, label: 'Jobs', icon: Briefcase },
    { id: Page.MESSAGING, label: 'Messaging', icon: MessageSquare },
    { id: Page.NOTIFICATIONS, label: 'Notifications', icon: Bell },
    { id: Page.PROFILE, label: 'Me', icon: UserIcon },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div 
            className="linkedin-bg-blue p-1 rounded cursor-pointer"
            onClick={() => setCurrentPage(Page.HOME)}
          >
            <div className="text-white font-bold text-xl px-1">in</div>
          </div>
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-[#edf3f8] border-none rounded py-1.5 pl-10 pr-4 w-full focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            />
          </div>
        </div>

        <nav className="flex items-center gap-1 md:gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex flex-col items-center min-w-[64px] md:min-w-[80px] group transition-colors ${
                  isActive ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-6 h-6 ${isActive ? 'text-black' : ''}`} />
                  {item.id === Page.NOTIFICATIONS && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full px-1 min-w-[16px]">3</span>
                  )}
                </div>
                <span className="text-xs mt-0.5 hidden sm:block">{item.label}</span>
                {isActive && <div className="absolute bottom-0 h-0.5 bg-black w-full" />}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
