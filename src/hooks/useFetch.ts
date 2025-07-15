import { useEffect, useState } from "react";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <Response, Params>(
  fetchDataPromise: (params: Params) => Promise<Response>,
  params: Params = null as Params
): FetchResult<Response> => {
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchDataPromise(params);
        setData(result);
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

    fetchData();
  }, [fetchDataPromise, params]);

  return { data, loading, error };
};
