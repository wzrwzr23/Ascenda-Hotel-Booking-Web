import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarDays, faHouse, faPerson, faPersonBooth, faCartPlus, faBoxArchive,faPlusCircle, faPhone, faBed} from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import { useState } from 'react'
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import destData from '../../destinations.json';

const Header = ({type}) => {
  // const [destination, setDestination] = useState("");
  // const [openDate, setOpenDate] = useState(false);
  // const [filteredDest, setFilteredDest] = useState([])
  // const [date, setDate] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);
  // const [openOptions, setOpenOptions] = useState(false);
  // const [options, setOptions] = useState({
  //   adult: 1,
  //   children: 0,
  //   room: 1,
  // });
  // const handleOption = (name, operation) => {
  //   setOptions((prev) => {
  //     return {
  //       ...prev,
  //       [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
  //     };
  //   });
  // };
  // const navigate = useNavigate();
  // const handleSearch = () => {
  //   navigate("/hotelsearch", { state: { destination, date, options } });
  // };
  // const searchDest = (event) => {
  //   const userSearch = event
  //   const lowercase = userSearch.toLowerCase()
  //   setDestination(userSearch)
  //   const filterDest = destData.filter((item) => {
  //     const destTerm = item.term.toLowerCase()
  //     return lowercase && destTerm.startsWith(lowercase) && destTerm !== lowercase
  //   })
  //   if (userSearch === '') {
  //     setFilteredDest([])
  //   } else {setFilteredDest(filterDest.slice(0, 10))}
  // }
  // function getUID(value, file) {
  //   for (var i=0; i<file.length; i++) {
  //     var obj = file[i]
  //     if (value === obj.term) {
  //       return obj.uid
  //     }
  //   }
  // }
  return (
    <div className='header'>
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faHouse} />
                    <span>Home</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPersonBooth} />
                    <span>Rooms</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <span>Services</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCartPlus} />
                    <span>Shop</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faBoxArchive} />
                    <span>Gallery</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>Contact</span>
                </div>
            </div>
            { type !=="list" && 
              <>
            <h1 className="headerTitle">Ascenda Hotel Booking</h1>
            <p className="headerDesc">The place you come to explore all options</p>
            <button className="headerBtn">Sign In / Register</button>
            {/* <div className="headerSearch"> 
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faBed} /> 
                    <input type="text" placeholder='Where are you going?' className='headerSearchInput' value={destination} onChange={(e) => searchDest(e.target.value)}/>
                    <div className='dropdown'>
                      {filteredDest.map((item) => {return (
                        <div className='dropdown-row' style={{color:'black'}} onClick={() => searchDest(item.term)}>{item.term}</div>
                      )})}
                    </div>
                </div>
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <span
                      onClick={() => setOpenDate(!openDate)}
                      className="headerSearchText"
                    >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                        date[0].endDate,
                        "MM/dd/yyyy"
                      )}`}</span>
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className="date"
                      minDate={new Date()}
                    />
                  )}
                </div>
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faPerson} />
                    <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
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
                )}
                </div>
                <div className="headerSearchItem">
                    <button className="headerBtn" onClick={handleSearch}>Search</button>
                </div>
            </div> */}
            </>
            }
        </div>
    </div>
  );
}

export default Header