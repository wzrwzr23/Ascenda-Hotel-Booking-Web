import React from 'react'
// import './DestinationSearch.css'

const DestinationSearch = () => {
  return (
    // <div>Destination Search</div>
    <section className='destform'>
      <div className='dest-container'>
        <h2>Enjoy Your Stay</h2>  
        <span>Search and Book Hotel</span>

        <form action=''>
          <input type='text' placeholder='Search City' name='' id=''/>
          <div className='data-space'>
            <input type='date' placeholder='Check In'/>
            <input type='date' placeholder='Check Out'/>
          </div>
          <div className='data-space'>
            <input type='number' placeholder='Number of Guests'/>
          </div>
          <input type='number' placeholder='Number of Rooms' className='room'/>
          <input type='Submit' value='Search' className='submitDest'/>
        </form>
      </div>
    </section>
  ) 
}

export default DestinationSearch
