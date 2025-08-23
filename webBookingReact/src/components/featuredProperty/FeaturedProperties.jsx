import React from "react";
import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels?featured=true&limit=4"
  );

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpLocation">{item.city}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                {item.review && <div className="fpReviews">
                  <span>Excellent</span>
                  <span>{item.review} reviews</span>
                </div>}
              </div>}
              <span className="fpPrice">
                Starting from <b className="Price">₹ {item.cheapestPrice}</b>
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
