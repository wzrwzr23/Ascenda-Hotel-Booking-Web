import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import React from 'react'
import { useState } from 'react'
import destData from '../../destinations.json'
import './DestinationSearch.css'

// import './DestinationSearch.css'

const DestinationSearch = () => {
  const [userDest, setUserDest] = useState('')
  const [filteredDest, setFilteredDest] = useState([])
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [numChild, setNumChild] = useState()
  const [numAdult, setNumAdult] = useState()
  const [numRoom, setNumRoom] = useState()

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

  function getUID(value, file) {
    for (var i=0; i<file.length; i++) {
      var obj = file[i]
      if (value === obj.term) {
        return obj.uid
      }
    }
  }
  return (
    // <div>Destination Search</div>
    <section className='destform'>
      <div className='dest-container'>
        <h2>Enjoy Your Stay</h2>  
        <span>Search and Book Hotel</span>

        <form action=''>
          <div className='usersearch'>
            <input type='text' placeholder='Search City' name='' id='' value={userDest} onChange={(e) => searchDest(e.target.value)} data-testid='searchinput'/>
          </div>
          <div className='dropdown' data-testid="filter-dest">
            {filteredDest.map((item) => {return (
              <div  className='dropdown-row' style={{color: 'black'}} onClick={() => searchDest(item.term)}>{item.term}</div>
            )})}
          </div>
          <div className='data-space'>
            <input type='date' placeholder='Check In' value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)}/>
            <input type='date' placeholder='Check Out' value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)}/>
          </div>
          <div className='data-space'>
            <input type='number' placeholder='Number of Children' min='0' value={numChild} onChange={(e) => setNumChild(e.target.value)}/>
            <input type='number' placeholder='Number of Adults' min='0' value={numAdult} onChange={(e) => setNumAdult(e.target.value)}/>
          </div>
          <input type='number' placeholder='Number of Rooms' className='room' min='1' value={numRoom} onChange={(e) => setNumRoom(e.target.value)}/>
        </form>
        <button type='Submit' className='submitDest' data-testid='submit' onClick={() => console.log(numChild)}>Search</button>
      </div>
    </section>
  ) 
}

export default DestinationSearch
