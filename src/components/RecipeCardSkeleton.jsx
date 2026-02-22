import React from 'react';

const RecipeCardSkeleton = () => {
  return (
    <div className="w-full px-2 mb-8">
      {/* Container matches the card's outer shape */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-slate-100 border border-slate-200">
        
        {/* Main Image Area Pulse */}
        <div className="h-full w-full animate-pulse bg-slate-200" />

        {/* Top Badge Skeleton (Visible Always) */}
        <div className="absolute top-6 left-6 z-20">
          <div className="h-6 w-20 rounded-xl bg-slate-300 animate-pulse" />
        </div>

        {/* Bottom Content Skeleton 
            Even though text is hidden on hover, we add a subtle gradient 
            skeleton at the bottom to represent the structural weight.
        */}
        <div className="absolute inset-x-0 bottom-0 p-8 space-y-3">
            {/* Title Skeleton Line 1 */}
            <div className="h-8 w-3/4 rounded-lg bg-slate-300/50 animate-pulse" />
            {/* Title Skeleton Line 2 */}
            <div className="h-8 w-1/2 rounded-lg bg-slate-300/50 animate-pulse" />
            
            {/* Meta Info Skeleton */}
            <div className="flex gap-3 pt-4">
                <div className="h-4 w-16 rounded-md bg-slate-300/50 animate-pulse" />
                <div className="h-4 w-16 rounded-md bg-slate-300/50 animate-pulse" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;