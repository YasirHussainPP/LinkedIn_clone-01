
import React, { useState, useEffect } from 'react';
import { Bell, MoreHorizontal, UserPlus, ThumbsUp, MessageSquare, Briefcase, Settings } from 'lucide-react';
import { storage, STORAGE_KEYS } from '../services/storage';

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [notifs, setNotifs] = useState<any[]>([]);

  useEffect(() => {
    const initial = [
      { id: 1, type: 'connection', content: 'Jordan Smith invited you to connect.', time: '2h', icon: UserPlus, unread: true, category: 'all' },
      { id: 2, type: 'like', content: 'Emily Blunt and 5 others liked your post.', time: '5h', icon: ThumbsUp, unread: true, category: 'my_posts' },
      { id: 3, type: 'job', content: 'New job for you: Frontend Architect at Tesla.', time: '1d', icon: Briefcase, unread: false, category: 'all' },
      { id: 4, type: 'comment', content: 'Mike Ross mentioned you in a comment.', time: '2d', icon: MessageSquare, unread: false, category: 'mentions' },
    ];
    setNotifs(storage.load(STORAGE_KEYS.NOTIFICATIONS, initial));
  }, []);

  const markRead = (id: number) => {
    const updated = notifs.map(n => n.id === id ? { ...n, unread: false } : n);
    setNotifs(updated);
    storage.save(STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  const filteredNotifs = notifs.filter(n => filter === 'all' || n.category === filter);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-64 shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-20">
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Manage your Notifications</h3>
            <button onClick={() => alert('Notification settings')} className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
              <Settings className="w-3.5 h-3.5" /> View Settings
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b flex items-center gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'my_posts', label: 'My posts' },
              { id: 'mentions', label: 'Mentions' }
            ].map(f => (
              <button 
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-1 rounded-full text-xs font-bold transition-all border ${filter === f.id ? 'bg-green-700 text-white border-green-700' : 'text-gray-500 border-gray-300 hover:bg-gray-100'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col min-h-[400px]">
            {filteredNotifs.length > 0 ? filteredNotifs.map(notif => (
              <div 
                key={notif.id} 
                onClick={() => markRead(notif.id)}
                className={`p-4 flex gap-4 items-start hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-0 ${notif.unread ? 'bg-blue-50/50' : ''}`}
              >
                <div className={`p-2 rounded-full ${notif.unread ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <notif.icon className={`w-6 h-6 ${notif.unread ? 'text-blue-600' : 'text-gray-500'}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${notif.unread ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
                    {notif.content}
                  </p>
                  <span className="text-xs text-gray-500 mt-1 block">{notif.time}</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <button className="p-1 hover:bg-gray-100 rounded-full transition-colors"><MoreHorizontal className="w-5 h-5 text-gray-500" /></button>
                   {notif.unread && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                </div>
              </div>
            )) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 text-gray-200 mb-2" />
                <p>No notifications in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
