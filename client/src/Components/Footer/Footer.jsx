import { faAddressBook, faAt, faLocation, faMailForward, faPhone, faVoicemail } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Footer.css'
import React from 'react'

const Footer = () => {
  return (
    <div className="footer" data-testid="footer">
        <div className="fLists">
            <ul className="fList">
                <li className="fListItem">Countries</li>
                <li className="fListItem">Regions</li>
                <li className="fListItem">Cities</li>
                <li className="fListItem">Districts</li>
                <li className="fListItem">Airports</li>
                <li className="fListItem">Hotels</li>
            </ul>
            <div className="fBox">
                <div className="fBoxItem">
                    <FontAwesomeIcon icon={faLocation} />
                    <span><h2>Address</h2></span><br/><br />
                </div>
                380 Jln Besar, Singapore 209000
                <div className="fBoxItem" data-testid="phone">
                    <FontAwesomeIcon icon={faPhone} />
                    <span><h2>Phone</h2></span><br/><br />
                </div>
                +65 88730488
                <div className="fBoxItem">
                    <FontAwesomeIcon icon={faAt} />
                    <span><h2>Email</h2></span><br/><br />
                </div>
                customerservice@ascenda.com
            </div>
        </div>
        <div className="fText">Copyright © 2022 Ascenda Hotel Booking</div>
    </div>
  )
}

export default Footer