import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import React from 'react'
import ImageSlide from './ImageSlide';
import DestinationSearch from '../DestinationSearch/DestinationSearch';

const Homepage = () => {
  return (
    <>
    <div id='homewrap'>
      <Navbar/>
      <Header/>
      <div className="destination">
        <ImageSlide/>
        <DestinationSearch/>
      </div>
      {/* <div className="homeContainer">
          <Featured/>
      </div> */}
      {/* <h1>Display1</h1>
      <h1>Display2</h1>
      <h1>Display3</h1> */}
      <Footer/>
    </div>
    </>
  );
}

export default Homepage
