import React from "react";
import "./Featured.css";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const cityImages = {
  "New Delhi": "/images/New Delhi.jpg",
  "Bengaluru": "/images/Bengaluru.jpg",
  "Mumbai": "/images/Mumbai.jpg",
  "Chennai": "/images/Chennai.jpg",
  "Varanasi": "/images/Varanasi.jpg",
};

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels/countByCity?cities=New Delhi,Bengaluru,Mumbai,Chennai,Varanasi"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading city data</div>;

  return (
    <div className="featured">
      {data && data.length > 0 ? (
        data.map((city, i) => (
          <div className="featuredItems" key={city.city || i}>
            <Link
              to={`/hotels?city=${encodeURIComponent(city.city)}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={cityImages[city.city] || "/images/placeholder.jpg"}
                alt={city.city}
                className="featuredImg"
              />
            </Link>
            <div className="featuredTitle">
              <span className="FeaturedCity">{city.city}</span>
              <span className="FeaturedHotels">{city.count} Property</span>
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
