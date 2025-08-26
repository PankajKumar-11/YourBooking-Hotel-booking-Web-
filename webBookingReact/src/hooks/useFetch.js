import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get base URL from environment
        const BASE_URL = import.meta.env.VITE_API_URL || "";
        
        // FIXED: Check if BASE_URL already ends with /api
        // and ensure url doesn't start with /api if BASE_URL already has it
        let apiUrl;
        if (BASE_URL.endsWith('/api')) {
          // If BASE_URL already ends with /api
          // Remove leading /api from url if present
          const cleanUrl = url.startsWith('/api') ? url.substring(4) : url;
          // Ensure there's a slash between BASE_URL and cleanUrl
          const connector = cleanUrl.startsWith('/') ? '' : '/';
          apiUrl = `${BASE_URL}${connector}${cleanUrl}`;
        } else {
          // If BASE_URL doesn't end with /api, add it
          const apiPrefix = url.startsWith('/api') ? '' : '/api';
          apiUrl = `${BASE_URL}${apiPrefix}${url}`;
        }
        
        console.log("Fetching from:", apiUrl);
        const res = await axios.get(apiUrl);
        setData(res.data);
      } catch (err) {
        setError(err);
        console.error("Fetch error:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      // Get base URL from environment
      const BASE_URL = import.meta.env.VITE_API_URL || "";
      
      // FIXED: Use the same URL construction logic as above
      let apiUrl;
      if (BASE_URL.endsWith('/api')) {
        const cleanUrl = url.startsWith('/api') ? url.substring(4) : url;
        const connector = cleanUrl.startsWith('/') ? '' : '/';
        apiUrl = `${BASE_URL}${connector}${cleanUrl}`;
      } else {
        const apiPrefix = url.startsWith('/api') ? '' : '/api';
        apiUrl = `${BASE_URL}${apiPrefix}${url}`;
      }
      
      console.log("Refetching from:", apiUrl);
      const res = await axios.get(apiUrl);
      setData(res.data);
    } catch (err) {
      setError(err);
      console.error("Refetch error:", err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;