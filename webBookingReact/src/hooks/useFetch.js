import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Check if url already includes /api
      const BASE_URL = import.meta.env.VITE_API_URL || "";
      const apiUrl = url.startsWith('/api') 
        ? `${BASE_URL}${url}` 
        : `${BASE_URL}/api${url}`;
        
      console.log("Fetching from:", apiUrl);
      const res = await axios.get(apiUrl);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  // Add a reFetch function that can be called manually
  const reFetch = async () => {
    await fetchData();
  };

  return { data, loading, error, reFetch };
};

export default useFetch;