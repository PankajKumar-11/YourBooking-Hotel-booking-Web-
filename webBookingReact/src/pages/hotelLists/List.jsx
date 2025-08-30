import React, { useState, useEffect } from "react";
import "./List.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.Destination || "");
  const [dates, setDates] = useState(location.state?.dates || [{
    startDate: new Date(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    key: "selection",
  }]);
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false); // <-- Add this
  const [options, setOptions] = useState(location.state?.options || {
    adult: 1,
    children: 0,
    room: 1,
  });
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(50000);
  
  // Calculate nights between selected dates
  const [nightCount, setNightCount] = useState(1);
  
  // Update night count when dates change
  useEffect(() => {
    if (dates[0].startDate && dates[0].endDate) {
      const nights = differenceInDays(dates[0].endDate, dates[0].startDate);
      setNightCount(nights > 0 ? nights : 1);
    }
  }, [dates]);
  
  // Create search parameters
  const [searchParams, setSearchParams] = useState({
    city: destination,
    min: min,
    max: max,
  });
  
  // Handle search button click
  const handleSearch = () => {
    setSearchParams({
      city: destination,
      min: min,
      max: max,
    });
    setOpenDate(false);
  };
  
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${searchParams.city}&min=${searchParams.min}&max=${searchParams.max}`
  );
  
  // Re-fetch when search parameters change
  useEffect(() => {
    reFetch();
  }, [searchParams]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input 
                placeholder={destination || "Where are you going?"} 
                type="text" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span
                onClick={() => {
                  setOpenDate(!openDate);
                  setOpenOptions(false); // <-- Close options when opening date picker
                }}
                className="dateToggle"
              >
                {`${format(dates[0].startDate, "MMM dd, yyyy")} to ${format(dates[0].endDate, "MMM dd, yyyy")}`}
              </span>
              {openDate && (
                <div className="datePickerDropdown">
                  <button 
                    onClick={() => setOpenDate(false)} 
                    className="dateCloseBtn"
                    aria-label="Close date picker"
                  >
                    ×
                  </button>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                  />
                </div>
              )}
            </div>
            <div className="lsItem" style={{ position: "relative" }}>
              <label>Options</label>
              <span
                className="optionsToggle"
                style={{ cursor: "default", display: "inline-block", marginBottom: "8px" }}
              >
                Show Options
              </span>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input 
                    type="number" 
                    className="lsOptionInput" 
                    value={min}
                    onChange={(e) => setMin(parseInt(e.target.value))}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input 
                    type="number" 
                    className="lsOptionInput" 
                    value={max}
                    onChange={(e) => setMax(parseInt(e.target.value))}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.adult}
                    onChange={(e) => 
                      setOptions({...options, adult: parseInt(e.target.value)})
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    value={options.children}
                    onChange={(e) => 
                      setOptions({...options, children: parseInt(e.target.value)})
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.room}
                    onChange={(e) => 
                      setOptions({...options, room: parseInt(e.target.value)})
                    }
                  />
                </div>
              </div>
              {openDate && (
                <div className="datePickerDropdown" style={{ zIndex: 100, position: "absolute", top: 0, left: 0, width: "100%" }}>
                  <button 
                    onClick={() => setOpenDate(false)} 
                    className="dateCloseBtn"
                    aria-label="Close date picker"
                  >
                    ×
                  </button>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                  />
                </div>
              )}
            </div>
            <button onClick={handleSearch} className="searchBtn">Search</button>
            
            {/* Night count indicator */}
            <div className="nightSummary">
              <span className="nightCount">{nightCount} {nightCount === 1 ? 'night' : 'nights'}</span>
              <span className="dateSummary">
                {format(dates[0].startDate, "MMM dd")} - {format(dates[0].endDate, "MMM dd, yyyy")}
              </span>
            </div>
          </div>
          
          <div className="listResult">
            {loading ? (
              <div className="loadingContainer">
                <div className="loader"></div>
                <p>Finding the perfect hotels for you...</p>
              </div>
            ) : error ? (
              <div className="errorContainer">
                <div className="errorIcon">!</div>
                <h3>We couldn't find any hotels</h3>
                <p>Please try adjusting your search criteria</p>
                <button onClick={reFetch}>Try Again</button>
              </div>
            ) : data && data.length > 0 ? (
              data.map((item) => (
                <SearchItem 
                  item={item} 
                  key={item._id} 
                  nights={nightCount} 
                  options={options}
                />
              ))
            ) : (
              <div className="noResultsContainer">
                <div className="noResultsIcon">🔍</div>
                <h3>No hotels found in {destination || "this location"}</h3>
                <p>Try changing your search criteria or exploring different destinations</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
