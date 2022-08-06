import './Booking.css'
import React, {useState, useContext} from "react";
import axios from 'axios'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import key from '../../secretKey'
import useFetch from './../../hooks/useFetch'
import { SearchContext } from '../../Context/SearchContext';
import { Navigate, useLocation, useNavigate } from "react-router-dom";

var CryptoJS = require("crypto-js")



const Booking = () => {
    const { data, loading, error } = useFetch(`/Kkeys`);
    console.log(data[1])
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [emailAdd, setEmailAdd] = useState('')
    const [cardNum, setCardNum] = useState('')
    const [cardExpiry, setCardExpiry] = useState('')
    const [cardCvc, setCardCvc] = useState('')
    const [billingAdd, setBillingAdd] = useState('')
    const [msg, setMsg] = useState('')
    const {dates,options} = useContext(SearchContext);
    console.log('huh',dates)
    console.log(options)
    const navigate = useNavigate();

    function maskData(cardNo) {
        var firstPart = cardNo.slice(0, 7)
        var lastPart = cardNo.slice(15)
        var maskedPart = ""
        for (var i = 7; i < 15; i++) {
            if (cardNo.charAt(i) === ' ') {
                maskedPart += ' '
            } else {
                maskedPart += 'X'
            }
        }
        var maskedData = firstPart + maskedPart + lastPart
        return maskedData
    }

    function encryption(data) {
        var ciphertext = CryptoJS.AES.encrypt(data, key).toString()
        return ciphertext
    }

    async function delete_key (id){
        try{
            const res = axios.delete(`/Kkeys/${id}`, {});
        }catch(err){}
    }

    async function book (key){
        try{
            const res = axios.post(`/keys/`, {
                key: key,
                firstname: userFirstName,
                lastname: userLastName,
                phoneNumber: phoneNum,
                emailAddress: emailAdd,
                billingAddress: billingAdd,
                numberOfNights: 2,
                startDate: "44",
                endDate: "33",
                numberOfGuests: 1,
                message: msg,
                roomTypes: "single?"
            });
        }catch(err){}
    }



    function handleSubmit(e) {
        delete_key(data[0]._id)
        e.preventDefault()
        var dict = {}
        dict['Phone Number'] = encryption(phoneNum)
        dict['Email Address'] = encryption(emailAdd)
        dict['Billing Address'] = encryption(billingAdd)
        dict['Card Number'] = maskData(cardNum)
        alert(JSON.stringify(dict))
        book(data[0].key)
        setUserFirstName('')
        setUserLastName('')
        setPhoneNum('')
        setEmailAdd('')
        setCardNum('')
        setCardExpiry('')
        setCardCvc('')
        setBillingAdd('')
        navigate('/payment')
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
                                <input className='inputBox' type="text" value={userFirstName}
                                       onChange={(e) => setUserFirstName(e.target.value)} required/>
                            </div>
                            <div className="lastName">
                                Last Name<span class="require">*</span>
                                <input className='inputBox' type="text" value={userLastName}
                                       onChange={(e) => setUserLastName(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="phoneNumber">
                            Phone Number<span class="require">*</span>
                            <input className='inputBox' type="tel" value={phoneNum}
                                   onChange={(e) => setPhoneNum(e.target.value)} required/>
                        </div>
                        <div className="emailAddress">
                            Email Address<span class="require">*</span>
                            <input className='inputBox' type="email" value={emailAdd}
                                   onChange={(e) => setEmailAdd(e.target.value)} required/>
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
                                <textarea classname="Text1" cols="40" rows="5" value={msg}
                                            onChange={(e) => setMsg(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="billingAddress">
                            Billing Address<span class="require">*</span>
                            <div className="textBox">
                                <textarea classname="Text1" cols="40" rows="5" value={billingAdd}
                                          onChange={(e) => setBillingAdd(e.target.value)}></textarea>
                            </div>
                        </div>
                        {/*<input className='submitBtn' type="submit"/>*/}
                        <a href={`/booking`}></a>
                        <input className='submitBtn' type="submit" onClick={handleSubmit}/>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Booking
