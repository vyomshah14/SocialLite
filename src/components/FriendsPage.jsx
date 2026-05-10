import { useState } from 'react';
import { Users, Wifi, UserPlus, MessageCircle, Trash2 } from 'lucide-react';

const RequestCard = ({ request, onAccept, onDecline }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [direction, setDirection] = useState('');

  const handleAction = (type) => {
    setIsRemoving(true);
    setDirection(type === 'accept' ? 'scale-95 opacity-0' : 'translate-x-[100%] opacity-0');
    setTimeout(() => {
      if (type === 'accept') onAccept(request.id);
      else onDecline(request.id);
    }, 300);
  };

  return (
    <div className={`bg-white/5 border border-white/10 rounded-3xl p-5 transition-all duration-300 ${isRemoving ? direction : 'hover:border-white/20 hover:bg-white/[0.08]'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${request.gradient} flex items-center justify-center text-xl font-bold text-white shadow-xl`}>
          {request.initials || request.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-white tracking-tight">{request.name}</h4>
          <p className="text-xs text-white/40 font-medium">{request.handle}</p>
        </div>
      </div>
      
      <p className="text-[11px] text-white/30 font-medium mt-3 flex items-center gap-1.5">
        <Users size={12} /> {request.mutual} mutual friends
      </p>

      <div className="flex gap-2 mt-5">
        <button 
          onClick={() => handleAction('accept')}
          className="flex-1 bg-purple-600 hover:bg-purple-500 text-white rounded-xl py-2.5 text-xs font-bold transition-all shadow-lg shadow-purple-600/20 active:scale-95"
        >
          Accept
        </button>
        <button 
          onClick={() => handleAction('decline')}
          className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 rounded-xl py-2.5 text-xs font-bold transition-all active:scale-95"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

const FriendCard = ({ friend, onRemove, onMessage }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-4 transition-all duration-300 hover:border-white/20 hover:scale-[1.01] hover:bg-white/[0.08] group">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${friend.gradient} flex items-center justify-center text-sm font-bold text-white shadow-lg transition-transform group-hover:scale-105 ${friend.online ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-[#0a0a0f]' : 'ring-2 ring-white/10'}`}>
            {friend.initials || friend.name.charAt(0)}
          </div>
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-[#0a0a0f] rounded-full ${friend.online ? 'bg-green-500' : 'bg-slate-500'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-[13px] truncate tracking-tight">{friend.name}</h4>
          <p className="text-[10px] text-white/40 truncate font-medium">{friend.handle}</p>
          <p className={`text-[9px] font-bold tracking-wider mt-0.5 uppercase ${friend.online ? 'text-green-400' : 'text-white/30'}`}>
            {friend.online ? 'ONLINE' : friend.lastActive || 'OFFLINE'}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white/30 flex items-center gap-1 font-medium"><Users size={11} /> {friend.mutual} mutual</span>
          <span className="text-white/20 font-bold uppercase tracking-tighter">{friend.lastMsg}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => onMessage(friend.id)}
          className="flex-1 bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:border-purple-500/30 text-white/60 hover:text-purple-400 rounded-xl py-2 text-[10px] font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <MessageCircle size={14} /> Message
        </button>
        <div className="relative group/tooltip">
          <button 
            onClick={() => onRemove(friend.id)}
            className="bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 text-white/30 hover:text-red-400 rounded-xl p-2 transition-all"
          >
            <Trash2 size={14} />
          </button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-red-500 text-white text-[9px] font-bold rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Remove friend?
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [requests, setRequests] = useState([
    { id: 1, name: "Jordan Smith", handle: "@jordansmith", mutual: 5, gradient: "from-blue-500 to-indigo-600", initials: "JS" },
    { id: 2, name: "Priya Sharma", handle: "@priyasharma", mutual: 3, gradient: "from-pink-500 to-rose-600", initials: "PS" },
    { id: 3, name: "Carlos Rivera", handle: "@carlosrivera", mutual: 8, gradient: "from-orange-500 to-amber-600", initials: "CR" },
  ]);

  const [friends, setFriends] = useState([
    { id: 101, name: "Aisha Patel", handle: "@aisha.dev", online: true, mutual: 6, gradient: "from-pink-500 to-rose-600", lastMsg: "today", initials: "AP" },
    { id: 102, name: "Liam Wilson", handle: "@liamwilson", online: false, mutual: 4, gradient: "from-teal-500 to-cyan-600", lastMsg: "2 days ago", lastActive: "Active 2h ago", initials: "LW" },
    { id: 103, name: "Elena Vance", handle: "@elenavance", online: true, mutual: 12, gradient: "from-green-500 to-emerald-600", lastMsg: "yesterday", initials: "EV" },
    { id: 104, name: "Mika Chen", handle: "@mikachen", online: false, mutual: 8, gradient: "from-orange-500 to-red-500", lastMsg: "1 week ago", initials: "MC" },
    { id: 105, name: "Noah Kim", handle: "@noahkim", online: true, mutual: 2, gradient: "from-purple-500 to-violet-600", lastMsg: "3 days ago", initials: "NK" },
  ]);

  const [toast, setToast] = useState(null);

  const handleAccept = (id) => {
    const request = requests.find(r => r.id === id);
    setRequests(prev => prev.filter(r => r.id !== id));
    if (request) {
      setFriends(prev => [{ ...request, id: Date.now(), online: Math.random() > 0.5, lastMsg: 'Just now' }, ...prev]);
      setToast('Friend added! ✓');
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleDecline = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleRemoveFriend = (id) => {
    setFriends(prev => prev.filter(f => f.id !== id));
  };

  const filteredFriends = friends.filter(f => {
    if (activeTab === 'online') return f.online;
    if (activeTab === 'recent') return f.lastMsg.includes('today') || f.lastMsg.includes('yesterday');
    return true;
  });

  const suggestions = [
    { name: "Sophie Turner", handle: "@sophie", mutual: 14, gradient: "from-rose-500 to-pink-600", initials: "ST" },
    { name: "John Doe", handle: "@jdoe", mutual: 7, gradient: "from-blue-500 to-indigo-600", initials: "JD" },
    { name: "Emma Watson", handle: "@emma", mutual: 11, gradient: "from-emerald-500 to-teal-600", initials: "EW" },
    { name: "Will Smith", handle: "@will", mutual: 9, gradient: "from-orange-500 to-amber-600", initials: "WS" },
    { name: "Lady Gaga", handle: "@gaga", mutual: 24, gradient: "from-purple-500 to-fuchsia-600", initials: "LG" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-12 bg-[#0a0a0f] min-h-screen">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl animate-in slide-in-from-right-8 duration-300">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="font-syne text-4xl font-extrabold text-white tracking-tight">Your Circle</h1>
          <p className="text-white/40 text-sm font-medium mt-1">Manage your connections and stay in touch.</p>
        </div>
        <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/5 backdrop-blur-xl">
          {['all', 'online', 'recent'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-purple-600 text-white shadow-lg' : 'text-white/40 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bento Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-forwards opacity-0">
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.08] transition-all group">
          <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users size={20} />
          </div>
          <p className="text-3xl font-black text-white">{friends.length}</p>
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-1">Total Friends</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.08] transition-all group relative overflow-hidden">
          <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Wifi size={20} />
          </div>
          <div className="absolute top-6 right-6 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
          <p className="text-3xl font-black text-white">{friends.filter(f => f.online).length}</p>
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-1">Online Now</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.08] transition-all group">
          <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UserPlus size={20} />
          </div>
          <p className="text-3xl font-black text-white">{requests.length}</p>
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-1">Pending Requests</p>
        </div>
      </div>

      {/* Requests Section */}
      {requests.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-forwards opacity-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Friend Requests</h3>
            <span className="bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{requests.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {requests.map((req) => (
              <RequestCard 
                key={req.id} 
                request={req} 
                onAccept={handleAccept} 
                onDecline={handleDecline} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Friends Grid */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-forwards opacity-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Friends</h3>
        </div>
        {filteredFriends.length > 0 ? (
          <div key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-500">
            {filteredFriends.map((friend) => (
              <FriendCard 
                key={friend.id} 
                friend={friend} 
                onRemove={handleRemoveFriend}
                onMessage={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-[2rem] border-dashed">
             <div className="text-4xl mb-4">👥</div>
             <p className="text-white/40 font-medium text-sm">No friends match the "{activeTab}" filter.</p>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 fill-mode-forwards opacity-0">
        <h3 className="text-lg font-bold text-white mb-6">People You May Know</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
          {suggestions.map((person, idx) => (
            <div 
              key={person.handle}
              className="w-48 shrink-0 bg-white/5 border border-white/10 rounded-[2rem] p-5 text-center hover:bg-white/[0.08] transition-all group animate-in zoom-in-95 fade-in duration-500"
              style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${person.gradient} mx-auto flex items-center justify-center text-xl font-bold text-white shadow-xl group-hover:scale-105 transition-transform`}>
                {person.initials}
              </div>
              <h5 className="font-bold text-white text-sm mt-4 tracking-tight">{person.name}</h5>
              <p className="text-[11px] text-white/40 font-medium">{person.handle}</p>
              <p className="text-[10px] text-white/20 font-bold mt-2 flex items-center justify-center gap-1">
                <Users size={12} /> {person.mutual} mutual
              </p>
              <button className="w-full mt-5 bg-purple-600/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold rounded-full py-2 hover:bg-purple-600 hover:text-white transition-all">
                Add Friend
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
