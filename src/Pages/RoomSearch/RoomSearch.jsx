import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import RoomItem from '../../Components/RoomItem/RoomItem'
import './RoomSearch.css'
import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios'
import { GoogleMap, useLoadScript, Marker, LoadScript } from "@react-google-maps/api";
const google = window.google;


const RoomSearch = () => {

    const [description, setDescription] = useState("Description");
    const [long, setLong] = useState(10);
    const [lat, setLat] = useState(10);
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
        fetchData("00bv");
    }, []);


/*    const center = useMemo(() => ({ lat: lat, lng: long }), []);
    useLoadScript({
        googleMapsApiKey: "AIzaSyAuJMYJIl64s1kC9TuYU0OGIDPAf1Ybus4",
    });*/

    const mapStyles = {
            height: "100vh",
            width: "100%"};

    const defaultCenter = {
            lat: parseFloat(lat), lng: parseFloat(long)
        }

/*    const initMap = () => {
        const myCenter = new google.maps.LatLng(lat, long)
        const mapProp = {
            center: myCenter,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        const map = new google.maps.Map(document.getElementById("map"), mapProp)
        const marker = new google.maps.Marker({
            position: myCenter,
        })
        marker.setMap(map)
        const infoWindow = new google.maps.InfoWindow({
        })

        infoWindow.open(map, marker);
    }
    initMap()*/

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
          <LoadScript
              googleMapsApiKey='AIzaSyAuJMYJIl64s1kC9TuYU0OGIDPAf1Ybus4'>
              <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={13}
                  center={defaultCenter}
              />
          </LoadScript>
      </div>
      <Footer/>
    </div>
  )
}

export default RoomSearch

