import React from "react";
import { Link } from "react-router-dom";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./Overview.css";

const Overview = () => {
  return (
    <>
      <div className="overview">
        <div className="row row1">
          <div className="overviewItems">
            <Link
              to={`/hotels?city=Bengaluru`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                className="overviewImg"
                src="/images/Bengaluru.jpg"
                alt="Bengaluru"
              />
              <div className="overviewTitle">
                <h2>Bengaluru</h2>
                <span className="fi fi-in"></span>
              </div>
            </Link>
          </div>
          <div className="overviewItems">
            <Link
              to={`/hotels?city=New Delhi`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                className="overviewImg"
                src="/images/New Delhi.jpg"
                alt="New Delhi"
              />
              <div className="overviewTitle">
                <h2>New Delhi</h2>
                <span className="fi fi-in"></span>
              </div>
            </Link>
          </div>
        </div>
        <div className="row row2">
          <div className="overviewItems">
            <Link
              to={`/hotels?city=Chennai`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                className="overviewImg"
                src="/images/Chennai.jpg"
                alt="Chennai"
              />
              <div className="overviewTitle">
                <h2>Chennai</h2>
                <span className="fi fi-in"></span>
              </div>
            </Link>
          </div>
          <div className="overviewItems">
            <Link
              to={`/hotels?city=Jaipur`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                className="overviewImg"
                src="/images/Jaipur.jpg"
                alt="Jaipur"
              />
              <div className="overviewTitle">
                <h2>Jaipur</h2>
                <span className="fi fi-in"></span>
              </div>
            </Link>
          </div>
          <div className="overviewItems">
            <Link
              to={`/hotels?city=Mumbai`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                className="overviewImg"
                src="/images/Mumbai.jpg"
                alt="Mumbai"
              />
              <div className="overviewTitle">
                <h2>Mumbai</h2>
                <span className="fi fi-in"></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
