import './SearchItem.css';
import { Link } from 'react-router-dom';
import React from 'react';

const SearchItem = ({item, price, id}) => {
  return (
    <div className="searchItem">
        <img className="siImg"  src={`${item.image_details.prefix}${item.default_image_index}${item.image_details.suffix}`}  alt={"Hotel Pic"}/>
        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <div className="siAddress">{item.address}</div>
            <div className="siCity">{item.original_metadata.city}, {item.original_metadata.country}</div>
            <div className="siTaxiOp">Airport taxi with 10% off</div>
            <div className="siSubtitle">
            {item.title}
            </div>
            <div className="siCancelOp">Cancellation  with refund!</div>
            <div className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
            </div>
        </div>
        <div className="siDetails">
            <div className="siRating">
            <button>{item.rating}</button>
            </div>
            <div className="siDetailTexts">
            <div className="siPrice">S${price}</div>
            <div className="siTaxOp">Includes taxes and fees</div>
            <Link to={/hotelsearch/+id+/roomsearch/+item.id}>
              <button className="siCheckButton">See availability</button>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem