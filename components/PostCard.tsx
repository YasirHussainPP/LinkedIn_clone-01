
import React, { useState, useMemo } from 'react';
import { Post, Comment, User as UserType } from '../types';
import { ThumbsUp, MessageSquare, Share2, Send, MoreHorizontal, CheckCircle } from 'lucide-react';
import { CURRENT_USER } from '../constants';
import { storage, STORAGE_KEYS } from '../services/storage';

interface PostCardProps {
  post: Post;
  onUpdate?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [sent, setSent] = useState(false);

  // Sync author data if it's the current user
  const currentUser = storage.load<UserType>(STORAGE_KEYS.USER, CURRENT_USER);
  const displayAuthor = useMemo(() => {
    if (post.authorId === currentUser.id) {
      return {
        name: currentUser.name,
        avatar: currentUser.avatar,
        headline: currentUser.headline
      };
    }
    return post.author;
  }, [post.authorId, post.author, currentUser]);

  const handleLike = () => {
    const allPosts = storage.load<Post[]>(STORAGE_KEYS.POSTS, []);
    const updated = allPosts.map(p => {
      if (p.id === post.id) {
        const isLiked = !p.likedByMe;
        return { 
          ...p, 
          likedByMe: isLiked, 
          likes: isLiked ? p.likes + 1 : p.likes - 1 
        };
      }
      return p;
    });
    storage.save(STORAGE_KEYS.POSTS, updated);
    if (onUpdate) onUpdate();
  };
  
  const handleRepost = () => {
    const allPosts = storage.load<Post[]>(STORAGE_KEYS.POSTS, []);
    const updated = allPosts.map(p => {
      if (p.id === post.id) {
        return { ...p, reposts: p.reposts + 1 };
      }
      return p;
    });
    storage.save(STORAGE_KEYS.POSTS, updated);
    if (onUpdate) onUpdate();
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      avatar: currentUser.avatar,
      content: commentText,
      timestamp: 'Just now'
    };
    
    const allPosts = storage.load<Post[]>(STORAGE_KEYS.POSTS, []);
    const updated = allPosts.map(p => {
      if (p.id === post.id) {
        return { ...p, comments: [newComment, ...p.comments] };
      }
      return p;
    });
    storage.save(STORAGE_KEYS.POSTS, updated);
    setCommentText('');
    if (onUpdate) onUpdate();
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2000);
    navigator.clipboard.writeText(`${window.location.origin}/posts/${post.id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-2 shadow-sm">
      <div className="p-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <img src={displayAuthor.avatar} alt={displayAuthor.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h4 className="font-semibold text-sm hover:text-blue-600 hover:underline cursor-pointer">{displayAuthor.name}</h4>
            <p className="text-xs text-gray-500 leading-tight">{displayAuthor.headline}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{post.timestamp} • 🌐</p>
          </div>
        </div>
        <button className="text-gray-600 hover:bg-gray-100 p-1.5 rounded-full">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="px-3 pb-3">
        <p className="text-sm text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.image && (
        <img src={post.image} alt="Post content" className="w-full h-auto max-h-[500px] object-cover border-t border-b border-gray-100" />
      )}

      <div className="px-3 py-2 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-1 text-[11px] text-gray-500">
          <div className="bg-blue-500 rounded-full p-0.5">
            <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
          </div>
          <span>{post.likes} • {post.comments.length} comments • {post.reposts} reposts</span>
        </div>
      </div>

      <div className="px-3 py-1 flex items-center justify-between">
        <button 
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded transition-colors text-sm font-semibold ${post.likedByMe ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <ThumbsUp className={`w-5 h-5 ${post.likedByMe ? 'fill-blue-600' : ''}`} />
          <span>Like</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded transition-colors text-sm font-semibold ${showComments ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Comment</span>
        </button>
        <button 
          onClick={handleRepost}
          className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded transition-colors text-sm font-semibold text-gray-500"
        >
          <Share2 className="w-5 h-5" />
          <span>Repost</span>
        </button>
        <button 
          onClick={handleSend}
          className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded transition-colors text-sm font-semibold ${sent ? 'text-green-600' : 'text-gray-500'}`}
        >
          {sent ? <CheckCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
          <span>{sent ? 'Sent' : 'Send'}</span>
        </button>
      </div>

      {showComments && (
        <div className="p-3 bg-gray-50 rounded-b-lg border-t border-gray-100">
          <form onSubmit={handleSendComment} className="flex gap-2 mb-4">
            <img src={currentUser.avatar} alt="Me" className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full bg-white border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {commentText && (
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-sm px-2">Post</button>
              )}
            </div>
          </form>

          <div className="flex flex-col gap-3">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex gap-2">
                <img src={comment.authorId === currentUser.id ? currentUser.avatar : comment.avatar} alt={comment.authorName} className="w-8 h-8 rounded-full shrink-0" />
                <div className="bg-gray-100 rounded-lg p-3 flex-1">
                  <div className="flex justify-between items-start">
                    <h5 className="text-xs font-bold text-gray-900 hover:text-blue-600 cursor-pointer">{comment.authorId === currentUser.id ? currentUser.name : comment.authorName}</h5>
                    <span className="text-[10px] text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
