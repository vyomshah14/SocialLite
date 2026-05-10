import { useState, useEffect, useMemo } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send } from 'lucide-react';

const fallbackComments = [
  { id: 'seed-1', user: 'Sarah J.', text: 'This design is incredible!', avatar: 'SJ', gradient: 'from-pink-500 to-orange-500' },
  { id: 'seed-2', user: 'Mike R.', text: 'Love the color palette here.', avatar: 'MR', gradient: 'from-blue-500 to-indigo-500' }
];

export default function BentoPostCard({ post, user, index, onToggleLike, onAddComment }) {
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const comments = useMemo(() => {
    if (post.commentItems?.length) return post.commentItems;
    if ((Number.parseInt(post.comments, 10) || 0) > 0) return fallbackComments;
    return [];
  }, [post.commentItems, post.comments]);
  const commentCount = Number.parseInt(post.comments, 10) || comments.length;
  const likeCount = Number.parseInt(post.likes, 10) || 0;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800 + index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const handleLike = () => {
    setIsLikeAnimating(true);
    onToggleLike(post.id);
    setTimeout(() => setIsLikeAnimating(false), 300);
  };

  const handleCommentSubmit = (e) => {
    e?.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: 'You',
      text: commentText,
      avatar: user.initials,
      gradient: user.gradient
    };

    onAddComment(post.id, newComment);
    setCommentText('');
    setShowComments(true);
  };

  if (loading) {
    return (
      <div 
        className={`bg-white/5 border border-white/10 rounded-[2rem] p-6 animate-pulse ${
          post.isFeatured ? 'md:col-span-2' : ''
        } ${post.image ? 'md:row-span-2' : ''}`}
        style={{ height: post.isFeatured ? '400px' : post.image ? '500px' : '220px' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-white/10" />
          <div className="space-y-2"><div className="h-3 w-24 bg-white/10 rounded" /><div className="h-2 w-16 bg-white/10 rounded" /></div>
        </div>
        <div className="space-y-3"><div className="h-4 w-full bg-white/10 rounded" /><div className="h-4 w-4/5 bg-white/10 rounded" /></div>
      </div>
    );
  }

  return (
    <div 
      className={`group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-6 overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.01] shadow-2xl animate-fade-slide-up opacity-0 ${
        post.isFeatured ? 'md:col-span-2' : ''
      } ${post.image ? 'md:row-span-2' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-purple/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-accent-purple/20 transition-all duration-700" />
      
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`p-0.5 rounded-full bg-gradient-to-tr ${post.user.gradient}`}>
            <div className="w-10 h-10 rounded-full bg-[#0a0a0f] flex items-center justify-center font-syne text-xs font-bold text-white uppercase">
              {post.user.avatar || post.user.initials}
            </div>
          </div>
          <div>
            <h4 className="font-syne text-sm font-bold tracking-tight text-white group-hover:text-accent-indigo transition-colors">{post.user.name}</h4>
            <div className="flex items-center gap-2">
               <p className="text-[10px] text-slate-500 font-medium tracking-wide">{post.user.username} • {post.timestamp}</p>
               {post.feeling && (
                 <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                   feeling {post.feeling.name} {post.feeling.emoji}
                 </span>
               )}
               {post.location && (
                 <span className="text-[9px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-bold">
                   📍 {post.location}
                 </span>
               )}
            </div>
          </div>
        </div>
        <button className="text-slate-500 hover:text-white transition-colors"><MoreHorizontal size={18} /></button>
      </div>

      <div className="space-y-4">
        <p className={`text-slate-300 leading-relaxed ${post.isFeatured ? 'text-lg sm:text-xl font-medium' : 'text-sm'}`}>{post.content}</p>
        {post.image && (
          <div className="relative mt-4 rounded-2xl overflow-hidden border border-white/5 shadow-inner">
             <img src={post.image} alt="Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 to-transparent" />
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5">
        <div className="flex items-center gap-6">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 transition-all duration-300 ${post.liked ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-slate-400 hover:text-red-400'}`}
          >
            <Heart 
              size={20} 
              className={`transition-transform duration-300 ${isLikeAnimating ? 'scale-150' : 'scale-100'}`}
              fill={post.liked ? "currentColor" : "none"}
            />
            <span className="text-xs font-bold tabular-nums">{likeCount}</span>
          </button>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-2 transition-colors ${showComments ? 'text-accent-indigo' : 'text-slate-400 hover:text-white'}`}
          >
            <MessageCircle size={20} />
            <span className="text-xs font-bold tabular-nums">{commentCount}</span>
          </button>
        </div>
        <button className="text-slate-500 hover:text-accent-purple transition-all"><Share2 size={18} /></button>
      </div>

      {/* Inline Comments Panel */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${showComments ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
      >
        <div className="border-t border-white/5 pt-5 space-y-5">
          <form onSubmit={handleCommentSubmit} className="flex gap-3">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${user.gradient} flex items-center justify-center text-[10px] font-bold text-white`}>
              {user.initials}
            </div>
            <div className="flex-1 relative">
              <input 
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
                placeholder="Write a comment..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-accent-indigo outline-none transition-all"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-accent-indigo hover:text-white disabled:opacity-0 transition-all"
              >
                <Send size={14} />
              </button>
            </div>
          </form>

          <div className="space-y-4 pr-1 max-h-56 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${comment.gradient} flex items-center justify-center text-[8px] font-bold text-white shrink-0 shadow-sm`}>
                  {comment.avatar}
                </div>
                <div className="flex-1 bg-white/[0.03] rounded-2xl px-3 py-2 border border-white/[0.02]">
                  <p className="text-[11px] font-syne font-bold text-white/90">{comment.user}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
