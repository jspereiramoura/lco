import { useEffect, useRef } from "react";

interface UseAutoInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const useAutoInfiniteScroll = ({
  loading,
  hasMore,
  onLoadMore
}: UseAutoInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (loading || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }

          debounceTimerRef.current = setTimeout(() => {
            onLoadMore();
          }, 300);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "5px"
      }
    );

    if (triggerRef.current) {
      observerRef.current.observe(triggerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [loading, hasMore, onLoadMore]);

  return triggerRef;
};
