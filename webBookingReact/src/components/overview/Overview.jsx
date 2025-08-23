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
          src="https://cf.bstatic.com/xdata/images/city/square250/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
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
              src="https://cf.bstatic.com/xdata/images/city/square250/684765.webp?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
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
              src="https://cf.bstatic.com/xdata/images/city/square250/684730.webp?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o=33f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
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
            src="https://cf.bstatic.com/xdata/images/city/square250/684657.webp?k=66dc5035b43e9bb86b756e381e4fec2558064af4a63a8af17836725a854c03ee&o="
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
            src="https://cf.bstatic.com/xdata/images/city/square250/971346.webp?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
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
