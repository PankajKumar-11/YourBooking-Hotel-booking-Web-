import React from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./Overview.css";
const Overview = () => {
  return (
    <>
      <div className="overview">
        <div className="row row1">

        <div className="overviewItems">
            <img
          className="overviewImg"
          src="/src/assets/images/Bengaluru.jpg"
          alt=""
          />
            <div className="overviewTitle">
              <h2>Bengaluru</h2>
              <span className="fi fi-in"></span>
            </div>
        </div>
        <div className="overviewItems">
            <img
              className="overviewImg"
              src="/images/New Delhi.jpg"
              alt=""
              />
            <div className="overviewTitle">
              <h2>New Delhi</h2>
              <span className="fi fi-in"></span>
          </div>
        </div>
              </div>
              <div className="row row2">

        <div className="overviewItems">
            <img
              src="/images/Chennai.jpg"
              alt=""
              className="overviewImg"
              />
            <div className="overviewTitle">
              <h2>Chennai</h2>
              <span className="fi fi-in"></span>
            </div>
        </div>
        <div className="overviewItems">
          <img
            src="/images/Jaipur.jpg"
            alt=""
            className="overviewImg"
            />
          <div className="overviewTitle">
            <h2>Jaipur</h2>
            <span className="fi fi-in"></span>
        </div>
      </div>
      <div className="overviewItems">
          <img
            src="/images/Mumbai.jpg"
            alt=""
            className="overviewImg"
            />
          <div className="overviewTitle">
            <h2>Mumbai</h2>
            <span className="fi fi-in"></span>
        </div>
      </div>
            </div>
      </div>
    </>
  );
};

export default Overview;
