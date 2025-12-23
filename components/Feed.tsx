
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_POSTS, CURRENT_USER } from '../constants';
import { Post } from '../types';
import PostCard from './PostCard';
import AIAssistant from './AIAssistant';
import { Image, Video, Calendar, Layout, X, Upload } from 'lucide-react';
import { storage, STORAGE_KEYS } from '../services/storage';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postDraft, setPostDraft] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = storage.load<Post[]>(STORAGE_KEYS.POSTS, MOCK_POSTS);
    setPosts(saved);
  }, []);

  const savePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    storage.save(STORAGE_KEYS.POSTS, newPosts);
  };

  const handleCreatePost = () => {
    if (!postDraft.trim()) return;
    
    // Fix: Added authorId property which was missing and required by the Post interface
    const newPost: Post = {
      id: `p${Date.now()}`,
      authorId: CURRENT_USER.id,
      author: {
        name: CURRENT_USER.name,
        avatar: storage.load<any>(STORAGE_KEYS.USER, CURRENT_USER).avatar || CURRENT_USER.avatar,
        headline: storage.load<any>(STORAGE_KEYS.USER, CURRENT_USER).headline || CURRENT_USER.headline
      },
      content: postDraft,
      timestamp: 'Just now',
      likes: 0,
      reposts: 0,
      comments: [],
      image: attachedImage || undefined
    };

    savePosts([newPost, ...posts]);
    resetForm();
  };

  const resetForm = () => {
    setPostDraft('');
    setAttachedImage(null);
    setShowCreatePost(false);
    setShowAI(false);
  };

  const handleApplyAIContent = (content: string) => {
    setPostDraft(content);
    setShowAI(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openWithMedia = () => {
    setShowCreatePost(true);
    setTimeout(() => fileInputRef.current?.click(), 100);
  };

  return (
    <div className="flex-1 max-w-xl w-full mx-auto flex flex-col gap-3">
      {/* Create Post Box */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <img src={storage.load<any>(STORAGE_KEYS.USER, CURRENT_USER).avatar} alt="Me" className="w-12 h-12 rounded-full object-cover" />
          <button 
            onClick={() => setShowCreatePost(true)}
            className="flex-1 text-left px-4 py-3 bg-white border border-gray-300 rounded-full text-gray-500 font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Start a post
          </button>
        </div>
        <div className="flex justify-between px-2">
          <button onClick={openWithMedia} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors text-sm font-semibold text-gray-600">
            <Image className="text-blue-400 w-5 h-5" />
            <span className="hidden sm:inline">Photo</span>
          </button>
          <button onClick={openWithMedia} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors text-sm font-semibold text-gray-600">
            <Video className="text-green-500 w-5 h-5" />
            <span className="hidden sm:inline">Video</span>
          </button>
          <button onClick={() => setShowCreatePost(true)} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors text-sm font-semibold text-gray-600">
            <Calendar className="text-amber-600 w-5 h-5" />
            <span className="hidden sm:inline">Event</span>
          </button>
          <button onClick={() => setShowCreatePost(true)} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors text-sm font-semibold text-gray-600">
            <Layout className="text-orange-500 w-5 h-5" />
            <span className="hidden sm:inline">Write article</span>
          </button>
        </div>
      </div>

      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-xl font-medium text-gray-800">Create a post</h2>
              <button onClick={resetForm} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <img src={storage.load<any>(STORAGE_KEYS.USER, CURRENT_USER).avatar} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{storage.load<any>(STORAGE_KEYS.USER, CURRENT_USER).name}</h4>
                  <button className="text-xs text-gray-500 flex items-center gap-1 border border-gray-300 rounded-full px-2 py-0.5 hover:bg-gray-50">
                    🌐 Anyone
                  </button>
                </div>
              </div>

              <textarea 
                value={postDraft}
                onChange={(e) => setPostDraft(e.target.value)}
                placeholder="What do you want to talk about?"
                className="w-full min-h-[150px] text-lg text-gray-800 placeholder:text-gray-400 border-none outline-none resize-none focus:ring-0"
              />

              {attachedImage && (
                <div className="relative mt-2">
                  <img src={attachedImage} className="w-full rounded-lg border border-gray-200" alt="Attachment" />
                  <button onClick={() => setAttachedImage(null)} className="absolute top-2 right-2 bg-black/60 p-1 rounded-full text-white hover:bg-black/80">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {showAI && (
                <div className="mt-4">
                  <AIAssistant initialContent={postDraft} onApply={handleApplyAIContent} />
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAI(!showAI)}
                  className={`p-2 rounded-full transition-colors ${showAI ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  <Layout className="w-6 h-6" />
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                  <Image className="w-6 h-6" />
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
              <button 
                onClick={handleCreatePost}
                disabled={!postDraft.trim()}
                className="bg-blue-600 text-white font-bold px-6 py-1.5 rounded-full hover:bg-blue-700 disabled:bg-gray-300 transition-colors shadow-sm"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onUpdate={() => setPosts(storage.load<Post[]>(STORAGE_KEYS.POSTS, []))} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
