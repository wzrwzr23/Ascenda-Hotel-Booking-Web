import './SearchItem.css';
import { Link } from 'react-router-dom';
import React from 'react';

const SearchItem = ({item, price, id}) => {
  return (
    <div className="searchItem" id="searchItem">
        <img className="siImg"  src={(item == undefined ? null : `${item.image_details.prefix}${item.default_image_index}${item.image_details.suffix}`)}  alt={"Hotel Pic"}/>
        <div className="siDesc">
            <h1 className="siTitle">{(item == undefined ? null :item.name)}</h1>
            <div className="siAddress">{(item == undefined ? null :item.address)}</div>
            <div className="siCity">{(item == undefined ? null :item.original_metadata.city)}, {(item == undefined ? null :item.original_metadata.country)}</div>
            <div className="siTaxiOp">Airport taxi with 10% off</div>
            <div className="siSubtitle">
            {(item == undefined ? null :item.title)}
            </div>
            <div className="siCancelOp">Cancellation  with refund!</div>
            <div className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
            </div>
        </div>
        <div className="siDetails">
            <div className="siRating">
            <button>{(item == undefined ? null :item.rating)}</button>
            </div>
            <div className="siDetailTexts">
            <div className="siPrice">S${price}</div>
            <div className="siTaxOp">Includes taxes and fees</div>
            <Link to={/hotelsearch/+id+/roomsearch/+(item == undefined ? null :item.id)}>
              <button className="siCheckButton">See availability</button>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem