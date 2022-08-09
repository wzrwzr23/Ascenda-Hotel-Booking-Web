//import logo from './logo.svg';
//import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Feature1 from "./Pages/DestinationSearch/DestinationSearch";
import Feature2 from "./Pages/HotelSearch/HotelSearch";
import Feature2New from "./Pages/HotelSearch/HotelSearch2"
import Feature3 from "./Pages/RoomSearch/RoomSearch";
import Feature4 from "./Pages/Booking/Booking";
import Login from "./Pages/Login/Login";
import Payment from './Pages/Payment/Payment'
import React from 'react'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
       {/* <Route path="/destinationsearch" element={<Feature1/>}/>*/}
        <Route path="/hotelsearch/:id" element={<Feature2/>}/>
        <Route path="/hotelsearch2/:id" element={<Feature2New/>}/>
        <Route path="/hotelsearch/:id/roomsearch/:id" element={<Feature3/>}/>
        <Route path="/hotelsearch/:id/roomsearch/:id/booking" element={<Feature4/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
