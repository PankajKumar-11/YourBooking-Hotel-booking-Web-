import React from "react";
import "./Featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  // Update the URL to fetch Indian cities data
  const { data, loading, error } = useFetch(
    "/api/hotels/countByCity?cities=New Delhi,Bengaluru,Mumbai,Chennai,Varanasi"
  );

  const cityImages = {
    "New Delhi": "/src/assets/images/newdelhi.jpg",
    "Bengaluru": "/src/assets/images/Bengaluru.jpg",
    "Mumbai": "/src/assets/images/mumbai.jpg",
    "Chennai": "/src/assets/images/chennai.jpg",
    "Varanasi": "/src/assets/images/varanasi.jpg",
  };
  // Add logging here, after the useFetch call
  console.log("Featured cities data:", data);
  console.log("Loading:", loading);
  console.log("Error:", error);

  return (
    <div className="featured">
      {loading ? (
        <div className="featuredLoading">Loading featured cities...</div>
      ) : error ? (
        <div className="featuredError">
          <p>Error loading city data</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : data && data.length > 0 ? (
        data.map((city, i) => (
          <div className="featuredItems" key={city.city}>
            <img
              src={cityImages[city.city] || "/src/assets/images/placeholder.jpg"}
              alt={city.city}
              className="featuredImg"
            />
            <div className="featuredTitle">
              <span className="FeaturedCity">{city.city}</span>
              <span className="FeaturedHotels">{city.count} Properties</span>
            </div>
          </div>
        ))
      ) : (
        <div className="featuredNoData">No city data available</div>
      )}
    </div>
  );
};

export default Featured;
