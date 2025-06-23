'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function RouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    setIsNavigating(true);

    const interval = setInterval(() => {
      setCompletion((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsNavigating(false);
            setCompletion(0);
          }, 200);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [pathname, searchParams]);

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-purple-200">
      <div
        className="h-full bg-purple-700 transition-all duration-200 ease-out"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}