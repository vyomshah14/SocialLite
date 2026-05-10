import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Globe, Code, ArrowRight, User, Sparkles, Zap, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage({ onSetUserName }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    onSetUserName(name);
    // Simulate login with a slight delay for "GenZ" feel
    setTimeout(() => navigate('/feed'), 500);
  };

  return (
    <div className="min-h-screen bg-[#030305] flex items-center justify-center p-6 relative overflow-hidden font-inter selection:bg-accent-purple/30">
      {/* Premium Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent-purple/10 blur-[140px] rounded-full animate-float" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-indigo/10 blur-[140px] rounded-full animate-pulse-glow" />
      <div className="absolute inset-0 shimmer opacity-20 pointer-events-none" />
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] glass-card !rounded-[3.5rem] overflow-hidden border-white/10 shadow-2xl relative z-10 animate-in-scale">
        
        {/* Left Section: Immersive Branding */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-accent-purple/10 via-transparent to-transparent relative overflow-hidden text-white border-r border-white/5">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80')] opacity-[0.03] mix-blend-screen scale-110 group-hover:scale-125 transition-transform duration-[10s]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-indigo flex items-center justify-center shadow-2xl shadow-accent-purple/30 group hover:rotate-12 transition-all duration-500">
                <Sparkles size={24} className="text-white" />
              </div>
              <span className="font-syne text-3xl font-black tracking-tighter neon-text">SocialLite</span>
            </div>
            
            <h1 className="font-syne text-7xl font-black leading-[1] mb-8 tracking-tighter">
              The Digital <br />
              <span className="neon-text filter saturate-150">Artifact.</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-md leading-relaxed font-medium">
              A curated space for the next generation of curators, builders, and visionaries.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl glass-card !bg-white/5 flex items-center justify-center text-accent-cyan">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-widest">Instant Sync</p>
                  <p className="text-xs text-slate-500 font-bold">Global propagation in 2ms</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl glass-card !bg-white/5 flex items-center justify-center text-amber-400">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-widest">Premium Tiers</p>
                  <p className="text-xs text-slate-500 font-bold">Access exclusive artifacts</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Section: Auth Interface */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white/[0.01]">
          <div className="mb-12">
            <h2 className="font-syne text-4xl font-black text-white mb-3 tracking-tighter uppercase italic">
              {isLogin ? 'Initialize' : 'Authenticate'}
            </h2>
            <p className="text-slate-500 text-sm font-black uppercase tracking-[0.2em] ml-1">
              {isLogin ? 'Access the network vault' : 'Secure your digital identity'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent-purple transition-all duration-300">
                <User size={20} />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="YOUR NAME"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white font-bold placeholder-slate-700 focus:bg-white/[0.08] focus:border-accent-purple/50 outline-none transition-all uppercase tracking-widest text-xs"
              />
            </div>

            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent-indigo transition-all duration-300">
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                placeholder="VAULT EMAIL"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white font-bold placeholder-slate-700 focus:bg-white/[0.08] focus:border-accent-indigo/50 outline-none transition-all uppercase tracking-widest text-xs"
              />
            </div>

            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent-pink transition-all duration-300">
                <Lock size={20} />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="ACCESS KEY"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-14 py-5 text-white font-bold placeholder-slate-700 focus:bg-white/[0.08] focus:border-accent-pink/50 outline-none transition-all uppercase tracking-widest text-xs"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-[10px] font-black text-slate-500 hover:text-accent-purple uppercase tracking-[0.2em] transition-colors">
                  Lost Key?
                </button>
              </div>
            )}

            <button 
              type="submit"
              className="w-full glass-button !bg-accent-purple !border-none !py-5 !rounded-2xl !text-[11px] font-black uppercase tracking-[0.4em] text-white shadow-2xl shadow-accent-purple/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              {isLogin ? 'Enter Vault' : 'Sync Identity'}
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <div className="mt-12 flex items-center gap-6">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">Integrations</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 glass-card !bg-white/5 !py-4 !rounded-2xl border-white/10 hover:!border-white/30 transition-all text-[10px] font-black uppercase tracking-widest text-white">
              <Globe size={18} className="text-accent-cyan" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 glass-card !bg-white/5 !py-4 !rounded-2xl border-white/10 hover:!border-white/30 transition-all text-[10px] font-black uppercase tracking-widest text-white">
              <Code size={18} className="text-accent-pink" /> GitHub
            </button>
          </div>

          <p className="mt-12 text-center text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
            {isLogin ? "No identity yet?" : "Already synced?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-3 text-accent-purple hover:text-white transition-colors"
            >
              {isLogin ? 'Create One' : 'Authorize'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
