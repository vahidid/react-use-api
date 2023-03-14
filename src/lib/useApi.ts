/**
 * Work with asynchronous function React Hook
 *
 * @param
 */
import { useState } from 'react';

import { AxiosLikeError } from '../interfaces/hook.interface';

const useApi = <T extends unknown, R extends readonly unknown[]>(
  apiFunc: (...args: R) => Promise<T>
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
        setError('Something Wrong!');
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
