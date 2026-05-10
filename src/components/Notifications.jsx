import { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  UserPlus, 
  TrendingUp, 
  Eye, 
  Edit3, 
  Users 
} from 'lucide-react';

const NotificationItem = ({ notif, onRead, index }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'like': return <Heart size={10} className="text-white" fill="currentColor" />;
      case 'comment': return <MessageCircle size={10} className="text-white" fill="currentColor" />;
      case 'friend': return <UserPlus size={10} className="text-white" />;
      default: return null;
    }
  };

  const getBadgeBg = (type) => {
    switch (type) {
      case 'like': return 'bg-red-500';
      case 'comment': return 'bg-blue-500';
      case 'friend': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      onClick={() => onRead(notif.id)}
      className={`group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-2 ${
        notif.unread 
        ? 'bg-white/[0.07] border-white/10 border-l-purple-500 border-l-2' 
        : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100'
      } hover:bg-white/[0.08] mb-2`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative shrink-0">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${notif.user.gradient} flex items-center justify-center text-sm font-bold text-white shadow-lg group-hover:scale-105 transition-transform`}>
          {notif.user.initials || notif.user.name.charAt(0)}
        </div>
        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center shadow-lg ${getBadgeBg(notif.type)}`}>
          {getIcon(notif.type)}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/60 leading-snug">
          <span className="font-bold text-white">{notif.user.name}</span> {notif.action}
        </p>
        {notif.comment && (
          <p className="text-xs text-white/40 italic mt-1 font-medium leading-relaxed">
            "{notif.comment}"
          </p>
        )}
        <p className="text-[10px] text-white/30 mt-1.5 font-bold uppercase tracking-widest">{notif.time}</p>
      </div>

      <div className="shrink-0">
        {notif.type === 'friend' && notif.unread ? (
          <div className="flex gap-2" onClick={e => e.stopPropagation()}>
            <button className="bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all shadow-lg shadow-purple-600/20 active:scale-95">Accept</button>
            <button className="bg-white/5 hover:bg-white/10 text-white/40 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/5 transition-all">Decline</button>
          </div>
        ) : notif.hasThumb ? (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-white/5 overflow-hidden group-hover:border-purple-500/30 transition-colors">
            <div className="w-full h-full bg-white/5 flex items-center justify-center text-[10px] text-white/20 font-bold">POST</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ActivityBar = ({ day, height, isToday, index }) => {
  const [h, setH] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setH(height), 100 + (index * 50));
    return () => clearTimeout(timer);
  }, [height, index]);

  return (
    <div className="flex flex-col items-center gap-2 group flex-1">
      <div className="relative w-full flex justify-center items-end h-20">
        <div 
          className={`w-6 rounded-t-md bg-gradient-to-t from-purple-600 to-indigo-400 transition-all duration-700 ease-out group-hover:from-purple-500 group-hover:to-indigo-300 relative ${isToday ? 'brightness-125' : ''}`}
          style={{ height: `${h}%` }}
        >
          {isToday && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />}
        </div>
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-tighter ${isToday ? 'text-purple-400' : 'text-white/30'}`}>{day}</span>
    </div>
  );
};

