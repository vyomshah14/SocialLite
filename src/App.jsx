import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import MobileTabs from './components/MobileTabs'
import NotificationPanel from './components/Notifications'
import MessagingInterface from './components/Messaging'
import FeedPage from './components/FeedPage'
import ProfilePage from './components/ProfilePage'
import SearchPage from './components/SearchPage'
import FriendsPage from './components/FriendsPage'
import AuthPage from './pages/Auth'
import { 
  PostCardSkeleton, 
  ProfileSkeleton, 
  NotificationSkeleton, 
  MessageSkeleton, 
  FriendCardSkeleton,
  Skeleton 
} from './components/Skeletons'
import { initialPosts } from './data/posts'
import { useState } from 'react'

const PageWrapper = ({ children, isLoading, skeleton: SkeletonComp }) => (
  <div className="animate-in fade-in duration-500 pt-16">
    {isLoading ? SkeletonComp : children}
  </div>
);

export default function App() {
  const [posts, setPosts] = useState(initialPosts)
  const location = useLocation();
  const isLoading = false
  
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'like', user: { name: 'Sarah Connor', initials: 'SC', gradient: 'from-pink-500 to-rose-500' }, text: 'liked your post', timestamp: '2 min ago', unread: true },
    { id: 2, type: 'comment', user: { name: 'Liam Wilson', initials: 'LW', gradient: 'from-emerald-500 to-teal-500' }, text: 'commented on your post', timestamp: '15 min ago', unread: true },
  ])

  const unreadCount = notifications.filter(n => n.unread).length

  const [user, setUser] = useState({
    name: 'Guest User',
    username: '@guestuser',
    initials: 'GU',
    gradient: 'from-violet-600 to-indigo-600',
  })

  const [friends] = useState([
    { id: 201, name: 'Aisha Patel', initials: 'AP', gradient: 'from-pink-500 to-rose-500', online: true },
  ])

  const handleNewPost = (newPost) => setPosts(prev => [newPost, ...prev])
  const handleToggleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post

      const nextLiked = !post.liked
      return {
        ...post,
        liked: nextLiked,
        likes: Math.max(0, (Number.parseInt(post.likes, 10) || 0) + (nextLiked ? 1 : -1)),
      }
    }))
  }
  const handleAddComment = (postId, comment) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post

      return {
        ...post,
        comments: (Number.parseInt(post.comments, 10) || 0) + 1,
        commentItems: [comment, ...(post.commentItems || [])],
      }
    }))
  }
  const handleUpdateUser = (updatedUser) => setUser(updatedUser)
  const handleSetUserName = (name) => {
    const cleanName = name.trim() || 'Guest User'
    const initials = cleanName
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase()

    setUser(prev => ({
      ...prev,
      name: cleanName,
      username: `@${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '') || 'guestuser'}`,
      initials: initials || 'GU',
    }))
  }

  const myPostsCount = posts.filter(p => p.user.username === user.username).length
  const unreadMessages = 3 // Static for now
  const isAuthPage = location.pathname === '/login'

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 font-inter">
      {!isAuthPage && <Navbar user={user} unreadNotifications={unreadCount} />}

      <main className={isAuthPage ? '' : 'pt-4'}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<AuthPage onSetUserName={handleSetUserName} />} />
          
          <Route path="/feed" element={
            <PageWrapper 
              isLoading={isLoading} 
              skeleton={
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-6">
                  <div className="hidden lg:block"><Skeleton height="280px" rounded="rounded-2xl" /></div>
                  <div className="space-y-6"><Skeleton height="120px" rounded="rounded-2xl" /><PostCardSkeleton /></div>
                  <div className="hidden xl:block"><Skeleton height="400px" rounded="rounded-2xl" /></div>
                </div>
              }
            >
              <FeedPage 
                user={user} 
                posts={posts} 
                onPost={handleNewPost} 
                onToggleLike={handleToggleLike}
                onAddComment={handleAddComment}
                friendCount={friends.length} 
              />
            </PageWrapper>
          } />

          <Route path="/search" element={<PageWrapper isLoading={isLoading} skeleton={<PostCardSkeleton />}><SearchPage /></PageWrapper>} />
          <Route path="/friends" element={<PageWrapper isLoading={isLoading} skeleton={<FriendCardSkeleton />}><FriendsPage /></PageWrapper>} />
          <Route path="/messages" element={<div className="pt-16">{isLoading ? <MessageSkeleton /> : <MessagingInterface user={user} onBack={() => {}} />}</div>} />
          <Route path="/notifications" element={<PageWrapper isLoading={isLoading} skeleton={<NotificationSkeleton />}><NotificationPanel notifications={notifications} setNotifications={setNotifications} onClose={() => {}} /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper isLoading={isLoading} skeleton={<ProfileSkeleton />}><ProfilePage user={user} onUpdateUser={handleUpdateUser} postCount={myPostsCount} /></PageWrapper>} />
        </Routes>
      </main>
      {!isAuthPage && <MobileTabs unreadNotifications={unreadCount} unreadMessages={unreadMessages} />}
    </div>
  )
}
