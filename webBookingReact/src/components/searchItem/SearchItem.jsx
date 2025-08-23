import React from "react";
import { Link } from "react-router-dom";
import "./searchItem.css";
const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img className="siImg" src={item.photos[0]} />
      <div className="siDisc">
        <h1 className="siTitle">{item.name}</h1>
        <div className="siLocation">
          <span className="siDistance">{item.distance}</span>
          <span className="siTaxiOp">Subway Access</span>
        </div>
         <div className="siRoom">
          <span className="siSubtitle">Royal Suite</span>
          <span className="siFeatures">{item.desc}</span>
        </div>
        <div className="siPerks">
          <span className="siPerksFreeBreakfast">Breakfast Included</span>
          <span className="siPerksFreeCancel"> - Free cancellation</span>
          <span className="siPerksNoPayment">
            {" "}
            - No prepayment needed – pay at the property
          </span>
        </div>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siQuality">
            {item.review && (
              <div className="siReview">
                <span className="Review">Very Good</span>
                <span className="ReviewNo">{item.review} reviews</span>
              </div>
            )}
            <button className="siRating">{item.rating}</button>
          </div>
        )}
        <div className="siPrice">
          <span className="siStay">1  night  {item.adult} adult</span>
          <span className="siPriceTag">₹ {item.cheapestPrice}</span>
          <span className="siTaxes">+ ₹ 195 taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siAvailability">See availability </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
