import React from 'react';

export const Skeleton = ({ width, height, rounded = 'rounded-lg', className = '' }) => (
  <div 
    className={`bg-white/10 animate-pulse shimmer ${rounded} ${className}`} 
    style={{ width: width || '100%', height: height || '100%' }}
  />
);

export const PostCardSkeleton = () => (
  <div className="bg-white/5 border border-white/5 p-6 rounded-[2rem] space-y-4 shadow-2xl">
    <div className="flex items-center gap-3">
      <Skeleton width="40px" height="40px" rounded="rounded-full" />
      <div className="space-y-2">
        <Skeleton width="120px" height="12px" />
        <Skeleton width="80px" height="8px" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton width="100%" height="12px" />
      <Skeleton width="90%" height="12px" />
      <Skeleton width="60%" height="12px" />
    </div>
    <Skeleton width="100%" height="180px" rounded="rounded-2xl" />
    <div className="flex justify-between items-center pt-2">
      <Skeleton width="60px" height="24px" rounded="rounded-full" />
      <Skeleton width="40px" height="24px" rounded="rounded-full" />
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4">
    <div className="relative mb-24">
      <Skeleton width="100%" height="160px" rounded="rounded-[2.5rem]" />
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
        <div className="p-1 bg-[#0a0a0f] rounded-full">
          <Skeleton width="120px" height="120px" rounded="rounded-full" />
        </div>
      </div>
    </div>
    <div className="text-center space-y-4 mb-12">
      <Skeleton width="200px" height="24px" className="mx-auto" />
      <Skeleton width="120px" height="16px" className="mx-auto" />
      <Skeleton width="100%" height="60px" rounded="rounded-2xl" />
    </div>
    <div className="grid grid-cols-3 gap-4">
      <Skeleton height="80px" rounded="rounded-3xl" />
      <Skeleton height="80px" rounded="rounded-3xl" />
      <Skeleton height="80px" rounded="rounded-3xl" />
    </div>
  </div>
);

export const NotificationSkeleton = () => (
  <div className="space-y-6">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center gap-4 px-4">
        <Skeleton width="48px" height="48px" rounded="rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton width="180px" height="12px" />
          <Skeleton width="100px" height="8px" />
        </div>
        <Skeleton width="40px" height="40px" rounded="rounded-lg" />
      </div>
    ))}
  </div>
);

export const MessageSkeleton = () => (
  <div className="space-y-8 p-6">
    {[1, 2, 3, 4].map((i) => (
      <React.Fragment key={i}>
        {/* Received */}
        <div className="flex items-end gap-3 max-w-[70%]">
          <Skeleton width="32px" height="32px" rounded="rounded-lg" />
          <Skeleton width="200px" height="60px" rounded="rounded-2xl rounded-bl-sm" />
        </div>
        {/* Sent */}
        <div className="flex justify-end">
          <Skeleton width="180px" height="48px" rounded="rounded-2xl rounded-br-sm" className="max-w-[70%]" />
        </div>
      </React.Fragment>
    ))}
  </div>
);

export const FriendCardSkeleton = () => (
  <div className="bg-white/5 border border-white/5 p-4 rounded-3xl flex flex-col items-center gap-3">
    <Skeleton width="80px" height="80px" rounded="rounded-2xl" />
    <Skeleton width="100px" height="14px" />
    <Skeleton width="60px" height="10px" />
    <Skeleton width="100%" height="36px" rounded="rounded-xl" />
  </div>
);
