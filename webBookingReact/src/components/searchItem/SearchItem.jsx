import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SearchItem.css";

const SearchItem = ({ item, nights = 1, options }) => {
  const location = useLocation();
  
  // Calculate total price based on nights
  const totalPrice = item.cheapestPrice * nights;
  const taxAmount = Math.round(totalPrice * 0.18); // 18% tax
  
  // Format currency with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price).replace('₹', '₹ ');
  };

  return (
    <div className="searchItem">
      <div className="siImg">
        <img
          src={item.photos?.[0] || "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o="}
          alt={item.name}
        />
        {item.featured && <div className="featuredTag">Featured</div>}
      </div>

      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <div className="siLocation">
          <span className="siDistance">{item.distance} from center</span>
          <span className="siTaxiOp">Free airport taxi</span>
        </div>
        <div className="siRoom">
          <span className="siSubtitle">
            {item.roomType || "Standard Room"}
          </span>
          <span className="siFeatures">
            {item.desc?.substring(0, 100)}...
          </span>
        </div>
        <div className="siPerks">
          <div className="siPerkItem">
            <span className="siPerksFreeBreakfast">✓ Breakfast Included</span>
          </div>
          <div className="siPerkItem">
            <span className="siPerksFreeCancel">✓ Free cancellation</span>
          </div>
          <div className="siPerkItem">
            <span className="siPerksNoPayment">✓ Pay at property</span>
          </div>
        </div>
      </div>

      <div className="siDetails">
        {item.rating && (
          <div className="siQuality">
            <div className="siReview">
              <span className="reviewText">
                {item.rating >= 9.5
                  ? "Exceptional"
                  : item.rating >= 9
                  ? "Superb"
                  : item.rating >= 8
                  ? "Very Good"
                  : item.rating >= 7
                  ? "Good"
                  : "Average"}
              </span>
              <span className="reviewCount">
                {item.review || Math.floor(Math.random() * 400) + 100} reviews
              </span>
            </div>
            <button className="siRating">{item.rating}</button>
          </div>
        )}

        <div className="siPrice">
          <div className="stayDetails">
            <span className="siStay">
              <strong>
                {nights} {nights === 1 ? "night" : "nights"}
              </strong>
              · {options?.adult || 1}{" "}
              {options?.adult === 1 ? "adult" : "adults"}
            </span>
            <span className="roomCount">
              {options?.room || 1} {options?.room === 1 ? "room" : "rooms"}
            </span>
          </div>
          <div className="priceContainer">
            <span className="siPriceTag">{formatPrice(totalPrice)}</span>
            <span className="siTaxes">
              + {formatPrice(taxAmount)} taxes and fees
            </span>
          </div>
          <Link
            to={`/hotels/${item._id}`}
            state={{ nights, dates: location?.state?.dates, options }}
            className="availabilityLink"
          >
            <button className="siAvailability">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
