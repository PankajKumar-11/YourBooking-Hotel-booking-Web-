import React, { useState, useEffect } from "react";
import "./List.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

const List = () => {
  const location = useLocation();
  // Initialize state with URL params or defaults
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
  
  // Create a search state object to track all filters
  const [searchParams, setSearchParams] = useState({
    city: destination,
    min: min,
    max: max,
    // Add any other filters you want to track
  });

  // Function to handle search button click
  const handleSearch = () => {
    setSearchParams({
      city: destination,
      min: min,
      max: max,
    });
    // Close date picker if open
    setOpenDate(false);
    
    toast.info("Updating search results...");
  };

  // Fetch data with current search parameters
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${searchParams.city}&min=${searchParams.min}&max=${searchParams.max}`
  );

  // Effect to re-fetch when search parameters change
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
                placeholder={destination} 
                type="text" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
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
                    onChange={(e) => 
                      setOptions({...options, room: e.target.value})
                    }
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              <div className="loading">Loading hotels...</div>
            ) : error ? (
              <div className="error">
                <p>Error loading hotels. Please try again.</p>
                <button onClick={reFetch}>Retry</button>
              </div>
            ) : data && data.length > 0 ? (
              data.map((item) => <SearchItem item={item} key={item._id} />)
            ) : (
              <div className="noResults">
                <h3>No hotels found for your search criteria</h3>
                <p>Try changing your filters or search for a different destination</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
