import React from "react";
import "./aboutCompany.css";
const AboutCompany = () => {
  return (
    <div className="ac">
        <div className="acContainer">

      <div className="acItem">
        <img
          className="acImg"
          src="https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/FreeCancellation.png"
          alt=""
          />
        <div className="acContent">
          <h4>Book now, pay at the property</h4>
          <p>FREE cancellation on most rooms</p>
        </div>
      </div>

      <div className="acItem">
        <img
          className="acImg"
          src="https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/TripsGlobe.png"
          alt=""
          />
        <div className="acContent">
          <h4>2+ million properties worldwide</h4>
          <p>Hotels, guest houses, apartments, and more…</p>
        </div>
      </div>

      <div className="acItem">
        <img
          className="acImg"
          src="https://t-cf.bstatic.com/design-assets/assets/v3.160.0/illustrations-traveller/CustomerSupport.png"
          alt=""
          />
        <div className="acContent">
          <h4>Trusted 24/7 customer service you can rely on</h4>
          <p>We're always here to help</p>
        </div>
      </div>
    </div>
          </div>
  );
};

export default AboutCompany;
