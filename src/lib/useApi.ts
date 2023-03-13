/**
 * Work with asynchronous function React Hook
 *
 * @param
 */
import { useEffect, useState } from 'react';

import { AxiosLikeError, Options } from '../interfaces/hook.interface';

const useApi = <T extends any, R extends readonly any[]>(
  apiFunc: (...args: R) => Promise<T>,
  options?: Options
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(false);
  const request = async (...args: R) => {
    setLoading(true);
    try {
      setError(undefined);
      setData(undefined);
      const result = await apiFunc(...args);
      setData(result);

      Promise.resolve(result);
    } catch (err) {
      if (err instanceof AxiosLikeError) {
        // Handle Axios Error
        setError(err.response?.data);
      } else if (err instanceof Error) {
        // Handle Any Error
        setError(err.message);
      } else {
        // everything else
        setError('خطایی رخ داده است!');
      }

      Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useApi;
