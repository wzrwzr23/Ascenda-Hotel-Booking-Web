import './HotelSearch.css'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import { useLocation } from "react-router-dom";
import destData from "../../destinations.json"
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from '../../Components/SearchItem/SearchItem';
import Footer from '../../Components/Footer/Footer';
import React, {useState, useEffect} from "react";
import axios from 'axios'

const HotelSearch = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

    const [data, setData] = useState([]);
  const [description, setDescription] = useState("Description");
  const [name, setName] = useState("Hotel Name");
  const [address, setAddress] = useState("Address");
  const [rating, setRating] = useState("Rating");
  const [image, setImage] = useState("Image Link");
  const [inpDest, setUserDest] = useState('')
  const [filteredDestLs, setFilteredDestLs] = useState([])
    const fetchData = async (DestinationID) => {
  
    await axios.get(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${DestinationID}`)
        .then((response) => {
            setData(response.data)
        }).catch(error => console.error(`Error: ${error}`));
}
/*    data.map(item => {
        setName(item.name);
    })*/
    useEffect(() => {
        fetchData("WD0M");
    }, []);
  
    const searchDest = (event) => {
      const userSearch = event
      const lowercase = userSearch.toLowerCase()
      setUserDest(userSearch)
      const filterDest = destData.filter((item) => {
        const destTerm = item.term.toLowerCase()
        return lowercase && destTerm.startsWith(lowercase) && destTerm !== lowercase
      })
      if (userSearch === '') {
        setFilteredDestLs([])
      } else {setFilteredDestLs(filterDest.slice(0, 10))}
    }

  function getUID(value, file) {
    for (var i=0; i<file.length; i++) {
      var obj = file[i]
      if (value === obj.term) {
        return obj.uid
      }
    }
  }

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
            <input placeholder='Destinations' type="text" value={inpDest} onChange={(e) => searchDest(e.target.value)}/>
            <div className='dropdown' data-testid="filter-dest">
            {filteredDestLs.map((item) => {return (
              <div  className='dropdown-row' style={{color: 'black'}} onClick={() => searchDest(item.term)}>{item.term}</div>
            )})}
            </div>
          </div>
          <div className="lsItem">
            <label>Check-in Date</label>
            <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
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
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
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
                  />
                </div>
              </div>
            </div>
            <button onClick={() => console.log(getUID(inpDest, destData))} data-testid='search-button'>Search</button>
        </div>
        <div className="listResult"> 
          <SearchItem/>
          <SearchItem/>
          <SearchItem/>
          <SearchItem/>
          <SearchItem/>
          <SearchItem/>
          <SearchItem/>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}


export default HotelSearch
