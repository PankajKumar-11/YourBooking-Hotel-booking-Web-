import React from "react";
import "./Featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  // Update the URL to fetch Indian cities data
  const { data, loading, error } = useFetch(
    "/api/hotels/countByCity?cities=new delhi,bengaluru,mumbai,chennai,varanasi"
  );

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
      ) : data ? (
        <>
          <div className="featuredItems">
            <img
              src="/src/assets/images/newdelhi.jpg"
              alt="New Delhi"
              className="featuredImg"
            />
            <div className="featuredTitle">
              <span className="FeaturedCity">New Delhi</span>
              <span className="FeaturedHotels">{data[0]} Properties</span>
            </div>
          </div>
          <div className="featuredItems">
            <img
              src="/src/assets/images/Bengaluru.jpg"
              alt="Bengaluru"
              className="featuredImg"
            />
            <div className="featuredTitle">
              <span className="FeaturedCity">Bengaluru</span>
              <span className="FeaturedHotels">{data[1]} Properties</span>
            </div>
          </div>
          <div className="featuredItems">
            <img
              src="/src/assets/images/Mumbai.jpg"
              alt="Mumbai"
              className="featuredImg"
            />
            <div className="featuredTitle">
              <span className="FeaturedCity">Mumbai</span>
              <span className="FeaturedHotels">{data[2]} Properties</span>
            </div>
          </div>
          <div className="featuredItems">
            <img
              src="/src/assets/images/Chennai.jpg"
              alt="Chennai"
              className="featuredImg"
            />
            <div className="featuredTitle">
              <span className="FeaturedCity">Chennai</span>
              <span className="FeaturedHotels">{data[3]} Properties</span>
            </div>
          </div>
          <div className="featuredItems">
            <img
              src="/src/assets/images/Varanasi.jpg"
              alt="Varanasi"
              className="featuredImg"
            />
            <div className="featuredTitle">
              <span className="FeaturedCity">Varanasi</span>
              <span className="FeaturedHotels">{data[4]} Properties</span>
            </div>
          </div>
        </>
      ) : (
        <div className="featuredNoData">No city data available</div>
      )}
    </div>
  );
};

export default Featured;
