import React, { useState, useEffect } from "react";
import "./List.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.Destination || "");
  const [dates, setDates] = useState(location.state?.dates || [{
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  }]);
  const [openDate, setOpenDate] = useState(false);
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
    toast.info("Updating search results...");
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
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")} · ${nightCount} ${nightCount === 1 ? 'night' : 'nights'}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input 
                    type="number" 
                    className="lsOptionInput" 
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
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
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    value={options.adult}
                    onChange={(e) => 
                      setOptions({...options, adult: e.target.value})
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    value={options.children}
                    onChange={(e) => 
                      setOptions({...options, children: e.target.value})
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    value={options.room}
                    onChange={(e) => 
                      setOptions({...options, room: e.target.value})
                    }
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch} className="searchBtn">Search</button>
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
                <h3>No hotels found in {destination}</h3>
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
