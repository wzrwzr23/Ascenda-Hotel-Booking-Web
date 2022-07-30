import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import './RoomItem.css'
import { useNavigate } from "react-router-dom";

const RoomItem = () => {
  const navigate = useNavigate();
  const room = 233;
  const handleClicked = () => {
    navigate(`/booking`, { state: { room } });
  };
  return (
    <div className="roomItem">
        <img src="https://pix10.agoda.net/hotelImages/18391689/0/2c6de0f77a916b78928c57f088f08fc6.jpg?ca=19&ce=1&s=1024x768" className="riImg" />
        <div className="riDesc">
            <h1 className="riTitle">Deluxe Room</h1>
            <div className="riRating">
              <span className="r1"><FontAwesomeIcon icon={faStar} /></span>
              <span className="r2"><FontAwesomeIcon icon={faStar} /></span>
              <span className="r3"><FontAwesomeIcon icon={faStar} /></span>
              <span className="r4"><FontAwesomeIcon icon={faStar} /></span>
              <span className="r5"><FontAwesomeIcon icon={faStarHalf} /></span>
            </div>
            <span className="riSubtitle">
            Room with Air Contionining
            </span>
            <span className="riFeatures">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </span>
            <span className="riPrice">From S$50.6/night</span>
            <button className="riCheckButton" onClick={handleClicked}>Book Now!</button>
        </div>
    </div>
  )
}

export default RoomItem