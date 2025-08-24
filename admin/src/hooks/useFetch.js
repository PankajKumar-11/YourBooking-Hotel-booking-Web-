// Same changes as webBookingReact version
import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get auth token from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        
        // Remove /api prefix if BASE_URL already has it
        const cleanUrl = url.startsWith('/api') ? url.substring(4) : url;
        console.log(`Fetching from: ${BASE_URL}${cleanUrl}`);
        
        // Add authorization header if token exists
        const config = token ? { 
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true // Add this if your backend uses cookies
        } : {};
        
        const res = await axios.get(`${BASE_URL}${cleanUrl}`, config);
        
        setData(res.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  // Update reFetch to also include auth token
  const reFetch = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      
      // Remove /api prefix if BASE_URL already has it
      const cleanUrl = url.startsWith('/api') ? url.substring(4) : url;
      // Add authorization header
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const res = await axios.get(`${BASE_URL}${cleanUrl}`, config);
      
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;