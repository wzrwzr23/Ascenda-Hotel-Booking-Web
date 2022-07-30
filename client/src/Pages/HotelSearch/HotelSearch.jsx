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
    current: 1,  //当前页码
    pageSize: 10, //每页显示条数
    totalPage: 0,  //总页数
  }
  /*getQueryVariable = (variable) => {
    // 从?开始获取后面的所有数据
    var query = window.location.search.substring(1)
    // 从字符串&开始分隔成数组split
    var vars = query.split("&")
    // 遍历该数组
    for (var i = 0; i < vars.length; i++) {
      // 从等号部分分割成字符
      var pair = vars[i].split("=")
      // 如果第一个元素等于 传进来的参的话 就输出第二个元素
      if (pair[0] === variable) return pair[1]
    }
    return false
  }*/


  initData = async (dest_id) => {
    console.log(dest_id)
    const res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${dest_id}`)
    //const res = await axios.get(url)
    this.setState({
      list: res.data.slice(0, this.state.pageSize),
      totalList: res.data,
      totalPage: Math.ceil(res.data.length / this.state.pageSize),
    })
    // const res = axios.get(``)
    // https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=RsBU&checkin=2021-03-31&checkout=2021-04-01&lang=en_US&currency=SGD&landing_page=&partner_id=16&country_code=SG&guests=2
    // https://hotelapi.loyalty.dev/api/hotels/diH7/price?destination_id=RsBU&checkin=2021-03-31&checkout=2021-04-01&lang=en_US&currency=SGD&partner_id=16&country_code=SG&guests=2
  }

  loadmore = () => {
    // 0, 10 1
    // 10, 20 2
    // 20, 30, 3
    this.setState({
      list: this.state.totalList.slice(0, (this.state.current + 1) * this.state.pageSize),
      current: this.state.current + 1,
    })
    // this.pageNext(this.state.goValue, this.state.totalList)
  }
  componentDidMount () {
    const url = window.location.href.toString()
    const dest_id = url.substring(url.lastIndexOf("/") + 1, url.length);
    console.log(dest_id)
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
                      <span className="siPrice">S$22</span>
                      <span className="siTaxOp">Includes taxes and fees</span>
                      <Link to={`/roomsearch/`+item.id}>
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