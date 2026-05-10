import { useState, useEffect } from 'react';
import { 
  Camera, 
  MapPin, 
  Edit3, 
  X, 
  Heart, 
  Users, 
  Grid2x2, 
  Pencil,
  Eye,
  Award,
  Sparkles,
  Zap,
  Star,
  Shield,
  Layers
} from 'lucide-react';

const CountUp = ({ end, duration = 1.2 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);

  const format = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num;
  };

  return <span className="font-syne">{format(count)}</span>;
};

const Badge = ({ icon: Icon, name, description, unlocked, color }) => (
  <div className={`relative group/badge flex flex-col items-center p-4 glass-card !rounded-2xl transition-all duration-500 ${
    unlocked 
    ? 'hover:border-accent-purple/50 hover:bg-accent-purple/5 cursor-pointer animate-float' 
    : 'opacity-30 grayscale cursor-not-allowed border-white/5 bg-white/[0.01]'
  }`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${unlocked ? `${color} bg-white/5` : 'text-slate-500 bg-white/5'}`}>
      <Icon size={24} className={unlocked ? 'animate-pulse' : ''} />
    </div>
    <span className="text-white/70 text-[9px] font-black mt-1 text-center uppercase tracking-widest">{name}</span>
    
    {unlocked && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 glass-card !rounded-xl border-white/20 text-[10px] font-bold text-white shadow-2xl opacity-0 group-hover/badge:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50">
        {description}
      </div>
    )}
  </div>
);

export default function ProfilePage({ user: initialUser, postCount }) {
  const [user, setUser] = useState(initialUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [tempBio, setTempBio] = useState(user.bio || "");
  const [toast, setToast] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(88), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleModalSave = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setToast("Profile Refined! ✨");
    setTimeout(() => setToast(null), 3000);
  };

  const dummyThumbnails = [
    { id: 1, gradient: 'from-accent-purple to-accent-indigo', type: 'image', likes: 42, views: 124 },
    { id: 2, gradient: 'from-accent-cyan to-accent-indigo', type: 'text', likes: 18, views: 89 },
    { id: 3, gradient: 'from-accent-pink to-accent-purple', type: 'image', likes: 56, views: 210 },
    { id: 4, gradient: 'from-amber-400 to-accent-pink', type: 'image', likes: 31, views: 156 },
    { id: 5, gradient: 'from-accent-indigo to-accent-cyan', type: 'text', likes: 24, views: 92 },
    { id: 6, gradient: 'from-accent-purple to-accent-pink', type: 'image', likes: 67, views: 312 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 pb-24 text-white">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-28 right-8 z-[100] glass-card !bg-accent-purple !rounded-2xl text-white px-6 py-3 font-black text-xs uppercase tracking-widest shadow-2xl animate-in-scale">
          {toast}
        </div>
      )}

      {/* Hero Section */}
      <div className="glass-card !rounded-[3.5rem] overflow-hidden border-white/20 animate-in-scale">
        <div className="h-64 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/40 via-accent-indigo/40 to-accent-cyan/40 animate-gradient" />
          <div className="absolute inset-0 shimmer opacity-30" />
          
          {/* Animated Orbs */}
          <div className="absolute top-10 right-[10%] w-64 h-64 bg-accent-purple/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-[-20%] left-[5%] w-80 h-80 bg-accent-indigo/20 rounded-full blur-[120px] animate-pulse-glow" />
          
          <button className="absolute top-6 right-6 glass-button !px-4 !py-2 !rounded-xl !bg-white/10 hover:!bg-white/20 flex items-center gap-2">
            <Camera size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Change Cover</span>
          </button>
        </div>

        <div className="px-10 pb-10 flex flex-col md:flex-row items-end gap-8">
          <div className="relative -mt-20 z-10 group">
            <div className="w-40 h-40 rounded-[3rem] p-1.5 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-3xl shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3">
              <div className={`w-full h-full bg-gradient-to-br ${user.gradient} rounded-[2.5rem] flex items-center justify-center text-5xl font-black text-white shadow-inner`}>
                {user.initials || user.name.charAt(0)}
              </div>
            </div>
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-[#030305] animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
          </div>

          <div className="flex-1 mb-2">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="font-syne text-5xl font-black tracking-tighter neon-text">{user.name}</h1>
              <span className="px-4 py-1.5 glass-card !rounded-full text-[10px] font-black text-accent-purple border-accent-purple/30 bg-accent-purple/5 uppercase tracking-widest flex items-center gap-2">
                <Shield size={12} fill="currentColor" /> Verified Member
              </span>
            </div>
            <div className="flex items-center gap-5 mt-3">
              <span className="text-white/40 font-black text-xs uppercase tracking-[0.2em]">{user.username}</span>
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-2 text-[11px] font-bold text-white/50">
                <MapPin size={12} className="text-accent-indigo" /> Mumbai, India
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="glass-button !bg-white/5 border-white/10 hover:!border-accent-purple/50 text-white flex items-center gap-2"
            >
              <Edit3 size={18} className="text-accent-purple" />
              <span className="uppercase tracking-widest text-[10px] font-black">Customize</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center glass-card !rounded-2xl border-white/10 hover:border-white/30 transition-all">
              <Sparkles size={20} className="text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
        
        {/* BIO CARD - 4 cols */}
        <div className="md:col-span-4 glass-card !rounded-[2.5rem] p-8 border-white/10 group hover:border-white/20">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent-cyan" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">The Curator</h3>
            </div>
            <button 
              onClick={() => setIsBioEditing(!isBioEditing)}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/20 hover:text-accent-purple"
            >
              <Pencil size={14} />
            </button>
          </div>
          
          <div className="min-h-[120px]">
            {isBioEditing ? (
              <div className="space-y-4">
                <textarea 
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value.slice(0, 160))}
                  className="w-full bg-white/5 border border-accent-purple/30 rounded-2xl p-4 text-sm text-white/90 outline-none focus:ring-1 focus:ring-accent-purple/50 resize-none h-32 font-medium"
                  autoFocus
                />
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-black tracking-widest ${tempBio.length > 140 ? 'text-accent-pink' : 'text-white/20'}`}>
                    {tempBio.length} / 160
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => setIsBioEditing(false)} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white px-3">Cancel</button>
                    <button onClick={() => { setUser({...user, bio: tempBio}); setIsBioEditing(false); }} className="bg-accent-purple text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent-purple/20">Sync</button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className="text-white/70 text-[15px] leading-relaxed font-medium font-syne">
                  {user.bio || "Crafting digital experiences through the lens of a curator. Exploring the intersection of code, design, and culture."}
                </p>
                <div className="flex flex-wrap gap-2 mt-8">
                  {['💻 Creative Tech', '🎨 Visual Design', '⚡ Performance'].map(tag => (
                    <span key={tag} className="bg-white/5 border border-white/10 rounded-xl px-4 py-1.5 text-[9px] font-black text-white/40 uppercase tracking-widest group-hover:border-accent-indigo/30 transition-colors">{tag}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* STATS CARD - 4 cols */}
        <div className="md:col-span-4 glass-card !rounded-[2.5rem] p-8 border-white/10 bg-gradient-to-br from-accent-purple/5 to-transparent">
          <div className="flex items-center gap-2 mb-8">
            <Star className="w-4 h-4 text-amber-400" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Engagement Metrics</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] uppercase font-black text-white/20 tracking-widest mb-1">Total Posts</p>
                <p className="text-3xl font-black text-white leading-none"><CountUp end={postCount} /></p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-[9px] uppercase font-black text-white/20 tracking-widest mb-1">Squad Size</p>
                <p className="text-3xl font-black text-white leading-none"><CountUp end={1284} /></p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-[9px] uppercase font-black text-white/20 tracking-widest mb-1">Total Gems</p>
                <p className="text-3xl font-black text-white leading-none"><CountUp end={8421} /></p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
               <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Profile Rank</span>
                 <span className="text-[11px] font-black text-accent-cyan tracking-widest uppercase">Elite Curator</span>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                 <div className="h-full bg-gradient-to-r from-accent-purple via-accent-indigo to-accent-cyan transition-all duration-[2s] ease-out shadow-[0_0_15px_rgba(124,58,237,0.5)]" style={{ width: `${progress}%` }} />
               </div>
               <p className="text-[10px] text-white/20 font-bold mt-3 text-center tracking-tight">Only 12% to reach next level</p>
            </div>
          </div>
        </div>

        {/* ACHIEVEMENTS - 4 cols */}
        <div className="md:col-span-4 glass-card !rounded-[2.5rem] p-8 border-white/10">
          <div className="flex items-center gap-2 mb-8">
            <Award className="w-4 h-4 text-accent-pink" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Vault Achievements</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <Badge icon={Zap} name="Alpha" description="Early adopter status" unlocked={true} color="text-accent-cyan" />
            <Badge icon={Heart} name="Beloved" description="Got 1k+ gems on a post" unlocked={true} color="text-accent-pink" />
            <Badge icon={Sparkles} name="Shiny" description="Maintain a 30-day streak" unlocked={true} color="text-amber-400" />
            <Badge icon={Users} name="Socialite" description="Add 50 friends" unlocked={false} color="text-accent-indigo" />
            <Badge icon={Layers} name="Stacker" description="Post 100+ items" unlocked={false} color="text-accent-purple" />
            <Badge icon={Shield} name="Safe" description="Identity verified" unlocked={false} color="text-green-400" />
          </div>
        </div>

        {/* RECENT FEED - 12 cols */}
        <div className="md:col-span-12 glass-card !rounded-[3rem] p-10 border-white/10">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                <Grid2x2 size={20} className="text-accent-purple" />
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 leading-none mb-1">Collection</h3>
                <h2 className="font-syne text-2xl font-black text-white tracking-tighter">Your Digital Artifacts</h2>
              </div>
            </div>
            <button className="glass-button !py-2 !px-5 !bg-white/5 !border-white/10 !text-[10px] uppercase tracking-widest font-black hover:!bg-white/10">Explore All</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {dummyThumbnails.map((post) => (
              <div key={post.id} className="aspect-square rounded-[2rem] overflow-hidden relative group cursor-pointer shadow-2xl transition-all duration-500 hover:scale-[1.05] hover:rotate-2">
                <div className={`w-full h-full bg-gradient-to-br ${post.gradient} flex items-center justify-center group-hover:filter group-hover:brightness-125 transition-all duration-500`}>
                  <Sparkles size={40} className="text-white/10 group-hover:text-white/20 transition-all duration-700 group-hover:scale-150" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                   <div className="flex items-center gap-2 font-black text-lg text-white">
                      <Heart size={20} fill="currentColor" className="text-accent-pink" /> {post.likes}
                   </div>
                   <div className="flex items-center gap-2 text-white/60 font-black text-[10px] uppercase tracking-widest">
                      <Eye size={16} className="text-accent-cyan" /> {post.views}
                   </div>
                </div>
                {post.type === 'image' && (
                  <div className="absolute top-4 right-4 glass-card !rounded-xl !p-2 border-white/20">
                    <Camera size={14} className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-xl glass-card !rounded-[3rem] p-10 border-white/20 animate-in-scale max-h-[90vh] overflow-y-auto custom-scrollbar">
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-indigo/10 flex items-center justify-center text-accent-indigo">
                    <Pencil size={20} />
                  </div>
                  <h2 className="font-syne text-3xl font-black text-white tracking-tighter uppercase">Refine Profile</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/30 hover:text-white"><X size={24} /></button>
             </div>

             <form onSubmit={handleModalSave} className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Display Identity</label>
                      <input type="text" defaultValue={user.name} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-accent-purple/50 focus:bg-white/[0.08] transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Digital Handle</label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-accent-purple font-black">@</span>
                        <input type="text" defaultValue={user.username.replace('@', '')} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white font-bold outline-none focus:border-accent-purple/50 focus:bg-white/[0.08] transition-all" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Artifact Bio</label>
                      <textarea defaultValue={user.bio} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-medium outline-none focus:border-accent-purple/50 focus:bg-white/[0.08] transition-all h-32 resize-none leading-relaxed" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Geo Tag</label>
                      <div className="relative">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-accent-indigo" size={18} />
                        <input type="text" defaultValue="Mumbai, India" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white font-bold outline-none focus:border-accent-purple/50 focus:bg-white/[0.08] transition-all" />
                      </div>
                   </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full glass-button !bg-accent-purple !border-none !py-5 !rounded-2xl !text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-2xl shadow-accent-purple/30 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Sync Artifacts
                  </button>
                  <p className="text-center text-[10px] text-white/20 mt-4 font-bold uppercase tracking-widest">Global changes will propagate in 2ms</p>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
