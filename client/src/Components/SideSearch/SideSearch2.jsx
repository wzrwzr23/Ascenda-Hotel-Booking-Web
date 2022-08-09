import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import React from 'react'
import { useContext, useState } from 'react'
import destData from '../../destinations.json'
import './SideSearch.css'
import { format } from "date-fns";
import { DateRange } from 'react-date-range'
import { SearchContext } from '../../Context/SearchContext'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

// import './DestinationSearch.css'

const SideSearch = () => {
  const [userDest, setUserDest] = useState('')
  const [filteredDest, setFilteredDest] = useState([])
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [numChild, setNumChild] = useState()
  const [numAdult, setNumAdult] = useState()
  const [numRoom, setNumRoom] = useState()
  const [destId, setDestId] = useState()
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: updateDate(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    guest: 1,
    // children: 0,
    room: 1,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const {dispatch} = useContext(SearchContext)
  const navigate = useNavigate();

  const handleSearch = async () => {
    // await this.timeout(6500)
    const uid = onSearch()
    setDestId("yo", uid);
    console.log(uid)
    const url = `/hotelsearch/${uid}`;
    // const url = "/login"
    dispatch({type:"NEW_SEARCH", payload:{destination, dates, options}})
    navigate(url, { state: { destination, dates, options } });
  };

  const searchDest = (event) => {
    const userSearch = event
    const lowercase = userSearch.toLowerCase()
    setUserDest(userSearch)
    const filterDest = destData.filter((item) => {
      const destTerm = item.term.toLowerCase()
      return lowercase && destTerm.startsWith(lowercase) && destTerm !== lowercase
    })
    if (userSearch === '') {
      setFilteredDest([])
    } else {setFilteredDest(filterDest.slice(0, 10))}
  }
  // function onSearch(userDest) {
  //   if (userDest === '') {
  //     alert('please fill in all input fields.')
  //   } else {
  //     return getUID(userDest, destData)
  //   }
  // }
  // const onSearch = () => {
  //   if (userDest) {
  //     getUID(userDest, destData)
  //   }
  // }

  function updateDate() {
    var date = new Date()
    var currentMonth = date.getMonth();
    var currentDate = date.getDate() + 1;
    var currentYear = date.getFullYear();
    var doo = new Date(currentYear, currentMonth, currentDate)
    return new Date(doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000))
    // return doo

  }

  function onSearch(){
    var uid;
    var dict = {};
    if (userDest) {
      uid = getUID(userDest, destData)
    }
    
    var checkindate = JSON.stringify(dates[0].startDate).slice(1, 11)
    var checkoutdate = JSON.stringify(dates[0].endDate).slice(1, 11)
    var numguest = options.guest
    var numroom = options.room
    dict['Check-In Date'] = checkindate
    dict['Check-Out Date'] = checkoutdate
    dict['Number of Guests'] = numguest
    dict['Number of Rooms'] = numroom
    console.log("helllllllllo")
    // dispatch({type:"RESET_SEARCH"})
    // console.log("reset")
    dispatch({type:"NEW_SEARCH", payload:{destination, dates, options}})
    console.log("dispatched")
    //alert(JSON.stringify(dict))
    if (uid == null || checkindate == checkoutdate){
      console.log("null");
      navigate("/error");
    }
    else{
      navigate("/hotelsearch2/"+uid, { state: { destination, dates, options } });
    }
    /*navigate("/hotelsearch/"+uid, { state: { destination, dates, options } });*/
  }

  function getUID(value, file) {
    for (var i=0; i<file.length; i++) {
      var obj = file[i]
      if (value === obj.term) {
        setDestId(obj.uid)
        console.log("nami",destId)
        return obj.uid;
      }
    }
    return null;
  }


  return (
    // <div>Destination Search</div>
    <section className='destform'>
        <div className="searchItems">
        <h2>Enjoy Your Stay</h2>  
        <span>Search and Book Hotel</span>
          <div className='usersearch'>
            <input className='searchcity' type='text' placeholder='Search City' name='' id='input' value={userDest} onChange={(e) => {searchDest(e.target.value); setDestination(e.target.value);}} data-testid='searchinput'/>
          </div>
          <div className='dropdown' data-testid="filter-dest">
            {filteredDest.map((item) => {return (
              <div  className='dropdown-row' style={{color: 'black'}} onClick={() => searchDest(item.term)}>{item.term}</div>
            )})}
          </div>
          <div className='lsItem'>
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  /*editableDateInputs={true}*/
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                  endDatePlaceholder={updateDate()}
                  endDate={updateDate()}
                />
              )}
          </div>
          <div className="options">
            <div className="optionItem">
              <span className="optionText">Guests</span>
              <div className="optionCounter">
                <button
                  disabled={options.guest <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption("guest", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">
                  {options.guest}
                </span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("guest", "i")}
                >
                  +
                </button>
              </div>
            </div>
            {/* <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter"> */}
                {/* <button
                  disabled={options.children <= 0}
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "d")}
                >
                  -
                </button> */}
                {/* <span className="optionCounterNumber">
                  {options.children}
                </span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "i")}
                >
                  +
                </button>
              </div>
            </div> */}
            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
                <button
                  disabled={options.room <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption("room", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">
                  {options.room}
                </span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("room", "i")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {/* <Link to={`/hotelsearch/${destId}`}>
              <button className="siCheckButton" onClick={handleSearch}>See availability</button>
          </Link> */}
          {/* <button onClick={handleSearch}>Search</button> */}
        {/*<button type='Submit' className='submitDest' data-testid='submit'*/}
      {/* <a className='searchBtn' href={'/hotelsearch/'+destId} onClick={onSearch}>Search</a> */}
      <button id="search_button" onClick={onSearch} data-testid='submit'>Search</button>
        {/*</button>*/}
      </div>
    </section>
  ) 
}

export default SideSearch