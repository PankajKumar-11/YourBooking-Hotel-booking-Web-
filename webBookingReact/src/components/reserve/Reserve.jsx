import React, { useContext, useState, useEffect } from "react";
import "./Reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Reserve = ({ setOpen, hotelId, dates: propDates }) => {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { user } = useContext(AuthContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates: ctxDates } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Please login or register to book a room");
      navigate("/login?register=true");
      setOpen(false);
    }
  }, []);

  // Prefer passed-in prop dates, then context dates, then fallback to today->tomorrow
  const effectiveDates =
    propDates && Array.isArray(propDates) && propDates.length > 0 && propDates[0]?.startDate
      ? propDates
      : ctxDates && Array.isArray(ctxDates) && ctxDates.length > 0 && ctxDates[0]?.startDate
      ? ctxDates
      : [
          {
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          },
        ];

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const allDates = getDatesInRange(
    effectiveDates[0].startDate,
    effectiveDates[0].endDate
  );

  const isAvailable = (roomNumber) => {
    const unavailable = Array.isArray(roomNumber?.unavailableDates)
      ? roomNumber.unavailableDates
      : [];
    const isFound = unavailable.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const BASE_URL = import.meta.env.VITE_API_URL || "";

  const handleClick = async () => {
    if (selectedRooms.length === 0) {
      toast.warning("Please select at least one room");
      return;
    }

    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`${BASE_URL}/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res;
        })
      );

      // Success toast
      toast.success("Booking confirmed!", {
        position: "top-right",
        autoClose: 3000,
      });

      setOpen(false);
      navigate("/");
    } catch (err) {
      // Error toast
      toast.error("Failed to complete your booking. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms: </span>
        {data
          ?.filter((item) => item !== null) // remove null items
          .map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">₹ {item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers?.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        <div onClick={handleClick} className="rButton">
          Reserve Now!
        </div>
      </div>
    </div>
  );
};

export default Reserve;
