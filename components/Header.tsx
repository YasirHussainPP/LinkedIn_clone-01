
import React, { useState } from 'react';
import { Page } from '../types';
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  Search,
  User as UserIcon,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { storage, STORAGE_KEYS } from '../services/storage';
import { CURRENT_USER } from '../constants';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, onLogout }) => {
  const [showMeMenu, setShowMeMenu] = useState(false);
  const user = storage.load<any>(STORAGE_KEYS.USER, CURRENT_USER);

  const navItems = [
    { id: Page.HOME, label: 'Home', icon: Home },
    { id: Page.NETWORK, label: 'My Network', icon: Users },
    { id: Page.JOBS, label: 'Jobs', icon: Briefcase },
    { id: Page.MESSAGING, label: 'Messaging', icon: MessageSquare },
    { id: Page.NOTIFICATIONS, label: 'Notifications', icon: Bell },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div 
            className="linkedin-bg-blue p-1 rounded cursor-pointer"
            onClick={() => setCurrentPage(Page.HOME)}
          >
            <div className="text-white font-bold text-xl px-1 leading-none">in</div>
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
                className={`flex flex-col items-center min-w-[64px] md:min-w-[80px] group transition-colors relative h-14 justify-center ${
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
                {isActive && <div className="absolute bottom-0 h-[2px] bg-black w-full" />}
              </button>
            );
          })}

          <div className="relative">
            <button
              onClick={() => setShowMeMenu(!showMeMenu)}
              className={`flex flex-col items-center min-w-[64px] md:min-w-[80px] group transition-colors relative h-14 justify-center ${
                currentPage === Page.PROFILE ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              <img src={user.avatar} className="w-6 h-6 rounded-full object-cover" alt="Me" />
              <div className="flex items-center gap-0.5 mt-0.5 hidden sm:flex">
                <span className="text-xs">Me</span>
                <ChevronDown className="w-3 h-3" />
              </div>
              {currentPage === Page.PROFILE && <div className="absolute bottom-0 h-[2px] bg-black w-full" />}
            </button>

            {showMeMenu && (
              <div className="absolute top-14 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <img src={user.avatar} className="w-12 h-12 rounded-full object-cover" alt="Me" />
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-sm truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.headline}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setCurrentPage(Page.PROFILE); setShowMeMenu(false); }}
                  className="w-[calc(100%-1rem)] mx-2 my-2 border border-blue-600 text-blue-600 font-bold rounded-full py-0.5 text-sm hover:bg-blue-50 transition-colors"
                >
                  View Profile
                </button>
                <div className="border-t border-gray-100 py-2">
                  <p className="px-4 py-1 text-xs font-bold text-gray-900">Account</p>
                  <button className="w-full text-left px-4 py-1.5 text-sm text-gray-500 hover:underline">Settings & Privacy</button>
                  <button className="w-full text-left px-4 py-1.5 text-sm text-gray-500 hover:underline">Help</button>
                  <button className="w-full text-left px-4 py-1.5 text-sm text-gray-500 hover:underline">Language</button>
                </div>
                <div className="border-t border-gray-100 pt-2">
                  <button 
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
