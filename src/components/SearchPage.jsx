import { useState, useRef } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import PostCard from './PostCard';

const dummyPosts = [
  {
    id: 1,
    user: { name: 'Sarah Connor', username: '@sarah.design', initials: 'SC', gradient: 'from-pink-500 to-rose-500' },
    content: "Just published a new article about Bento Grid layouts in modern UI design. It's fascinating how we can organize complex data in such a clean way.",
    timestamp: '2h ago',
    likes: 1240,
    comments: 48,
    liked: false,
  },
  {
    id: 2,
    user: { name: 'Liam Wilson', username: '@liamw_dev', initials: 'LW', gradient: 'from-emerald-500 to-teal-500' },
    content: "Mastering React hooks changed my entire frontend workflow. Coding has never been this efficient! 🚀 #react #coding",
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    timestamp: '4h ago',
    likes: 856,
    comments: 32,
    liked: false,
  },
  {
    id: 3,
    user: { name: 'Elena Vance', username: '@elena_v', initials: 'EV', gradient: 'from-purple-500 to-indigo-500' },
    content: "The beauty of Tailwind CSS is its utility-first approach. You can build entire design systems without leaving your HTML.",
    timestamp: '6h ago',
    likes: 2100,
    comments: 156,
    liked: false,
  },
  {
    id: 4,
    user: { name: 'Mika Chen', username: '@mika_codes', initials: 'MC', gradient: 'from-orange-500 to-amber-500' },
    content: "Building high-fidelity UI requires attention to detail. Every pixel matters! #uiux #design",
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    timestamp: '12h ago',
    likes: 420,
    comments: 12,
    liked: false,
  },
  {
    id: 5,
    user: { name: 'Jordan Smith', username: '@jsmith', initials: 'JS', gradient: 'from-blue-500 to-indigo-500' },
    content: "Working on a new bento-style dashboard for a crypto project. The layout is coming along nicely! #bento #webdev",
    timestamp: '1d ago',
    likes: 310,
    comments: 8,
    liked: false,
  },
  {
    id: 6,
    user: { name: 'Aisha Patel', username: '@aishapatel', initials: 'AP', gradient: 'from-pink-500 to-rose-500' },
    content: "Coding with coffee is my favorite type of meditation. ☕💻 #coding #webdev",
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    timestamp: '2d ago',
    likes: 980,
    comments: 45,
    liked: false,
  }
];

const peopleData = [
  { name: "Elena Vance", handle: "@elenavance", gradient: "from-green-500 to-teal-500", initials: "EV", mutuals: 12 },
  { name: "Mika Chen", handle: "@mikachen", gradient: "from-orange-500 to-red-500", initials: "MC", mutuals: 8 },
  { name: "Jordan Smith", handle: "@jordansmith", gradient: "from-blue-500 to-indigo-500", initials: "JS", mutuals: 5 },
  { name: "Aisha Patel", handle: "@aishapatel", gradient: "from-pink-500 to-rose-500", initials: "AP", mutuals: 15 },
  { name: "Liam Wilson", handle: "@liamwilson", gradient: "from-cyan-500 to-blue-500", initials: "LW", mutuals: 20 },
];

const TrendingCard = ({ tag, count, gradient, size, index, onClick }) => {
  return (
    <div 
      onClick={() => onClick(tag)}
      className={`${size} ${gradient} rounded-3xl p-5 cursor-pointer relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-in zoom-in-95 fade-in duration-500`}
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
    >
      <div className="absolute top-2 right-4 text-white/10 text-5xl font-black group-hover:text-white/20 transition-colors pointer-events-none">#</div>
      <div className="relative z-10 flex flex-col justify-end h-full">
        <h3 className={`${size.includes('text-2xl') ? 'text-2xl' : 'text-xl'} font-bold text-white tracking-tight`}>{tag}</h3>
        <p className="text-white/40 text-xs mt-1 font-medium">{count} posts</p>
      </div>
    </div>
  );
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  const [recentSearches] = useState(["bento grid", "react hooks", "ui design"]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() 
            ? <span key={i} className="bg-yellow-400/20 text-yellow-300 rounded px-0.5">{part}</span> 
            : part
        )}
      </span>
    );
  };

  const filteredPosts = dummyPosts.filter(post => 
    post.content.toLowerCase().includes(query.toLowerCase()) || 
    post.user.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPeople = peopleData.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.handle.toLowerCase().includes(query.toLowerCase())
  );

  const trendingTags = [
    { tag: "#design", count: "2.4k", gradient: "bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/20", size: "col-span-2 row-span-1" },
    { tag: "#react", count: "1.8k", gradient: "bg-gradient-to-br from-cyan-900/60 to-blue-900/60 border border-cyan-500/20", size: "col-span-1 row-span-2" },
    { tag: "#uiux", count: "956", gradient: "bg-gradient-to-br from-pink-900/60 to-rose-900/60 border border-pink-500/20", size: "col-span-1 row-span-1" },
    { tag: "#webdev", count: "743", gradient: "bg-gradient-to-br from-green-900/60 to-teal-900/60 border border-green-500/20", size: "col-span-1 row-span-1" },
    { tag: "#coding", count: "621", gradient: "bg-gradient-to-br from-orange-900/60 to-amber-900/60 border border-orange-500/20", size: "col-span-1 row-span-1" },
    { tag: "#tailwind", count: "512", gradient: "bg-gradient-to-br from-sky-900/60 to-blue-900/60 border border-sky-500/20", size: "col-span-1 row-span-1" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 min-h-screen bg-[#0a0a0f]">
      
      {/* Header & Search Bar */}
      <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="font-syne text-4xl font-extrabold text-white mb-2 tracking-tight">Search the Network</h1>
        <p className="text-white/40 text-sm font-medium mb-8">Discover posts, people & tags</p>
        
        <div className={`relative max-w-2xl mx-auto transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40">
            <Search size={20} />
          </div>
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search posts, people, tags..."
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-12 text-white placeholder-white/20 focus:bg-white/[0.08] focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all shadow-2xl"
          />
          {!query && !isFocused && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 text-[10px] font-bold border border-white/10 rounded px-1.5 py-0.5 tracking-tighter">
              ⌘K
            </div>
          )}
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {query && (
          <div className="flex gap-1 bg-white/5 rounded-2xl p-1 w-fit mx-auto mt-6 border border-white/5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
            {['posts', 'people', 'tags'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-300 ${
                  activeTab === tab ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-white/40 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {!query ? (
        <div className="space-y-12">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-100 fill-mode-forwards opacity-0">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-3">Recent</h4>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button 
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all group"
                  >
                    <Clock size={12} className="text-white/20 group-hover:text-purple-400 transition-colors" />
                    {term}
                    <X size={12} className="text-white/10 hover:text-rose-500 transition-colors ml-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Bento Grid */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-forwards opacity-0">
            <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="text-xl">🔥</span> Trending Now
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[140px]">
              {trendingTags.map((tag, idx) => (
                <TrendingCard 
                  key={tag.tag} 
                  {...tag} 
                  index={idx} 
                  onClick={(val) => setQuery(val)} 
                />
              ))}
            </div>
          </div>

          {/* Suggested People */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-forwards opacity-0">
            <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="text-xl">👥</span> People to Follow
            </h4>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
              {peopleData.map((person, idx) => (
                <div 
                  key={person.handle}
                  className="w-44 shrink-0 bg-white/5 border border-white/10 rounded-[2rem] p-5 text-center hover:bg-white/[0.08] transition-all group animate-in zoom-in-95 fade-in duration-500"
                  style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${person.gradient} mx-auto flex items-center justify-center text-xl font-bold text-white shadow-xl group-hover:scale-105 transition-transform`}>
                    {person.initials}
                  </div>
                  <h5 className="font-bold text-white text-sm mt-4 tracking-tight">{person.name}</h5>
                  <p className="text-[11px] text-white/40 font-medium">{person.handle}</p>
                  <button className="w-full mt-5 bg-purple-600/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold rounded-full py-2 hover:bg-purple-600 hover:text-white transition-all">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div key={query} className="animate-in fade-in duration-500">
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, idx) => (
                  <PostCard 
                    key={post.id} 
                    post={{...post, content: highlightText(post.content, query)}} 
                    index={idx} 
                  />
                ))
              ) : (
                <EmptyResults query={query} />
              )}
            </div>
          )}

          {activeTab === 'people' && (
            <div className="space-y-3">
              {filteredPeople.length > 0 ? (
                filteredPeople.map((person) => (
                  <div key={person.handle} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-3xl p-4 hover:bg-white/[0.08] transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${person.gradient} flex items-center justify-center text-sm font-bold text-white shadow-lg group-hover:scale-105 transition-transform`}>
                        {person.initials}
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-[15px] tracking-tight">{person.name}</h5>
                        <p className="text-xs text-white/40 font-medium">{person.handle} • {person.mutuals} mutual friends</p>
                      </div>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold px-5 py-2 rounded-full shadow-lg shadow-purple-600/20 transition-all active:scale-95">
                      Follow
                    </button>
                  </div>
                ))
              ) : (
                <EmptyResults query={query} />
              )}
            </div>
          )}

          {activeTab === 'tags' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {trendingTags.filter(t => t.tag.includes(query.toLowerCase())).length > 0 ? (
                 trendingTags.filter(t => t.tag.includes(query.toLowerCase())).map((tag) => (
                    <div key={tag.tag} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/[0.08] transition-all group cursor-pointer">
                        <div>
                          <h4 className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">{tag.tag}</h4>
                          <p className="text-xs text-white/40 font-bold mt-1 uppercase tracking-widest">{tag.count} posts</p>
                        </div>
                        <div className="mt-8 flex items-center justify-between text-purple-400 font-bold text-xs uppercase tracking-widest">
                           <span>View posts</span>
                           <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                 ))
               ) : (
                <div className="col-span-2">
                  <EmptyResults query={query} />
                </div>
               )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyResults({ query }) {
  return (
    <div className="text-center py-20 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-6xl mb-6">🔍</div>
      <h3 className="text-xl font-bold text-white mb-2">No results for "{query}"</h3>
      <p className="text-white/40 text-sm font-medium">Try a different search term or check your spelling.</p>
    </div>
  );
}
