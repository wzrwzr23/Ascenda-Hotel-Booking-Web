import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import RoomItem from '../../Components/RoomItem/RoomItem'
import './RoomSearch.css'
import React, {useEffect, useState} from "react";
import axios from 'axios'
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";


function RoomSearch() {

    const [description, setDescription] = useState("Description");
    const [long, setLong] = useState(10);
    const [lat, setLat] = useState(10);
    const [name, setName] = useState("Hotel Name");
    const [address, setAddress] = useState("Address");
    const [rating, setRating] = useState("Rating");
    const [amenities_ratings, setAmenities_Ratings] = useState([]);
    const [amenities, setAmenities] = useState("Amenities");
    const [image_detail, setImage_detail] = useState("Image Prefix");
    const [hires_image_index, setHires_image_index] = useState("hires_image_index");
    const [default_image_index, setDefault_image_index] = useState(1);

    const fetchData = async (hotelID) => {

        await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${hotelID}`)
            .then((response) => {
                setName(response.data.name);
                setAddress(response.data.address);
                setDescription(response.data.description);
                setRating(response.data.rating);
                setLong(response.data.longitude);
                setLat(response.data.latitude);
                setAmenities(response.data.amenities);
                setAmenities_Ratings(response.data.amenities_ratings);
                setImage_detail(response.data.image_details);
                setDefault_image_index(response.data.default_image_index);

                console.log(image_detail);
                /* setHires_image_index(response.data.hires_image_index);
                */

                /*let arr = hires_image_index ? hires_image_index.split(',') : [default_image_index], newSwiperList = []
                arr.forEach((v, i) => {
                    newSwiperList.push({
                        name: name,
                        imgs: {${image_prefix}${v}${image_suffix}}
                    })
                })*/

            }).catch(error => console.error(`Error: ${error}`));
    }
    useEffect(() => {
        const url = window.location.href.toString()
        const hotel_id = url.substring(url.lastIndexOf("/") + 1, url.length);
        console.log(hotel_id)
        fetchData(hotel_id);
    }, []);

    /*    set_Img_link(image_prefix+default_image_index+image_suffix);
        console.log(img_link);*/

    /*
        setImage_suffix(imd);
        console.log(image_suffix);*/

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: parseFloat(lat), lng: parseFloat(long)
    }
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
                    <img src={image_detail.prefix + default_image_index + image_detail.suffix}
                         className="hotelImg"/>
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
                        center={defaultCenter}>
                        <Marker
                            position={defaultCenter}/>
                    </GoogleMap>
                </LoadScript>
            </div>
            <Footer/>
        </div>
    )
}

export default RoomSearch

