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
    hotels:[],
    hotelActual:[]
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
  timeout = (delay: number) => {
    return new Promise( res => setTimeout(res, delay) );
  }

  fetch_data = async () => {
    let list = await Promise.all(this.state.hotels.map(async (item) => {
      let res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${item.id}`)
      return res.data
    }))
    return list
  }

  initData = async (dest_id) => {
    console.log(dest_id)
    //const res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${dest_id}`)
    let res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${dest_id}&checkin=2022-08-20&checkout=2022-08-24&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1`);
    await this.timeout(3000)
    res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${dest_id}&checkin=2022-08-20&checkout=2022-08-24&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1`)
    this.setState({
      hotels:res.data.hotels
    })
    console.log(this.state.hotels[0])
    let list = await this.fetch_data()
    //let list = []
    /*console.log(this.state.hotels)
    this.state.hotels.map(async (item) => {
      const hotelRes = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${item.id}`).then(
      list.push(hotelRes.data)
      //console.log(list)
      )
    })
*/
    console.log(list.length)
    const sublist = list.slice(0, this.state.pageSize)
    console.log(sublist)
    await this.setState({
      //hotelActual: list,
      list: sublist,
      totalPage: Math.ceil(list.length / this.state.pageSize),
    }, async () => {
      console.log(this.state.list);
    })
/*    let another_list = []
    another_list = */
/*    await this.setState({

    }, () => {
      console.log(this.state.list)
    })*/



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
    //console.log(dest_id)
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
