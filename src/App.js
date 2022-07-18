//import logo from './logo.svg';
//import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Feature1 from "./Pages/DestinationSearch/DestinationSearch";
import Feature2 from "./Pages/HotelSearch/HotelSearch";
import Feature3 from "./Pages/RoomSearch/RoomSearch";
import Feature4 from "./Pages/Booking/Booking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/destinationsearch" element={<Feature1/>}/>
        <Route path="/hotelsearch" element={<Feature2/>}/>
        <Route path="/hotelsearch/:id" element={<Feature3/>}/>
        <Route path="/booking" element={<Feature4/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
