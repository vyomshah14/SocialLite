import { 
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import PostComposer from './PostComposer';
import BentoPostCard from './BentoPostCard';

const TrendingTags = () => {
  const tags = [
    { name: '#design', count: '2.4k', color: 'text-accent-purple' },
    { name: '#react', count: '1.8k', color: 'text-accent-indigo' },
    { name: '#uiux', count: '956', color: 'text-accent-cyan' },
    { name: '#coding', count: '621', color: 'text-accent-pink' },
  ];

  return (
    <div className="glass-card !rounded-3xl p-5 border-white/10 group hover:border-white/20 transition-all">
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-4 h-4 text-accent-indigo" />
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50">Trending Tags</h4>
      </div>
      <div className="space-y-1">
        {tags.map((tag) => (
          <div key={tag.name} className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-2xl cursor-pointer transition-all group">
            <span className={`text-sm font-bold ${tag.color} filter saturate-150`}>{tag.name}</span>
            <span className="text-[10px] text-white/30 font-bold tracking-tighter">{tag.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MiniProfile = ({ user, postCount, friendCount }) => {
  return (
    <div className="glass-card !rounded-3xl p-5 overflow-hidden border-white/10">
      <div className="h-20 bg-gradient-to-br from-accent-purple/20 via-accent-indigo/20 to-accent-cyan/20 rounded-2xl mb-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute top-2 right-2 p-1.5 glass-card !rounded-lg border-white/20">
          <Zap size={14} className="text-amber-400 fill-amber-400" />
        </div>
      </div>
      
      <div className="px-1 text-center">
        <div className="relative -mt-14 mb-4 inline-block">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${user.gradient} flex items-center justify-center text-xl font-bold text-white ring-8 ring-[#030305] shadow-2xl`}>
            {user.initials}
          </div>
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-4 border-[#030305] rounded-full" />
        </div>
        
        <div className="mb-6">
          <h3 className="font-syne text-lg font-black text-white tracking-tight leading-tight">{user.name}</h3>
          <p className="text-[11px] text-white/40 font-bold uppercase tracking-widest mt-1">{user.username}</p>
        </div>

        <div className="grid grid-cols-3 gap-0 border-t border-white/5 pt-5 mb-6">
          <div className="text-center">
            <p className="text-sm font-bold text-white font-syne">{postCount}</p>
            <p className="text-[8px] uppercase font-bold text-white/20 tracking-widest mt-1">Posts</p>
          </div>
          <div className="text-center border-x border-white/5">
            <p className="text-sm font-bold text-white font-syne">{friendCount}</p>
            <p className="text-[8px] uppercase font-bold text-white/20 tracking-widest mt-1">Friends</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-white font-syne">1.2k</p>
            <p className="text-[8px] uppercase font-bold text-white/20 tracking-widest mt-1">Gems</p>
          </div>
        </div>

        <button className="w-full py-3 glass-card !rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white border-white/10 hover:border-accent-purple/50 transition-all">
          View Profile
        </button>
      </div>
    </div>
  );
};

const SuggestedFriends = () => {
  const friends = [
    { id: 1, name: 'Elena Vance', initials: 'EV', mutuals: 12, gradient: 'from-accent-cyan to-accent-indigo' },
    { id: 2, name: 'Mika Chen', initials: 'MC', mutuals: 8, gradient: 'from-accent-pink to-accent-purple' },
    { id: 3, name: 'Liam Wilson', initials: 'LW', mutuals: 15, gradient: 'from-accent-purple to-accent-indigo' },
  ];

  return (
    <div className="glass-card !rounded-3xl p-5 border-white/10">
      <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 mb-6">Squad Recommendations</h4>
      <div className="space-y-5">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${friend.gradient} flex items-center justify-center text-xs font-bold text-white shadow-lg transition-transform group-hover:scale-110`}>
                {friend.initials}
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-tight">{friend.name}</p>
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-tight">{friend.mutuals} mutuals</p>
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center glass-card !rounded-lg border-white/10 hover:bg-accent-indigo/20 hover:text-accent-indigo hover:border-accent-indigo/30 transition-all">
              <Sparkles size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function FeedPage({ user, posts, onPost, onToggleLike, onAddComment, friendCount }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_280px] gap-8">
      
      {/* Left Sidebar */}
      <aside className="hidden lg:block space-y-6 sticky top-28 h-fit">
        <MiniProfile user={user} postCount={posts.filter(p => p.user.username === user.username).length} friendCount={friendCount} />
        <TrendingTags />
      </aside>

      {/* Center Feed */}
      <main className="space-y-8 min-w-0">
        <div className="glass-card !rounded-[2.5rem] p-1 border-white/10">
          <PostComposer user={user} onPost={onPost} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in-scale">
          {posts.map((post, idx) => (
            <BentoPostCard 
              key={post.id} 
              post={{
                ...post,
                isFeatured: idx === 0 || (idx === 3 && posts.length > 3)
              }} 
              user={user}
              index={idx} 
              onToggleLike={onToggleLike}
              onAddComment={onAddComment}
            />
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="hidden xl:block space-y-6 sticky top-28 h-fit">
        <SuggestedFriends />
        <div className="glass-card !rounded-3xl p-5 border-white/10 bg-gradient-to-br from-accent-purple/5 to-transparent">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 mb-3">Community Quest</h4>
          <p className="text-[11px] text-white/70 leading-relaxed font-medium">Post 3 design shots this week to earn the <span className="text-amber-400 font-bold">Pixel Master</span> badge! 🎨</p>
          <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-accent-purple to-accent-indigo rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
          </div>
        </div>
      </aside>

    </div>
  );
}
