import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from 'lucide-react';

export default function PostCard({ post, index }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setIsLikeAnimating(true);
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    setTimeout(() => setIsLikeAnimating(false), 300);
  };

  return (
    <div 
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 shadow-xl group animate-fade-slide-up opacity-0"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-0.5 rounded-xl bg-gradient-to-tr ${post.user.gradient} transition-transform group-hover:scale-105`}>
            <div className="w-10 h-10 rounded-[10px] bg-[#0a0a0f] flex items-center justify-center text-xs font-bold text-white uppercase tracking-tighter">
              {post.user.avatar || post.user.initials}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm tracking-tight">{post.user.name}</h4>
            <p className="text-[11px] text-white/40 font-medium">{post.user.username} · {post.timestamp}</p>
          </div>
        </div>
        <button className="text-white/40 hover:text-white p-1.5 hover:bg-white/5 rounded-lg transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 pb-4 space-y-4">
        <p className="text-[15px] text-white/80 leading-relaxed font-medium">
          {post.content}
        </p>
        
        {post.image && (
          <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-white/5">
            <img 
              src={post.image} 
              alt="Post visual" 
              className="w-full h-full object-cover max-h-96 transition-transform duration-700 group-hover:scale-[1.02]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 transition-all duration-300 ${liked ? 'text-rose-500' : 'text-white/40 hover:text-rose-400'}`}
          >
            <Heart 
              size={18} 
              className={`transition-transform duration-300 ${isLikeAnimating ? 'scale-150' : 'scale-100'}`}
              fill={liked ? "currentColor" : "none"}
            />
            <span className="text-xs font-bold tabular-nums">{likeCount}</span>
          </button>
          
          <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
            <MessageCircle size={18} />
            <span className="text-xs font-bold tabular-nums">{post.comments}</span>
          </button>
          
          <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
            <Share2 size={18} />
          </button>
        </div>

        <button 
          onClick={() => setBookmarked(!bookmarked)}
          className={`transition-colors ${bookmarked ? 'text-purple-400' : 'text-white/40 hover:text-white'}`}
        >
          <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}
