import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Get API base URL from environment variables
  const BASE_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Remove /api prefix if BASE_URL already has it
        const cleanUrl = url.startsWith('/api') ? url.substring(4) : url;
        console.log(`Fetching from: ${BASE_URL}${cleanUrl}`);
        
        const res = await axios.get(`${BASE_URL}${cleanUrl}`);
        setData(res.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const cleanUrl = url.startsWith('/api') ? url.substring(4) : url;
      const res = await axios.get(`${BASE_URL}${cleanUrl}`);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;