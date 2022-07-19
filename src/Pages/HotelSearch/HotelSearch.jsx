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

  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onSearch = (searchDest) => {
    setValue(searchDest)
  }
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
            <input placeholder={destination} type="text" value={value} onChange={onChange}/>
          </div>
          <div className='dropdown'>
            {destData.filter(item => {
              const searchDest = value.toLowerCase()
              const destTerm = item.term.toLowerCase()
              return searchDest && destTerm.startsWith(searchDest) && destTerm !== searchDest
            })
            .map((item) => (
              <div onClick={()=>onSearch(item.uid)} className='dropdown-row'>{item.term}</div>))}
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
            <button onClick={() => console.log(value)}>Search</button>
        </div>
        <div className="searchItem">
        <img src="https://pix10.agoda.net/hotelImages/18391689/0/2c6de0f77a916b78928c57f088f08fc6.jpg?ca=19&ce=1&s=1024x768" className="siImg"  alt={"Hotel Pic"}/>
        <div className="siDesc">
            <h1 className="siTitle">{name}</h1>
            <span className="siDistance">{address}</span>
            <span className="siTaxiOp">{description}</span>
            <span className="siSubtitle">
            Hotel with Air conditioning
            </span>
            <span className="siFeatures">
            Entire studio • 1 bathroom • 21m² 1 full bed
            </span>
            <span className="siCancelOp">Cancellation  with refund!</span>
            <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
            </span>
        </div>
        <div className="siDetails">
            <div className="siRating">
            <span>{rating}</span>
            <button>8.9</button>
            </div>
            <div className="siDetailTexts">
            <span className="siPrice">S$119</span>
            <span className="siTaxOp">Includes taxes and fees</span>
     {/*       <button className="siCheckButton" onClick={handleClicked}>See availability</button> */}
            </div>
        </div>
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
