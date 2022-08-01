import './HotelSearch.css'
import { Button } from 'antd'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import {useLocation, useParams} from "react-router-dom";
import destData from "../../destinations.json"
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from '../../Components/SearchItem/SearchItem';
import Footer from '../../Components/Footer/Footer';
import React from "react";
import axios from "axios";
import DestinationSearch from '../DestinationSearch/DestinationSearch';
import { Link } from 'react-router-dom';

/*function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}*/

class HotelSearch extends React.Component {
  state = {
    list: [],
    totalList: [],
    current_page: 1,  //当前页码
    current_index: 10, //current index of hotel_list
    totalPage: 0,  //总页数
    hotels:[],
    prices: [],
    dest_id: ""
  }
  timeout = (delay: number) => {
    return new Promise( res => setTimeout(res, delay) );
  }

  fetch_data = async () => {
    return await Promise.all(this.state.hotels.slice(0, this.state.current_index).map(async (item) => {
      let res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${item.id}`)
      this.setState(() => {
        this.state.prices.push(item.converted_price)})
      return res.data
    }))
  }

  fetch_data_more = async () => {
    return await Promise.all(this.state.hotels.slice(this.state.current_index, this.state.current_index+10).map(async (item) => {
      let res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${item.id}`)
      this.setState(() => {
        this.state.prices.push(item.converted_price)})
      return res.data
    }))
  }

  initData = async (dest_id) => {
    console.log(dest_id)
    //const res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${dest_id}`)
    let res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${dest_id}&checkin=2022-08-20&checkout=2022-08-25&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1`);
    await this.timeout(3000)
    res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${dest_id}&checkin=2022-08-20&checkout=2022-08-25&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1`)
    this.setState({
      hotels:res.data.hotels,
      totalPage: Math.ceil(res.data.hotels.length / 10),
    })
    let hotel_list = await this.fetch_data()

    await this.setState({
      list: hotel_list,

    })
  }

  loader = async () => {
    await this.timeout(6500)
    let hotel_list_more = await this.fetch_data_more()
    await this.setState({
      current_index: this.state.current_index+10,
      list: hotel_list_more,
      current_page: this.state.current_page + 1,
    })
    console.log("---------------------------------------------")
    // this.pageNext(this.state.goValue, this.state.totalList)
  }
  componentDidMount () {
    const url = window.location.href.toString()
    const dest_id = url.substring(url.lastIndexOf("/") + 1, url.length);
    this.setState({
      dest_id: dest_id
    })
    //console.log(dest_id)
        //const destination_id = this.getQueryVariable('destination_id')
    this.initData(dest_id);
  }

  render() {
    return (
      <>
      <Navbar/>
      <Header type="list"/>
        <div className='listContainer'>
        <div className="listWrapper">
        <div className="listSearch">
          <DestinationSearch/>
          </div>
        <div className="listResult">
          {
            this.state.list.map((item, index) => {
              return (
                  <div className="searchItem">
                  <img src={`${item.image_details.prefix}${item.default_image_index}${item.image_details.suffix}`} className="siImg"  alt={item.name}/>
                  <div className="siDesc">
                      <h1 className="siTitle">{item.name}</h1>
                      <span className="siAddress">{item.address}</span>
                      <span className="siCity">{item.original_metadata.city}</span>
                      <span className="siCountry">{item.original_metadata.country}</span>
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
                      <button>{item.rating}</button>
                      </div>
                      <div className="siDetailTexts">
                      <span className="siPrice">S$ {this.state.prices[(index*2)+this.state.current_index]}</span>
                      <span className="siTaxOp">Includes taxes and fees</span>
                      <Link to={/hotelsearch/+this.state.dest_id+/roomsearch/+item.id}>
                        <button className="siCheckButton">See availability</button>
                      </Link>
                      </div>
                  </div>
              </div>
              )
            })
          }
          </div>
          </div>
          </div>
        </>
    )
  }
}
export default HotelSearch;