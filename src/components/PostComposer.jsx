import { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, Smile, MapPin, Sparkles, Plus, X } from 'lucide-react';

export default function PostComposer({ onPost, user }) {
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageName, setImageName] = useState('');
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !imagePreview) return;

    const newPost = {
      id: Date.now(),
      user: user,
      content: content,
      image: imagePreview,
      imageName,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      commentItems: [],
      liked: false,
    };

    onPost(newPost);
    setContent('');
    setImagePreview('');
    setImageName('');
  };

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setImageName(file.name);
    event.target.value = '';
  };

  return (
    <div className="glass-card border-none !bg-white/[0.02] p-6 shadow-none">
      <div className="flex gap-5">
        <div className={`w-12 h-12 rounded-[1.25rem] bg-gradient-to-br ${user.gradient} flex items-center justify-center text-sm font-black text-white shadow-xl shrink-0 group hover:rotate-6 transition-all duration-500`}>
          {user.initials}
        </div>
        <div className="flex-1 pt-1">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Drop some heat, ${user.name.split(' ')[0]}...`}
            className="w-full bg-transparent border-none outline-none text-white/90 placeholder-white/20 text-lg font-syne font-bold resize-none min-h-[56px] py-1 leading-tight focus:placeholder-white/40 transition-all"
          />
        </div>
      </div>

      <div className="mt-4 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 text-slate-400 hover:text-accent-cyan hover:bg-accent-cyan/10 transition-all group"
          >
            <ImageIcon size={20} className="transition-transform group-hover:scale-110" />
          </button>
          <button type="button" className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 text-slate-400 hover:text-accent-pink hover:bg-accent-pink/10 transition-all group">
            <Smile size={20} className="transition-transform group-hover:scale-110" />
          </button>
          <button type="button" className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 text-slate-400 hover:text-accent-purple hover:bg-accent-purple/10 transition-all group">
            <MapPin size={20} className="transition-transform group-hover:scale-110" />
          </button>
          <div className="w-px h-6 bg-white/5 mx-1" />
          <button type="button" className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 transition-all group">
            <Sparkles size={18} className="transition-transform group-hover:scale-110" />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!content.trim() && !imagePreview}
          className="glass-button !bg-accent-purple/20 !border-accent-purple/30 !text-accent-purple hover:!bg-accent-purple hover:!text-white disabled:!opacity-20 disabled:!bg-white/5 disabled:!text-white/20 flex items-center gap-2 pr-5"
        >
          <div className="w-6 h-6 rounded-lg bg-accent-purple/20 flex items-center justify-center">
            <Plus size={14} className="stroke-[3]" />
          </div>
          Create
        </button>
      </div>

      {imagePreview && (
        <div className="mt-4 rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] relative group">
          <img src={imagePreview} alt={imageName || 'Selected upload'} className="w-full max-h-80 object-cover" />
          <button
            type="button"
            onClick={() => {
              URL.revokeObjectURL(imagePreview);
              setImagePreview('');
              setImageName('');
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-2xl bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-rose-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
