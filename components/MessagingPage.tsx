
import React, { useState, useEffect } from 'react';
/* Added 'X' to imports to resolve "Cannot find name 'X'" on line 119 */
import { Search, Edit, MoreHorizontal, Send, Image, Paperclip, Smile, FileText, X } from 'lucide-react';
import { CURRENT_USER } from '../constants';
import { storage, STORAGE_KEYS } from '../services/storage';

const MessagingPage: React.FC = () => {
  const [chats, setChats] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');
  const [attachment, setAttachment] = useState<string | null>(null);

  useEffect(() => {
    const initialChats = [
      { id: 1, name: 'Sarah Chen', lastMsg: 'I saw your recent post!', time: '2h', avatar: 'https://picsum.photos/seed/sarah/100/100', online: true, history: [{ from: 'them', text: 'I saw your recent post!', time: '12:30 PM' }] },
      { id: 2, name: 'Mike Ross', lastMsg: 'The project is ready.', time: '1d', avatar: 'https://picsum.photos/seed/mike/100/100', online: false, history: [{ from: 'them', text: 'The project is ready.', time: 'Yesterday' }] },
    ];
    setChats(storage.load(STORAGE_KEYS.CHATS, initialChats));
  }, []);

  const saveChats = (newChats: any[]) => {
    setChats(newChats);
    storage.save(STORAGE_KEYS.CHATS, newChats);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageText.trim() && !attachment) return;
    
    const updatedChats = chats.map(c => {
      if (c.id === activeChatId) {
        const newMsg = { from: 'me', text: messageText, attachment, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        return { ...c, lastMsg: messageText || 'Sent an attachment', time: 'Just now', history: [...c.history, newMsg] };
      }
      return c;
    });
    
    saveChats(updatedChats);
    setMessageText('');
    setAttachment(null);
  };

  const activeChat = chats.find(c => c.id === activeChatId);

  const simulateAttachment = (type: string) => {
    setAttachment(`Simulated_${type}_Attachment.png`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex h-[80vh] overflow-hidden">
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-lg">Messaging</h2>
          <div className="flex gap-2">
            <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
            <Edit className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div className="p-4 border-b border-gray-100">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input className="w-full bg-[#edf3f8] border-none rounded py-1.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Search messages" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChatId(chat.id)}
              className={`flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${activeChatId === chat.id ? 'bg-blue-50 border-blue-600' : 'border-transparent'}`}
            >
              <div className="relative shrink-0">
                <img src={chat.avatar} className="w-12 h-12 rounded-full" />
                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm truncate">{chat.name}</h4>
                  <span className="text-[10px] text-gray-500">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-gray-50">
        {activeChat ? (
          <>
            <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">{activeChat.name}</h3>
                {activeChat.online && <span className="text-[10px] text-green-600 font-bold">ONLINE</span>}
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
            </div>
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
               {activeChat.history.map((msg: any, i: number) => (
                 <div key={i} className={`flex gap-2 ${msg.from === 'me' ? 'flex-row-reverse' : ''}`}>
                   <img src={msg.from === 'me' ? storage.load<any>(STORAGE_KEYS.USER, CURRENT_USER).avatar : activeChat.avatar} className="w-8 h-8 rounded-full self-end" />
                   <div className={`rounded-lg p-3 max-w-[70%] shadow-sm ${msg.from === 'me' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}>
                     {msg.attachment && (
                       <div className="mb-2 p-2 bg-black/10 rounded flex items-center gap-2 text-xs">
                         <FileText className="w-4 h-4" /> {msg.attachment}
                       </div>
                     )}
                     <p className="text-sm">{msg.text}</p>
                     <span className={`text-[10px] mt-1 block ${msg.from === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>{msg.time}</span>
                   </div>
                 </div>
               ))}
            </div>
            
            <div className="p-4 bg-white border-t border-gray-200">
               {attachment && (
                 <div className="mb-2 p-2 bg-blue-50 text-blue-700 text-xs rounded flex items-center justify-between border border-blue-100">
                   <div className="flex items-center gap-1"><Paperclip className="w-3 h-3" /> {attachment}</div>
                   <X className="w-3 h-3 cursor-pointer" onClick={() => setAttachment(null)} />
                 </div>
               )}
               <div className="flex flex-col border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all bg-white">
                  <textarea 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                    className="w-full p-3 resize-none outline-none border-none text-sm h-16" 
                    placeholder="Write a message..."
                  />
                  <div className="flex items-center justify-between p-2 border-t border-gray-100">
                    <div className="flex gap-4 px-2">
                       <Image className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" onClick={() => simulateAttachment('Photo')} />
                       <Paperclip className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" onClick={() => simulateAttachment('File')} />
                       <Smile className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" onClick={() => alert('Emoji picker coming soon')} />
                    </div>
                    <button onClick={() => handleSendMessage()} className="bg-blue-600 text-white font-bold px-5 py-1 rounded-full text-xs hover:bg-blue-700 transition-colors shadow-sm">Send</button>
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50">
            <Edit className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="font-bold text-xl text-gray-900">Your messages</h3>
            <p className="text-gray-500 mt-2">Send a message to start a conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;
