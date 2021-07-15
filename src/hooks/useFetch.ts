import {useState, useEffect} from "react";

const BASE_URL = 'https://jsonplaceholder.typicode.com/comments';

export const useFetch = (url = BASE_URL, options = undefined) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchDuration, setFetchDuration] = useState(0);
    
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const startTime = Date.now();
        try {
          const res = await fetch(url, options);
          const json = await res.json();
          setFetchDuration(Date.now() - startTime);
          setResponse(json);
          setIsLoading(false)
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, [url, options]);
    
    return { response, error, isLoading, fetchDuration };
};
