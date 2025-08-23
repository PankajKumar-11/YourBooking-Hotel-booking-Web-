import React from "react";
import "./Featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels/countByCity?cities=berlin,madrid,london"
  );
  return (
    <div className="featured">
      {loading ? ("Loading please wait") : 
         (<><div className="featuredItems">
        <img
          src="https://cf.bstatic.com/xdata/images/city/square250/684765.webp?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitle">
          <span className="FeaturedCity">New Delhi</span>
          <span className="FeaturedHotels">{data[0]} Properties</span>
        </div>
      </div>
      <div className="featuredItems">
        <img
          src="https://cf.bstatic.com/xdata/images/city/square250/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitle">
          <span className="FeaturedCity">Bengaluru</span>
          <span className="FeaturedHotels">{data[1]} Properties</span>
        </div>
      </div>
      <div className="featuredItems">
        <img
          src="https://cf.bstatic.com/xdata/images/city/square250/971346.webp?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitle">
          <span className="FeaturedCity">Mumbai</span>
          <span className="FeaturedHotels">{data[2]} Properties</span>
        </div>
      </div>
      <div className="featuredItems">
        <img
          src="https://cf.bstatic.com/xdata/images/city/square250/684730.webp?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitle">
          <span className="FeaturedCity">Chennai</span>
          <span className="FeaturedHotels">{data[3]} properties</span>
        </div>
      </div>
      <div className="featuredItems">
        <img
          src="https://r-xx.bstatic.com/xdata/images/city/170x136/684940.jpg?k=f8eb21b5c72289407585cef7ff7cfc99798ac9238398d7b27c6929ad6c54f78a&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitle">
          <span className="FeaturedCity">Varanasi</span>
          <span className="FeaturedHotels">{data[4]} properties</span>
        </div>
      </div></>)}
    </div>
  );
};

export default Featured;
