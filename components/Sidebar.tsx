
import React from 'react';
import { CURRENT_USER } from '../constants';
import { Bookmark, Plus } from 'lucide-react';
import { storage, STORAGE_KEYS } from '../services/storage';

const Sidebar: React.FC = () => {
  const user = storage.load<any>(STORAGE_KEYS.USER, CURRENT_USER);

  const handleAction = (label: string) => {
    alert(`${label} feature is coming soon!`);
  };

  return (
    <aside className="hidden lg:flex flex-col gap-2 w-64 shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="h-14 bg-gradient-to-r from-blue-400 to-indigo-500" />
        <div className="px-3 pb-4 text-center">
          <div className="relative -mt-8 inline-block">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-16 h-16 rounded-full border-2 border-white object-cover mx-auto shadow-sm"
            />
          </div>
          <h3 className="mt-2 font-bold text-gray-900 hover:underline cursor-pointer">{user.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{user.headline}</p>
        </div>
        <div className="border-t border-gray-100 py-3">
          <div className="px-3 flex justify-between items-center text-xs group cursor-pointer hover:bg-gray-50 py-1 transition-colors">
            <span className="text-gray-500 font-semibold">Profile viewers</span>
            <span className="text-blue-600 font-bold">{user.profileViews}</span>
          </div>
          <div className="px-3 flex justify-between items-center text-xs group cursor-pointer hover:bg-gray-50 py-1 transition-colors">
            <div>
              <span className="text-gray-500 font-semibold block">Connections</span>
              <span className="text-black font-bold">Grow your network</span>
            </div>
            <span className="text-blue-600 font-bold">{user.connections}</span>
          </div>
        </div>
        <div className="border-t border-gray-100 py-3 px-3 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleAction('Premium')}>
          <p className="text-xs text-gray-500">Access exclusive tools & insights</p>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
            <span className="text-xs font-bold text-gray-900 underline">Try Premium for $0</span>
          </div>
        </div>
        <div className="border-t border-gray-100 py-3 px-3 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2" onClick={() => handleAction('My Items')}>
          <Bookmark className="w-4 h-4 text-gray-500 fill-gray-500" />
          <span className="text-xs font-bold text-gray-600">My items</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm sticky top-20">
        <div className="p-3">
          <p className="text-xs text-gray-600 font-semibold mb-3">Recent</p>
          {['reactjs', 'typescript', 'generative-ai', 'career-advice'].map(tag => (
            <div key={tag} className="flex items-center gap-2 text-xs text-gray-500 font-bold py-1 hover:bg-gray-100 cursor-pointer px-1" onClick={() => handleAction(`#${tag}`)}>
              <span>#</span>
              <span>{tag}</span>
            </div>
          ))}
          <p className="text-xs text-blue-600 font-bold mt-4 hover:underline cursor-pointer" onClick={() => handleAction('Groups')}>Groups</p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-blue-600 font-bold hover:underline cursor-pointer" onClick={() => handleAction('Events')}>Events</p>
            <Plus className="w-4 h-4 text-gray-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleAction('Create Event'); }} />
          </div>
          <p className="text-xs text-blue-600 font-bold mt-4 hover:underline cursor-pointer" onClick={() => handleAction('Followed Hashtags')}>Followed Hashtags</p>
        </div>
        <div className="border-t border-gray-100 p-3 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleAction('Discover')}>
          <p className="text-sm font-semibold text-gray-500">Discover more</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
