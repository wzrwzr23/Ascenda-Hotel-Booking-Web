import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import RoomItem from '../../Components/RoomItem/RoomItem'
import './RoomSearch.css'

const RoomSearch = () => {
  return (
    <div className="roomSearch">
      <Navbar/>
      <Header type="list"/>
      <div className="hotel">
        <div className="hotelDetails">
          <div className="hotelDesc">
            <div className="hotelTitle">Orxy Rotana Hotel</div>
            <div className="hotelDesc">Entire studio • 1 bathroom • 21m² 1 full bed</div>
          </div>
          <img src="https://pix10.agoda.net/hotelImages/18391689/0/2c6de0f77a916b78928c57f088f08fc6.jpg?ca=19&ce=1&s=1024x768" className="hotelImg" />
        </div>
        <p>Should change formatting to how u want it to look, ahhh sorry</p>
        <div className="hotelRooms">
          <RoomItem/>
          <RoomItem/>
          <RoomItem/>
        </div>
        <div className="hotelMap">
        <p>Ahh i do not know how to add map</p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default RoomSearch
