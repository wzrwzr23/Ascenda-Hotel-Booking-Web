import './Payment.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import React, { useState } from 'react';
import ReactDOM  from 'react-dom';
import key from '../../secretKey'
import { Link } from 'react-router-dom';
var CryptoJS = require("crypto-js")

const Payment = () => {

  return(
    <>
      <Navbar/>
      <Header type='list'/>
      <div className="confirm">
        <div className="confirmation">
          PAYMENT CONFIRMED!
        </div>
        <div className="button" data-testid="button">
          <Link to={`/`}>
            <button className="homepage" id="confirm">
              Go back to homepage
            </button>
          </Link>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Payment
