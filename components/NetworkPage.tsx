
import React, { useState, useEffect } from 'react';
import { UserPlus, Users, Calendar, Hash, FileText, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { storage, STORAGE_KEYS } from '../services/storage';

const NetworkPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Connections');
  const [isExpanded, setIsExpanded] = useState(true);
  
  const [connections, setConnections] = useState([
    { id: 1, name: 'Jordan Smith', headline: 'Full Stack Developer', avatar: 'https://picsum.photos/seed/jordan/100/100' },
    { id: 2, name: 'Emily Blunt', headline: 'Recruiter at Google', avatar: 'https://picsum.photos/seed/emily/100/100' },
    { id: 3, name: 'Dave Wilson', headline: 'Product Manager', avatar: 'https://picsum.photos/seed/dave/100/100' },
    { id: 4, name: 'Sarah Parker', headline: 'UX Designer', avatar: 'https://picsum.photos/seed/sarahp/100/100' },
    { id: 5, name: 'Chris Evans', headline: 'Director of Tech', avatar: 'https://picsum.photos/seed/chris/100/100' },
    { id: 6, name: 'Jessica Alba', headline: 'Entrepreneur', avatar: 'https://picsum.photos/seed/jess/100/100' },
  ]);

  const [connected, setConnected] = useState<number[]>(storage.load(STORAGE_KEYS.CONNECTIONS, []));

  useEffect(() => {
    storage.save(STORAGE_KEYS.CONNECTIONS, connected);
  }, [connected]);

  const handleConnect = (id: number) => {
    setConnected([...connected, id]);
  };

  const navItems = [
    { label: 'Connections', icon: Users, count: 542 + connected.length },
    { label: 'Contacts', icon: Users, count: 128 },
    { label: 'Following & Followers', icon: Users, count: 12 },
    { label: 'Groups', icon: Users, count: 4 },
    { label: 'Events', icon: Calendar, count: 0 },
    { label: 'Pages', icon: FileText, count: 28 },
    { label: 'Newsletters', icon: FileText, count: 3 },
    { label: 'Hashtags', icon: Hash, count: 5 },
  ];

  const visibleItems = isExpanded ? navItems : navItems.slice(0, 3);

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
      <div className="w-full lg:w-72 shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-20">
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Manage my network</h3>
            <ul className="flex flex-col gap-1 transition-all duration-300">
              {visibleItems.map(item => (
                <li 
                  key={item.label} 
                  onClick={() => setActiveTab(item.label)} 
                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors group ${activeTab === item.label ? 'bg-gray-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${activeTab === item.label ? 'text-blue-600' : 'group-hover:text-blue-600'}`} />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium">{item.count}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-center gap-1 text-gray-500 text-sm font-semibold mt-4 py-2 hover:bg-gray-100 rounded transition-colors"
            >
              {isExpanded ? (
                <>Show less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Show more <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4 min-h-[500px]">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">{activeTab} you may know</h3>
            <button className="text-blue-600 font-bold hover:underline text-sm">See all</button>
          </div>
          
          {activeTab === 'Connections' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 animate-in fade-in slide-in-from-bottom-2">
              {connections.map(person => (
                <div key={person.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col items-center p-4 text-center group relative hover:shadow-md transition-shadow h-full">
                  <div className="absolute top-0 left-0 w-full h-14 bg-gradient-to-r from-gray-100 to-gray-200" />
                  <img src={person.avatar} className="w-24 h-24 rounded-full border-4 border-white object-cover relative z-10 mb-2 shadow-sm" />
                  <h4 className="font-bold text-gray-900 hover:underline cursor-pointer relative z-10 leading-tight">{person.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2 h-8 mb-4 relative z-10">{person.headline}</p>
                  <div className="flex-1" />
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-4 relative z-10">
                    <Users className="w-3 h-3" /> 12 mutual connections
                  </div>
                  {connected.includes(person.id) ? (
                    <button className="w-full border-2 border-gray-300 text-gray-500 font-bold rounded-full py-1 text-sm flex items-center justify-center gap-1">
                      <Check className="w-4 h-4" /> Pending
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleConnect(person.id)}
                      className="w-full border-2 border-blue-600 text-blue-600 font-bold rounded-full py-1 text-sm hover:bg-blue-50 hover:border-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <UserPlus className="w-4 h-4" /> Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500 h-full animate-in fade-in">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Users className="w-12 h-12 text-gray-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">No {activeTab.toLowerCase()} to show</h4>
              <p className="max-w-xs mt-2">Grow your network to see more {activeTab.toLowerCase()} content here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
