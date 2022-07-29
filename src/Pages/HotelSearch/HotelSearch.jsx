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
        <div className='listContainer'>
          {
            this.state.list.map((item, index) => {
              return (
                  /*<a href={`/detail?id=${item.id}`} key={index}>*/
                  <a href={`/roomsearch/`+item.id} key={index}>
                    <img src={`${item.image_details.prefix}${item.default_image_index}${item.image_details.suffix}`} alt={item.name} />
                    <div>
                      <div>
                        <p>Name: {item.name}</p>
                        <p>Rating: {item.rating}</p>
                      </div>
                      <p>Address: {item.address}</p>
                      <p>City: {item.original_metadata.city}</p>
                      <p>Country: {item.original_metadata.country}</p>
                    </div>
                  </a>
              )
            })
          }
        </div>
    )
  }
}
export default HotelSearch;
