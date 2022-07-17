import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import RoomItem from '../../Components/RoomItem/RoomItem'
import './RoomSearch.css'
import React, {useState, useEffect} from "react";
import axios from 'axios'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
const google = window.google;

const RoomSearch = () => {
    const [description, setDescription] = useState("Description");
    const [long, setLong] = useState("103.8198");
    const [lat, setLat] = useState("1.3521");
    const [map, setMap] = useState();
    const [name, setName] = useState("Hotel Name");
    const [address, setAddress] = useState("Address");
    const [rating, setRating] = useState("Rating");
    const [amenities_ratings, setAmenities_Ratings] = useState("Amenities_ratings");
    const [amenities, setAmenities] = useState("Amenities");

/*    const getQueryParams = (params) => {
        let query = window.location.search.substring(1);
        let variable = query.split("&");
        for (let i = 0; i < variable.length; i++){
            let split_by_equal_sign = variable[i].split("=")
            if(split_by_equal_sign[0] == params) return split_by_equal_sign[1]
        }
    }*/

    useEffect(() => {
        const url = "https://hotelapi.loyalty.dev/api/hotels/${hotelID}";
        const fetchData = async (hotelID) => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json.name);
                setName(json.name);
                setAddress(json.address);
                setLat(json.latitude);
                setLong(json.longitude);
            }catch (error){
                console.log("error", error)
            }
        }
        fetchData("diH7");
    }, []);


/*    const initMap = () => {
        const coordinate = new google.map
    }
    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };
    const Map: React.FC<{}> = () => {};
    const ref = React.useRef(null);

    React.useEffect(() => {
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

