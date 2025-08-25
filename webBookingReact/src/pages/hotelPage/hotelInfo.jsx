import React, { useContext } from "react";
import "./hotelInfo.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import axios from "axios";
import { toast } from "react-toastify";

const HotelInfo = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id)

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const {dates,options} = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL || "";



  const MILLISECONDS_PER_DAY = 1000*60*60*24;
  function dayDifference(date1,date2){
    const timeDiff = Math.abs(date2?.getTime()-date1?.getTime());
    const diffDays = Math.ceil(timeDiff/MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0]?.endDate || null , dates[0]?.startDate || null);


  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      toast.info("Please login or register to book a room", {
        position: "top-right",
        autoClose: 5000
      });
      navigate("/login?register=true");
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading"
      ) : (
        <>
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img
                    src={data.photos?.[slideNumber] || "https://via.placeholder.com/800x600?text=No+Image"}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book now</button>
              <h1 className="hotelTitle">{data?.name || "Hotel Name"}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="locationIcon"
                />
                <span>{data.address}</span>
              </div>
              <div className="hotelImages">
                {data.photos?.length > 0 ? (
                  data.photos.map((photo, index) => (
                    <div className="photoWrapper" key={index}>
                      <img
                        onClick={() => handleOpen(index)}
                        src={photo}
                        alt={`Hotel view ${index + 1}`}
                        className="hotelImg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Available";
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="noImagesMessage">No photos available for this hotel</div>
                )}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsText">
                  <h1 className="hotelTitle">About this property</h1>
                  <p className="hotelDisc">{data?.desc || "No description available."}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1 className="hotelPriceTitle">Property highlights </h1>
                  <div className="highlightPerk">
                    <h1 className="perkTitle">Breakfast Info</h1>
                    <span className="perkDisc">
                      Full English / Irish, Vegetarian, Gluten - free, American,
                      Buffet, Breakfast to go
                    </span>
                  </div>
                  <div className="roomPerk">
                    <h1 className="perkTitle">Rooms with:</h1>
                    <div className="roomPerkDetails">
                      <span>City view</span>
                      <span>Landmark view</span>
                      <span>Free private parking available at the hotel</span>
                      <span className="hotelPrice">
                        ₹{days*data.cheapestPrice* options.room} <small>({days} nights)</small>
                      </span>
                     
                    </div>
                  </div>
                  <button onClick={handleClick} className="reserveButton">Reserve</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        </>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  );
};

export default HotelInfo;
