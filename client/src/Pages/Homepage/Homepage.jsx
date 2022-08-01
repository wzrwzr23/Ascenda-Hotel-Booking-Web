import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import Featured from '../../Components/Featured/Featured';
import React from 'react'

const Homepage = () => {
  return (
    <>
    <Navbar/>
    <Header/>
    <br />
    <div className="homeContainer">
        <Featured/>
    </div>
    <h1>Display1</h1>
    <h1>Display2</h1>
    <h1>Display3</h1>
    <Footer/>
    </>
  );
}

export default Homepage
