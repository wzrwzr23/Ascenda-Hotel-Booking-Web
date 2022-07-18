import './SearchItem.css';
import { useNavigate } from "react-router-dom";

const SearchItem = () => {
  const navigate = useNavigate();
  const id = 233;
  const handleClicked = () => {
    navigate(`/hotelsearch/id`, { state: { id } });
  };
  return (
    <div className="searchItem">
        <img src="https://pix10.agoda.net/hotelImages/18391689/0/2c6de0f77a916b78928c57f088f08fc6.jpg?ca=19&ce=1&s=1024x768" className="siImg"  alt={"Hotel Pic"}/>
        <div className="siDesc">
            <h1 className="siTitle">Oryx Rotana Hotel</h1>
            <span className="siDistance">500m from center</span>
            <span className="siTaxiOp">Airport taxi with 10% off</span>
            <span className="siSubtitle">
            Hotel with Air conditioning
            </span>
            <span className="siFeatures">
            Entire studio • 1 bathroom • 21m² 1 full bed
            </span>
            <span className="siCancelOp">Cancellation  with refund!</span>
            <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
            </span>
        </div>
        <div className="siDetails">
            <div className="siRating">
            <span>Excellent</span>
            <button>8.9</button>
            </div>
            <div className="siDetailTexts">
            <span className="siPrice">S$119</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <button className="siCheckButton" onClick={handleClicked}>See availability</button>
            </div>
        </div>
    </div>
  )
}

export default SearchItem