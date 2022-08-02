import './Payment.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import React, { useState } from 'react';
import ReactDOM  from 'react-dom';
import key from '../../secretKey'
var CryptoJS = require("crypto-js")

const Payment = () => {
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [emailAdd, setEmailAdd] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [specialReq, setSpecialReq] = useState('')
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
    var fullName = userFirstName + userLastName
    dict['Full Name'] = encryption(fullName)
    dict['Phone Number'] = encryption(phoneNum)
    dict['Email Address'] = encryption(emailAdd)
    dict['Card Number'] = maskData(cardNum)
    dict['Billing Address'] = encryption(billingAdd)
    dict['Special Requests'] = specialReq
    alert(JSON.stringify(dict))
    setUserFirstName('')
    setUserLastName('')
    setPhoneNum('')
    setEmailAdd('')
    setCardNum('')
    setCardExpiry('')
    setCardCvc('')
    setSpecialReq('')
    setBillingAdd('')
  }

  return (
      <>
          <Navbar/>
          <Header type="list"/>



          <div className="row">
              <div className="col-75">
                  <div className="container">
                      <form>
                          <div className="row">

                              <div className="col-50">
                                  <h3>Payment</h3>
                                  <label htmlFor="fname">Accepted Cards</label>
                                  <div className="icon-container">
                                      <i className="fa fa-cc-visa" style={{color: 'navy'}} />
                                      <i className="fa fa-cc-amex" style={{color: 'blue'}} />
                                      <i className="fa fa-cc-mastercard" style={{color: 'red'}} />
                                      <i className="fa fa-cc-discover" style={{color: 'orange'}} />
                                  </div>

                                  <label htmlFor="cname">Name on Card</label>
                                  <input type="text" id="cname" name="cardname" placeholder="John More Doe"  required/>
                                  <label htmlFor="ccnum">Credit card number</label>
                                  <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" required />
                                  <label htmlFor="expmonth">Exp Month</label>
                                  <input type="text" id="expmonth" name="expmonth" placeholder="September" required />
                                  <div className="row">
                                      <div className="col-50">
                                          <label htmlFor="expyear">Exp Year</label>
                                          <input type="text" id="expyear" name="expyear" placeholder={2018} required />
                                      </div>
                                      <div className="col-50">
                                          <label htmlFor="cvv">CVV</label>
                                          <input type="text" id="cvv" name="cvv" placeholder={352} required/>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <input type="submit" defaultValue="Continue to checkout" className="btn" />
                      </form>
                  </div>
              </div>
              <div className="col-25">
                  <div className="container">

                      <p>Total <span className="price" style={{color: 'black'}}><b>$30</b></span></p>
                  </div>
              </div>
          </div>


          <Footer/>
      </>





  );
}

export default Payment
