import {useState, useEffect} from "react";

const BASE_URL = 'https://jsonplaceholder.typicode.com/comments';

export const useFetch = (url = BASE_URL, options = undefined) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchDuration, setFetchDuration] = useState(0);
    
    useEffect(() => {
      const fetchData = async () => {
        const startTime = Date.now();
        
        setIsLoading(true);
        try {
          const res = await fetch(url, options);
          const json = await res.json();
          setFetchDuration(Date.now() - startTime);
          setResponse(json);
          setIsLoading(false)
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
      };

      fetchData();
    }, [url, options]);
    
    return { response, error, isLoading, fetchDuration };
};
