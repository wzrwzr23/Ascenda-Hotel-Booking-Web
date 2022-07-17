import { faAddressBook, faAt, faLocation, faMailForward, faPhone, faVoicemail } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
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
                205 Fida Walinton, Tongo Street Front The USA
                <div className="fBoxItem">
                    <FontAwesomeIcon icon={faPhone} />
                    <span><h2>Phone</h2></span><br/><br />
                </div>
                +123 456 7898
                <div className="fBoxItem">
                    <FontAwesomeIcon icon={faAt} />
                    <span><h2>Email</h2></span><br/><br />
                </div>
                hello@ecorik.com
            </div>
        </div>
        <div className="fText">Copyright © 2022 Ascenda Hotel Booking</div>
    </div>
  )
}

export default Footer