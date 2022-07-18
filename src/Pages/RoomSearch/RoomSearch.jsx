import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import RoomItem from '../../Components/RoomItem/RoomItem'
import './RoomSearch.css'
import React, {useState, useEffect} from "react";
import axios from 'axios'



const RoomSearch = () => {

    const [description, setDescription] = useState("Description");
    const [long, setLong] = useState("103.8198");
    const [lat, setLat] = useState("1.3521");
    const [map, setMap] = useState();
    const [name, setName] = useState("Hotel Name");
    const [address, setAddress] = useState("Address");
    const [rating, setRating] = useState("Rating");
    const [amenities_ratings, setAmenities_Ratings] = useState([]);
    const [amenities, setAmenities] = useState("Amenities");
    const [image, setImage] = useState("Image Link");

    const fetchData = async (hotelID) => {
        await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${hotelID}`)
            .then((response) => {
                setName(response.data.name);
                setAddress(response.data.address);
                setDescription(response.data.description);
                setRating(response.data.rating);
                setLong(response.data.longitude);
                setLat(response.data.latitude);
                //setAmenities(response.data.amenities);
                setAmenities_Ratings(response.data.amenities_ratings);
            }).catch(error => console.error(`Error: ${error}`));
    }
    useEffect(() => {
        fetchData("diH7");
    }, []);


    const initMap = () => {
        const marker = new google.maps.Marker({
            position: {lat: lat, lng: long},
            map: map,
        })}


/*    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };
    const Map: React.FC<{}> = () => {};
    const ref = React.useRef(null);
``
    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);*/


    const mapStyles = {
        width: '100%',
        height: '100%',
    };
  return (
    <div className="roomSearch">
      <Navbar/>
      <Header type="list"/>
      <div className="hotel">
        <div className="hotelDetails">
          <div className="hotelDesc">
            <div className="hotelTitle">{name}</div>
            <div className="hotelDesc">
                <div dangerouslySetInnerHTML={{__html: description}}/>
                <div>Overall rating: {rating}</div>
                <div>
                    <ul>
                        {amenities_ratings.map(item =>
                            <li key={item.name}>{item.name}: {item.score}</li>
                        )}
                    </ul>
                </div>
                <div>Hotel address: {address}</div>
            </div>
          </div>
          <img src="https://pix10.agoda.net/hotelImages/18391689/0/2c6de0f77a916b78928c57f088f08fc6.jpg?ca=19&ce=1&s=1024x768" className="hotelImg" />
        </div>
        <div className="hotelRooms">
          <RoomItem/>
          <RoomItem/>
          <RoomItem/>
        </div>
{/*        <div className="hotelMap">
            <Wrapper apiKey={"AIzaSyAuJMYJIl64s1kC9TuYU0OGIDPAf1Ybus4"} render={render}>
                <RoomSearch />
            </Wrapper>
            <div ref={ref} />
        </div>*/}
      </div>
      <Footer/>
    </div>
  )
}

export default RoomSearch

