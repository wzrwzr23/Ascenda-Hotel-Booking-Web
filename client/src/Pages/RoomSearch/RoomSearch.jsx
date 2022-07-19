import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import './RoomSearch.css'
import React, {useState, useContext} from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../Context/SearchContext'
import Rooms from '../../Components/Rooms/Rooms'

const RoomSearch = () => {

    const [description, setDescription] = useState("Description");
    // const [long, setLong] = useState("103.8198");
    // const [lat, setLat] = useState("1.3521");
    // const [map, setMap] = useState();
    // const [name, setName] = useState("Hotel Name");
    // const [address, setAddress] = useState("Address");
    // const [rating, setRating] = useState("Rating");
    // const [amenities_ratings, setAmenities_Ratings] = useState([]);
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const navigate = useNavigate();
    // const [amenities, setAmenities] = useState("Amenities");
    // const [image, setImage] = useState("Image Link");

    // const fetchData = async (hotelID) => {
    //     await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${hotelID}`)
    //         .then((response) => {
    //             setName(response.data.name);
    //             setAddress(response.data.address);
    //             setDescription(response.data.description);
    //             setRating(response.data.rating);
    //             setLong(response.data.longitude);
    //             setLat(response.data.latitude);
    //             //setAmenities(response.data.amenities);
    //             setAmenities_Ratings(response.data.amenities_ratings);
    //         }).catch(error => console.error(`Error: ${error}`));
    // }
    // useEffect(() => {
    //     fetchData("diH7");
    // }, []);

    const {data, loading, error} = useFetch(`/hotels/find/${id}`);

    const {dates,options} = useContext(SearchContext);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }

    const days = dayDifference(dates[0].endDate, dates[0].startDate)

    // const mapStyles = {
    //     width: '100%',
    //     height: '100%',
    // };
  return (
    <div className="roomSearch">
      <Navbar/>
      <Header type="list"/>
      {loading ? (
        "loading"
      ) : (
      <div className="hotel">
        <div className="hotelDetails">
          <div className="hotelDesc">
            <div className="hotelTitle">{data.name}</div>
            <div className="hotelDesc">
                <div className="rating">Overall rating : 3.5</div>
                <div className='hotelAddress'>Hotel address: {data.address}</div>
                <div className="desc">{data.title}</div>
                <div className="numberOfDays">Book for {options.room} room now! Perfect for {days} days!</div>
            </div>
          </div>
          <img src="https://cdn.cnn.com/cnnnext/dam/assets/191212182124-04-singapore-buildings.jpg" className="hotelImg" />
        </div>
        <div className="hotelRooms">
        <Rooms/>
        </div>
      </div>
      )}
      <Footer/>
    </div>
  )
}

export default RoomSearch

