import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical, 
  CheckCheck, 
  PencilLine, 
  MessageCircle,
  ChevronLeft,
  Search
} from 'lucide-react';

const ConversationItem = ({ chat, isActive, onClick, index }) => (
  <div 
    onClick={onClick}
    className={`mx-2 mb-1 px-3 py-3 rounded-2xl cursor-pointer flex items-center gap-3 transition-all group animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-forwards opacity-0 ${
      isActive 
      ? 'bg-purple-600/15 border border-purple-500/20 shadow-lg shadow-purple-900/5' 
      : 'bg-transparent hover:bg-white/5 border border-transparent'
    }`}
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <div className="relative shrink-0">
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${chat.gradient} flex items-center justify-center text-sm font-bold text-white shadow-xl transition-transform group-hover:scale-105`}>
        {chat.initials}
      </div>
      {chat.online && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#0f0f17] rounded-full" />
      )}
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline mb-0.5">
        <h4 className={`text-sm truncate tracking-tight transition-colors ${
          chat.unread > 0 ? 'text-white font-bold' : 'text-white/70 font-medium'
        }`}>
          {chat.name}
        </h4>
        <span className="text-[10px] text-white/30 font-bold uppercase tracking-tighter shrink-0">{chat.timestamp}</span>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p className="text-xs text-white/40 truncate font-medium">{chat.lastMessage}</p>
        {chat.unread > 0 && (
          <span className="bg-purple-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            {chat.unread}
          </span>
        )}
      </div>
    </div>
  </div>
);

const MessageBubble = ({ message, isSent, isLastInGroup, showAvatar }) => (
  <div className={`flex w-full group ${isSent ? 'justify-end' : 'justify-start'} ${isLastInGroup ? 'mb-4' : 'mb-1'}`}>
    {!isSent && (
      <div className="w-10 flex-shrink-0 flex items-end pb-1">
        {showAvatar && (
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${message.user.gradient} flex items-center justify-center text-[10px] font-bold text-white shadow-lg`}>
            {message.user.initials}
          </div>
        )}
      </div>
    )}
    
    <div className={`flex flex-col ${isSent ? 'items-end' : 'items-start'} max-w-[75%] md:max-w-[65%]`}>
      <div className="relative">
        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-xl backdrop-blur-md transition-all group-hover:translate-y-[-2px] ${
          isSent 
          ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-tr-sm font-medium' 
          : 'bg-white/10 border border-white/5 text-white/90 rounded-tl-sm'
        }`}>
          {message.content}
        </div>
        
        {/* Reaction Bar */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto z-10">
          <div className="bg-[#1a1a2e]/90 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1 flex gap-1.5 shadow-2xl">
            {['😂', '❤️', '👍', '😮', '😢', '🔥'].map(emoji => (
              <button key={emoji} className="text-sm hover:scale-150 transition-transform p-1">{emoji}</button>
            ))}
          </div>
        </div>
      </div>

      {isLastInGroup && (
        <div className={`flex items-center gap-1.5 mt-1.5 ${isSent ? 'justify-end' : 'ml-10'}`}>
          <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">{message.time}</span>
          {isSent && (
            <CheckCheck size={12} className={message.read ? 'text-blue-400' : 'text-white/30'} />
          )}
        </div>
      )}
    </div>
  </div>
);

const DateDivider = ({ date }) => (
  <div className="flex items-center gap-4 my-8 px-6">
    <div className="flex-1 h-px bg-white/5" />
    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{date}</span>
    <div className="flex-1 h-px bg-white/5" />
  </div>
);

export default function MessagingInterface({ user }) {
  const [activeChat, setActiveChat] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const [chats, setChats] = useState([
    { id: 1, name: 'Aarav Mehta', initials: 'AM', gradient: 'from-cyan-500 to-blue-500', online: true, timestamp: '2m ago', lastMessage: 'Hello, what is up?', unread: 1 },
    { id: 2, name: 'Riya Shah', initials: 'RS', gradient: 'from-pink-500 to-rose-500', online: true, timestamp: '16m ago', lastMessage: 'Hi, all good?', unread: 0 },
    { id: 3, name: 'Kabir Sethi', initials: 'KS', gradient: 'from-emerald-500 to-teal-500', online: false, timestamp: '1h ago', lastMessage: 'Yo, free later?', unread: 0 },
    { id: 4, name: 'Naina Roy', initials: 'NR', gradient: 'from-orange-500 to-amber-500', online: true, timestamp: 'Yesterday', lastMessage: 'Hey, see you soon.', unread: 0 },
  ]);

  const [messagesByChatId, setMessagesByChatId] = useState({
    1: [
      { id: 101, senderId: 1, user: chats[0], content: "Hi", time: "2:41 PM", date: "Today" },
      { id: 102, senderId: 1, user: chats[0], content: "Hello, what is up?", time: "2:42 PM", date: "Today" },
    ],
    2: [
      { id: 201, senderId: 2, user: chats[1], content: "Hey", time: "1:04 PM", date: "Today" },
      { id: 202, senderId: 2, user: chats[1], content: "Hi, all good?", time: "1:05 PM", date: "Today" },
    ],
    3: [
      { id: 301, senderId: 3, user: chats[2], content: "Yo", time: "11:20 AM", date: "Today" },
      { id: 302, senderId: 3, user: chats[2], content: "Free later?", time: "11:21 AM", date: "Today" },
    ],
    4: [
      { id: 401, senderId: 4, user: chats[3], content: "Hey", time: "6:22 PM", date: "Yesterday" },
      { id: 402, senderId: 4, user: chats[3], content: "See you soon.", time: "6:25 PM", date: "Yesterday" },
    ],
  });

  const messages = useMemo(() => {
    if (!activeChat) return [];
    return messagesByChatId[activeChat.id] || [];
  }, [activeChat, messagesByChatId]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    setChats(prev => prev.map(item => (
      item.id === chat.id ? { ...item, unread: 0 } : item
    )));
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      senderId: 'me',
      user: user,
      content: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
      read: false
    };

    const sentText = inputMessage;
    const chatId = activeChat.id;
    const replyUser = activeChat;
    setMessagesByChatId(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMsg],
    }));
    setChats(prev => prev.map(chat => (
      chat.id === chatId
        ? { ...chat, lastMessage: sentText, timestamp: 'Now', unread: 0 }
        : chat
    )));
    setInputMessage('');

    // Simulate Reply
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyMsg = {
          id: Date.now() + 1,
          senderId: replyUser.id,
          user: replyUser,
          content: `${replyUser.name.split(' ')[0]} here. Got it, replying in this chat only.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: 'Today'
        };
        setMessagesByChatId(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), replyMsg],
        }));
        setChats(prev => prev.map(chat => (
          chat.id === chatId
            ? { ...chat, lastMessage: replyMsg.content, timestamp: 'Now' }
            : chat
        )));
      }, 2000);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex bg-[#0a0a0f] text-white overflow-hidden animate-in fade-in duration-500">
      
      {/* Sidebar */}
      <aside className={`${activeChat ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 lg:w-96 bg-[#0f0f17] border-r border-white/5`}>
        <div className="p-6 flex items-center justify-between">
          <h2 className="font-syne text-2xl font-black tracking-tight">Messages</h2>
          <button className="bg-white/5 hover:bg-white/10 rounded-xl p-2.5 transition-all text-white/60 hover:text-white">
            <PencilLine size={20} />
          </button>
        </div>

        <div className="px-4 mb-4">
          <div className="relative group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:bg-white/[0.08] focus:border-purple-500/30 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 px-6 pt-4 pb-2">Messages</h3>
          {chats.map((chat, idx) => (
            <ConversationItem 
              key={chat.id} 
              chat={chat} 
              index={idx}
              isActive={activeChat?.id === chat.id}
              onClick={() => handleSelectChat(chat)}
            />
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className={`${!activeChat ? 'hidden md:flex' : 'flex'} flex-1 flex-col relative`}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <header className="h-20 shrink-0 bg-[#0f0f17]/80 backdrop-blur-xl border-b border-white/5 px-6 flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveChat(null)} className="md:hidden p-2 -ml-2 text-white/50 hover:text-white">
                  <ChevronLeft size={24} />
                </button>
                <div className="relative">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${activeChat.gradient} flex items-center justify-center text-sm font-bold text-white shadow-xl ring-2 ring-white/5`}>
                    {activeChat.initials}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#0f0f17] rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-tight">{activeChat.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="group relative bg-white/5 hover:bg-white/10 rounded-xl p-2.5 transition-all text-white/60 hover:text-white">
                  <Phone size={18} />
                  <span className="absolute top-full right-0 mt-2 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-md text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Voice Call</span>
                </button>
                <button className="group relative bg-white/5 hover:bg-white/10 rounded-xl p-2.5 transition-all text-white/60 hover:text-white">
                  <Video size={18} />
                  <span className="absolute top-full right-0 mt-2 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-md text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Video Call</span>
                </button>
                <button className="group relative bg-white/5 hover:bg-white/10 rounded-xl p-2.5 transition-all text-white/60 hover:text-white">
                  <MoreVertical size={18} />
                  <span className="absolute top-full right-0 mt-2 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-md text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">More</span>
                </button>
              </div>
            </header>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide relative" style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}>
              <DateDivider date="Today" />
              
              {messages.map((msg, idx) => {
                const nextMsg = messages[idx + 1];
                const isSent = msg.senderId === 'me';
                const isLastInGroup = !nextMsg || nextMsg.senderId !== msg.senderId;
                
                return (
                  <MessageBubble 
                    key={msg.id} 
                    message={msg} 
                    isSent={isSent}
                    isLastInGroup={isLastInGroup}
                    showAvatar={isLastInGroup}
                  />
                );
              })}

              {isTyping && (
                <div className="flex items-end gap-3 mb-4 animate-in fade-in duration-300">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activeChat.gradient} flex items-center justify-center text-[10px] font-bold text-white shadow-lg`}>
                    {activeChat.initials}
                  </div>
                  <div className="bg-white/10 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <div className="bg-[#0f0f17]/80 backdrop-blur-xl border-t border-white/5 px-6 py-5 sticky bottom-0 z-20">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 px-4 py-1.5 focus-within:bg-white/[0.08] focus-within:border-purple-500/40 focus-within:ring-1 focus-within:ring-purple-500/20 transition-all shadow-inner">
                  <button type="button" className="text-white/40 hover:text-white transition-colors">
                    <Smile size={20} />
                  </button>
                  <input 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-white py-2.5 placeholder-white/20"
                  />
                  <div className={`flex items-center gap-2 transition-all duration-300 ${inputMessage ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                    <button type="button" className="text-white/40 hover:text-white transition-colors">
                      <Paperclip size={18} />
                    </button>
                    <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl p-2 shadow-lg shadow-purple-600/20 active:scale-90 transition-all">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-12 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full animate-pulse-slow" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <MessageCircle size={32} className="text-white/10" />
              </div>
              <h3 className="text-xl font-bold text-white/40 mb-2 tracking-tight">Your Messages</h3>
              <p className="text-white/20 text-sm font-medium">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}
