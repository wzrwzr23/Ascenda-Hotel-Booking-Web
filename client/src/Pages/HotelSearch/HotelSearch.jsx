import './HotelSearch.css'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from '../../Components/SearchItem/SearchItem.jsx';
import Footer from '../../Components/Footer/Footer';
import useFetch from "../../hooks/useFetch";
import { SearchContext } from '../../Context/SearchContext';
var destdata = require('../../destinations.json')


const HotelSearch = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [input, setInput] = useState("");

  // const [value, setValue] = useState('')
  // const onChange = (event) => {
  //   setValue(event.target.value)
  // }
  // const onSearch = (searchDest) => {
  //   setValue(searchDest)
  // }

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}`
    //setDestination(destination);
  );
  console.log(data);

  const handleOption = (name, value) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  //const {dates} = useContext(SearchContext);

  const handleClick = () => {
    //setDestination();
    reFetch();
  };

//refetch not working

  return (
    <>
    <Navbar/>
    <Header type="list"/>
    <div className="listContainer">
      <div className="listWrapper">
        <div className="listSearch">
          <h1 className="lsTitle">Search</h1>
          <div className="lsItem">
            <label>Destination</label>
            <input placeholder={destination} type="text" onChange={(e) => setDestination(e.target.value)} />
            {/* <input placeholder={destination} type="text" value={value} onChange={onChange}/> */}
          </div>
          {/* <div className='dropdown'>
            {destdata.filter(item => {
              const searchDest = value.toLowerCase()
              const destTerm = item.term.toLowerCase()
              return searchDest && destTerm.startsWith(searchDest) && destTerm !== searchDest
            })
            .map((item) => (
              <div onClick={()=>onSearch(item.term)} className='dropdown-row'>{item.term}</div>))}
          </div> */}
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
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onChange={(e) => {console.log(e.target.value);
                      setOptions(options=>({adult: e.target.value, ...options}))
                    }}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onChange={(e) => handleOption("room", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
        </div>
        <div className="listResult"> 
          {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default HotelSearch