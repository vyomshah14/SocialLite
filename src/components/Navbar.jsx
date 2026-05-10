import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, Users, MessageCircle, Bell, User, LogOut, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ user, unreadNotifications }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: '/feed', icon: Home, label: 'Feed' },
    { path: '/search', icon: Search, label: 'Explore' },
    { path: '/friends', icon: Users, label: 'Squad' },
    { path: '/messages', icon: MessageCircle, label: 'Chats' },
    { path: '/notifications', icon: Bell, label: 'Activity' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-5xl h-16 glass-card px-6 flex items-center justify-between border-white/20 shadow-purple-500/10">
      {/* Left: Logo */}
      <NavLink to="/feed" className="shrink-0 flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-indigo flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-accent-purple/30">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="font-syne text-xl font-black tracking-tighter neon-text">
          SocialLite
        </span>
      </NavLink>

      {/* Center: Nav Links */}
      <div className="hidden md:flex items-center gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `px-4 py-2 rounded-xl flex items-center gap-2 group transition-all duration-300 ${
                isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold font-syne tracking-tight">{item.label}</span>
            {item.path === '/notifications' && unreadNotifications > 0 && (
              <span className="min-w-4 h-4 px-1 rounded-full bg-accent-pink text-[9px] font-black text-white flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* User Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all ${showDropdown ? 'border-accent-purple/50 bg-white/10' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${user.gradient} flex items-center justify-center text-[10px] font-bold text-white border border-white/20`}>
              {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full object-cover" /> : user.initials}
            </div>
            <span className="hidden sm:block text-xs font-bold text-white/90">{user.name.split(' ')[0]}</span>
          </button>

          {showDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
              <div className="absolute top-full right-0 mt-3 w-56 glass-card !rounded-2xl p-2 border-white/20 animate-in-scale">
                <div className="px-4 py-3 mb-1">
                  <p className="text-xs font-bold text-white">{user.name}</p>
                  <p className="text-[10px] text-slate-500">{user.username}</p>
                </div>
                <div className="h-px bg-white/5 mx-2" />
                <button 
                  onClick={() => { navigate('/profile'); setShowDropdown(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <User size={16} className="text-accent-indigo" /> View Profile
                </button>
                <button 
                  onClick={() => { console.log('Logout'); setShowDropdown(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
