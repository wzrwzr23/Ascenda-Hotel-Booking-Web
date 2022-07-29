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
import axios from "axios";


const HotelSearch = (props) => {
  /*const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);


  const [userDest, setUserDest] = useState('')
  const [filteredDest, setFilteredDest] = useState([])
  const filterDest = (event) => {
    const userSearch = event 
    const lowercase = userSearch.toLowerCase()
    setUserDest(userSearch)
    const Filter = destData.filter((item) => {
      const destTerm = item.term.toLowerCase()
      return lowercase && destTerm.startsWith(lowercase) && destTerm !== lowercase
    })
    if (userSearch === '') {
      setFilteredDest([])
    } else {setFilteredDest(Filter.slice(0,10))}
  }

  function getUID(value, file) {
    for (var i=0; i<file.length; i++) {
      var obj = file[i]
      if (value === obj.term) {
        return obj.uid
      }
    }
  }*/
  const [single_page_list, setSingle_page_list] = useState([]);
  const [all_list, setAll_list] = useState([]);
  const [page_num, setPage_num] = useState(1);
  const [page_list_num, setPage_list_num] = useState(10);
  const [total_page_num, setTotal_page_num] = useState(0);

  /*const [query_var, setQuery_var] = useState();
  let flag = false;*/

  /*const getQueryVar = (variable) => {
    flag = true;
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] === variable) {
        setQuery_var(pair[1]);
      }
    }
    flag = false;
  }*/
  const initData = async (dest_id) => {
    console.log(dest_id);
    const res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${dest_id}`);
    setSingle_page_list(res.data.slice(0, page_list_num));
    setAll_list(res.data);
    setTotal_page_num(Math.ceil(res.data.length / page_list_num));
  }
  const load = () => {
    setSingle_page_list(all_list.slice(0, (page_num+1) * page_list_num));
    setPage_num(page_num+1);
  }
  useEffect(() => {
    //getQueryVar('dest_id')
    //const dest_id = query_var;
    initData("");
  })

  return (
      <>
        {/*<Navbar/>
        <Header type="list"/>*/}
        <div>
          {
            single_page_list.map((item, index) => {
              return (
                  <a href={`/detail?id=${item.id}`} key={index}>
                    <img src={`${item.image_details.prefix}${item.default_image_index}${item.image_details.suffix}`} alt={item.name} />
                    <div>
                      <div>
                        <p>Name: {item.name}</p>
                        <p>Rating: {item.rating}</p>
                      </div>
                      <p>Address: {item.address}</p>
                      <p>City: {item.original_metadata.city}</p>
                      <p>Country: {item.original_metadata.country}</p>
                    </div>
                  </a>
              )
            })
          }
        </div>
        <div>
          {page_num >= total_page_num ? null : <button type='primary' onClick={load()}>Loading...</button>}
        </div>
        {/*<div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input placeholder={destination} type="text" value={userDest} onChange={(e) => filterDest(e.target.value)}/>
              </div>
              <div className='dropdown'>
            {filteredDest.map((item) => {return (<div className='dropdown-row' style={{color:'black'}} onClick={() => filterDest(item.term)}>{item.term}</div>)})}
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
              <div>
                {
                  single_page_list.map((item, index) => {
                    return (
                        <a href={`/detail?id=${item.id}`} key={index}>
                          <img src={`${item.image_details.prefix}${item.default_image_index}${item.image_details.suffix}`} alt={item.name} />
                          <div>
                            <div>
                              <p>Name: {item.name}</p>
                              <p>Rating: {item.rating}</p>
                            </div>
                            <p>Address: {item.address}</p>
                            <p>City: {item.original_metadata.city}</p>
                            <p>Country: {item.original_metadata.country}</p>
                          </div>
                        </a>
                    )
                  })
                }
              </div>
              <div>
                {page_num >= total_page_num ? null : <button type='primary' onClick={load()}>Loading...</button>}
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
              <button onClick={() => console.log(getUID(userDest, destData))}>Search</button>
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
        </div>*/}
        {/*<Footer />*/}
      </>
  )
}

export default HotelSearch
