import './Booking.css'
import React from "react";
import { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import { useSearchParams } from 'react-router-dom';
import key from '../../secretKey'
var CryptoJS = require("crypto-js")


const Booking = () => {
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [emailAdd, setEmailAdd] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [billingAdd, setBillingAdd] = useState('')

  function maskData(cardNo) {
    var firstPart = cardNo.slice(0, 7)
    var lastPart = cardNo.slice(15)
    var maskedPart = ""
    for (var i = 7; i < 15; i++) {
      if (cardNo.charAt(i) === ' ') {maskedPart += ' '}
      else {maskedPart += 'X'}
    }
    var maskedData = firstPart + maskedPart + lastPart
    return maskedData
  }
  
  function encryption(data) {
    var ciphertext = CryptoJS.AES.encrypt(data, key).toString()
    return ciphertext
  }

  function handleSubmit(e) {
    e.preventDefault()
    var dict = {}
    dict['Phone Number'] = encryption(phoneNum)
    dict['Email Address'] = encryption(emailAdd)
    dict['Billing Address'] = encryption(billingAdd)
    dict['Card Number'] = maskData(cardNum)
    alert(JSON.stringify(dict))
    setUserFirstName('')
    setUserLastName('')
    setPhoneNum('')
    setEmailAdd('')
    setCardNum('')
    setCardExpiry('')
    setCardCvc('')
    setBillingAdd('')
  }

  return (
    <>
    <Navbar/>
    <Header type="list"/>
    <div className="booking">
      <div className="bookingUserDetails">
        <h1 className="detailsTitle">BOOKING</h1>
        <h2 className="detailsSubTitle">User Details</h2>
        <form className='user'>
            <br/>
            <br/>
            <div className="userName">
              <select name="salutation" className="salutation">
                  <option value="select">Select an option</option>
                  <option value="mr">Mr</option>
                  <option value="mrs">Mrs</option>
                  <option value="miss">Miss</option>
              </select>
              <div className="firstName">
                First Name<span class="require">*</span>
                <input className='inputBox' type="text" value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)} required/>
              </div>
              <div className="lastName">
                Last Name<span class="require">*</span>
                <input className='inputBox' type="text" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} required/>
              </div>
            </div>
            <div className="phoneNumber">
              Phone Number<span class="require">*</span>
              <input className='inputBox' type="tel" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} required/>
            </div>
            <div className="emailAddress">
              Email Address<span class="require">*</span>
              <input className='inputBox' type="email" value={emailAdd} onChange={(e) => setEmailAdd(e.target.value)} required/>
            </div>
            <div className="cardNumber">
              Card Number<span class="require">*</span>
              <input 
                className='inputBox'
                name='number'
                placeholder='0000 0000 0000 0000'
                type="tel"
                pattern="^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$" 
                value={cardNum}
                onChange={(e) => setCardNum(e.target.value)}
                // onChange={(event) => {
                //   const {value} = event.target
                //   event.target.value = normalizeCardNumber(value)
                // }}
                required
              />
            </div>
            <div className="cardExpiry">
              Card Expiry<span class="require">*</span>
              <input 
                className='inputBox'
                name='expiry'
                placeholder='MM/YY'
                type="tel"
                pattern="^[0-9]{2}/[0-9]{2}$" 
                value={cardExpiry}
                onChange={e => setCardExpiry(e.target.value)}
                // onChange={(event) => {
                //   const {value} = event.target
                //   event.target.value = normalizeCardExpiry(value)
                // }}
                required
              />
            </div>
            <div className="cardCVC">
              CVV/CVC<span class="require">*</span>
              <input 
                className='inputBox'
                name='cvc'
                placeholder='CVC/CVV'
                type="tel"
                pattern="^[0-9]{3}$" 
                value={cardCvc}
                onChange={e => setCardCvc(e.target.value)}
                // onFocus={e => setFocus(e.target.name)}
                // onChange={(event) => {
                //   const {value} = event.target
                //   event.target.value = normalizeCardNumber(value)
                // }}
                required
              />
            </div>
            <div className="specials">
              Special Requests:
              <div className="textBox">
                <textarea classname="Text1" cols="40" rows="5"></textarea>
              </div>
            </div>
            <div className="billingAddress">
              Billing Address<span class="require">*</span>
              <div className="textBox">
                <textarea classname="Text1" cols="40" rows="5" value={billingAdd} onChange={(e) => setBillingAdd(e.target.value)} ></textarea>
              </div>
            </div>
            {/*<input className='submitBtn' type="submit"/>*/}
            <a href={`/booking/`}></a>
            <input className='submitBtn' type="submit" onClick={handleSubmit}/>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Booking
