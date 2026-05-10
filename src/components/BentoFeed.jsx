import BentoPostCard from './BentoPostCard';
import { bentoPosts } from '../data/bentoPosts';

export default function BentoFeed({ posts }) {
  const displayPosts = posts || bentoPosts;
  
  return (
    <div className="py-0">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
        {displayPosts.map((post, index) => (
          <BentoPostCard key={post.id} post={post} index={index} />
        ))}
      </div>
      
    </div>
  );
}
