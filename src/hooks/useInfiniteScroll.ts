import { useEffect, useRef, useState } from "react";

interface InfiniteScrollResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export const useInfiniteScroll = <T>(
  fetchFunction: (offset: number, limit: number) => Promise<T[]>,
  itemsPerPage: number = 3
): InfiniteScrollResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const initializedRef = useRef<boolean>(false);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const newItems = await fetchFunction(offset, itemsPerPage);
      console.log(`Fetched ${newItems.length} items from offset ${offset}`);

      if (newItems.length < itemsPerPage) {
        setHasMore(false);
      }

      console.log(`Current data length: ${data.length}`);
      console.log(`New items length: ${newItems.length}`);
      console.log(data, newItems);

      setData(prev => [...prev, ...newItems]);
      setOffset(prev => prev + itemsPerPage);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      loadMore();
    }
  }, [loadMore]);

  return { data, loading, error, hasMore, loadMore };
};
