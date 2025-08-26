import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false); // Reset error state
    try {
      const BASE_URL = import.meta.env.VITE_API_URL || "";
      console.log("Fetching from:", `${BASE_URL}${url}`);
      const res = await axios.get(`${BASE_URL}${url}`);
      setData(res.data);
    } catch (err) {
      setError(err);
      console.error("Fetch error:", err);
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