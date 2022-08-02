import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import DestinationSearch from '../DestinationSearch/DestinationSearch';
import ImageSlide from './ImageSlide'
import React from 'react'

const Homepage = () => {

  return (
    <>
    <div id='homewrap'>
      <Navbar/>
      <Header type="list"/>
      <div className="imageshow"><ImageSlide/></div>
        <DestinationSearch/>
      <Footer/>
    </div>
    </>
  );
}

export default Homepage
