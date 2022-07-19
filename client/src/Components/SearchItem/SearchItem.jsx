import './SearchItem.css';
import { Link } from 'react-router-dom';

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
        <img src={item.images[0]} className="siImg"  alt={"Hotel Pic"}/>
        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siAddress">{item.address}</span>
            <span className="siTaxiOp">Airport taxi with 10% off</span>
            <span className="siSubtitle">
            {item.title}
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
            <span className="siPrice">S${item.price}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
              <button className="siCheckButton">See availability</button>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem