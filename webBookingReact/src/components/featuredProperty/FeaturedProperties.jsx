import React from "react";
import "./FeaturedProperties.css";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/api/hotels/featured");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading featured properties</div>;

  return (
    <div className="featuredProperties">
      {data.map((hotel) => (
        <div className="propertyCard" key={hotel._id}>
          <Link to={`/hotels?city=${encodeURIComponent(hotel.city)}`}>
            <img
              src={hotel.photos[0] || "/images/placeholder.jpg"}
              alt={hotel.name}
              className="propertyImg"
            />
          </Link>
          <div className="propertyInfo">
            <span className="propertyName">{hotel.name}</span>
            <span className="propertyCity">{hotel.city}</span>
            <span className="propertyPrice">
              Starting from ₹{hotel.cheapestPrice}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
