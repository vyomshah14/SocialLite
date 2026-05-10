import { NavLink } from 'react-router-dom';
import { Home, Search, Users, MessageCircle, Bell, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MobileTabs({ unreadNotifications, unreadMessages }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleFocus = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setIsVisible(false);
      }
    };
    const handleBlur = () => setIsVisible(true);

    window.addEventListener('focusin', handleFocus);
    window.addEventListener('focusout', handleBlur);
    
    return () => {
      window.removeEventListener('focusin', handleFocus);
      window.removeEventListener('focusout', handleBlur);
    };
  }, []);

  const tabs = [
    { path: '/feed', icon: Home, label: 'Feed' },
    { path: '/search', icon: Search, label: 'Explore' },
    { path: '/friends', icon: Users, label: 'Squad' },
    { path: '/messages', icon: MessageCircle, label: 'Chats', badge: unreadMessages > 0 },
    { path: '/notifications', icon: Bell, label: 'Alerts', badge: unreadNotifications > 0 },
    { path: '/profile', icon: User, label: 'Me' },
  ];

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
      <div className="glass-card !rounded-[2rem] h-16 flex justify-around items-center px-4 border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center flex-1 h-full relative transition-all duration-300 active:scale-75 ${
                isActive ? 'text-accent-purple' : 'text-slate-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <tab.icon 
                    size={22} 
                    className={`transition-all duration-500 ${
                      isActive ? 'filter drop-shadow-[0_0_10px_rgba(124,58,237,0.8)] scale-110' : ''
                    }`} 
                  />
                  
                  {/* Badge */}
                  {tab.badge && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-pink border-2 border-[#030305] rounded-full shadow-lg animate-pulse" />
                  )}
                </div>

                {/* Glow bar for active tab */}
                {isActive && (
                  <div className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-accent-purple shadow-[0_0_15px_rgba(124,58,237,1)]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