export default function NotificationPanel() {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'like', unread: true, user: { name: 'Sarah Connor', initials: 'SC', gradient: 'from-pink-500 to-rose-600' }, action: 'liked your post', time: '2 min ago', hasThumb: true },
    { id: 2, type: 'comment', unread: true, user: { name: 'Liam Wilson', initials: 'LW', gradient: 'from-teal-500 to-cyan-600' }, action: 'commented on your post', comment: 'This layout is fire! 🔥', time: '15 min ago', hasThumb: true },
    { id: 3, type: 'friend', unread: true, user: { name: 'Jordan Smith', initials: 'JS', gradient: 'from-blue-500 to-indigo-600' }, action: 'sent you a friend request', time: '1h ago', hasThumb: false },
    { id: 4, type: 'like', unread: true, user: { name: 'Priya Sharma', initials: 'PS', gradient: 'from-violet-500 to-purple-600' }, action: 'liked your post', time: '2h ago', hasThumb: true },
    { id: 5, type: 'friend', unread: false, user: { name: 'Elena Vance', initials: 'EV', gradient: 'from-green-500 to-emerald-600' }, action: 'accepted your friend request', time: '3h ago', hasThumb: false },
    { id: 6, type: 'like', unread: false, user: { name: 'Mika Chen', initials: 'MC', gradient: 'from-orange-500 to-red-500' }, action: 'liked your post', time: '5h ago', hasThumb: true },
    { id: 7, type: 'comment', unread: false, user: { name: 'Noah Kim', initials: 'NK', gradient: 'from-purple-500 to-violet-600' }, action: 'commented on your post', comment: 'Amazing work! 🙌', time: 'Yesterday', hasThumb: true },
    { id: 8, type: 'friend', unread: false, user: { name: 'Aisha Patel', initials: 'AP', gradient: 'from-pink-500 to-fuchsia-600' }, action: 'sent you a friend request', time: '2 days ago', hasThumb: false },
  ]);

  const handleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const filtered = notifications.filter(n => {
    if (activeTab === 'likes') return n.type === 'like';
    if (activeTab === 'comments') return n.type === 'comment';
    if (activeTab === 'friends') return n.type === 'friend';
    return true;
  });

  const unreadItems = filtered.filter(n => n.unread);
  const earlierItems = filtered.filter(n => !n.unread);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 min-h-screen bg-[#0a0a0f]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-in fade-in duration-700">
        <div>
          <h1 className="font-syne text-4xl font-extrabold text-white tracking-tight">Notifications</h1>
          <p className="text-white/40 text-sm font-medium mt-1">Stay up to date with your activity</p>
        </div>
        <button 
          onClick={handleMarkAllRead}
          className="w-fit text-purple-400 text-xs font-bold border border-purple-500/30 rounded-xl px-5 py-2.5 hover:bg-purple-500/10 transition-all active:scale-95 shadow-lg shadow-purple-900/5"
        >
          Mark all read
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        
        {/* Left Column: Notifications List */}
        <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-100 fill-mode-forwards opacity-0">
          
          {/* Tab Filter */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-1.5 flex gap-1 w-fit mb-8 backdrop-blur-xl">
            {['all', 'likes', 'comments', 'friends'].map((tab) => {
              const count = tab === 'all' ? 8 : (tab === 'likes' ? 3 : (tab === 'comments' ? 2 : 3)); // Hardcoded per prompt
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold capitalize transition-all flex items-center ${
                    activeTab === tab ? 'bg-purple-600 text-white shadow-lg' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {tab}
                  <span className={`text-[10px] ml-2 px-1.5 rounded-full ${activeTab === tab ? 'bg-white/20' : 'bg-white/10'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div key={activeTab} className="space-y-8 animate-in fade-in duration-500">
            {unreadItems.length > 0 && (
              <div>
                <h4 className="text-[10px] font-black tracking-[0.25em] text-white/30 mb-4 px-1 uppercase">New</h4>
                {unreadItems.map((n, idx) => (
                  <NotificationItem key={n.id} notif={n} onRead={handleRead} index={idx} />
                ))}
              </div>
            )}

            {earlierItems.length > 0 && (
              <div>
                <h4 className="text-[10px] font-black tracking-[0.25em] text-white/30 mb-4 px-1 uppercase mt-8">Earlier</h4>
                {earlierItems.map((n, idx) => (
                  <NotificationItem key={n.id} notif={n} onRead={handleRead} index={idx + unreadItems.length} />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="py-24 text-center bg-white/5 border border-white/10 rounded-3xl border-dashed">
                <div className="text-5xl mb-4">
                  {activeTab === 'likes' ? '💔' : activeTab === 'comments' ? '💬' : '👥'}
                </div>
                <h4 className="text-white font-bold text-lg capitalize">No {activeTab} notifications yet</h4>
                <p className="text-white/30 text-sm mt-1">Check back later for new activity.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-forwards opacity-0">
          
          {/* Summary Card */}
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl hover:bg-white/[0.08] transition-all group">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-6">This Week</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Heart size={16} className="text-rose-400" />
                  <span className="text-sm font-medium text-white/70">Likes received</span>
                </div>
                <span className="font-bold text-white text-lg">24</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-sky-400" />
                  <span className="text-sm font-medium text-white/70">Comments</span>
                </div>
                <span className="font-bold text-white text-lg">7</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-3">
                  <UserPlus size={16} className="text-emerald-400" />
                  <span className="text-sm font-medium text-white/70">New friends</span>
                </div>
                <span className="font-bold text-white text-lg">3</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 bg-green-500/10 text-green-400 text-[11px] font-bold px-3 py-1.5 rounded-full w-fit group-hover:scale-105 transition-transform">
              <TrendingUp size={14} />
              ↑ 12% from last week
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-6">Daily Activity</h3>
            <div className="flex items-end justify-between gap-2 h-24 px-1">
              {[
                { d: 'Mon', h: 30 }, { d: 'Tue', h: 50 }, { d: 'Wed', h: 40 }, 
                { d: 'Thu', h: 80 }, { d: 'Fri', h: 60 }, { d: 'Sat', h: 90, today: true }, 
                { d: 'Sun', h: 45 }
              ].map((bar, i) => (
                <ActivityBar key={bar.d} day={bar.d} height={bar.h} isToday={bar.today} index={i} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 text-white/60 hover:text-white transition-all text-sm font-medium">
                <Eye size={18} className="text-white/20" /> View your posts
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 text-white/60 hover:text-white transition-all text-sm font-medium">
                <Edit3 size={18} className="text-white/20" /> Update your status
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 text-white/60 hover:text-white transition-all text-sm font-medium">
                <Users size={18} className="text-white/20" /> Find friends
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
