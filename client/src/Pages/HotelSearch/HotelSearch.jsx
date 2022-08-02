import './HotelSearch.css'
import { Button } from 'antd'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import {useLocation, useParams} from "react-router-dom";
import destData from "../../destinations.json"
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from '../../Components/SearchItem/SearchItem';
import React from "react";
import axios from "axios";
import SideSearch from './../../Components/SideSearch/SideSearch'
import { Link } from 'react-router-dom';
import LoadingSpinner from "./../../Components/Loading/Loading";

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
    dest_id: "",
    loading: false
  }
  timeout = (delay: number) => {
    return new Promise( res => setTimeout(res, delay) );
  }

  fetch_data = async () => {
    this.state.loading = true;
    return await Promise.all(this.state.hotels.slice(0, this.state.current_index).map(async (item) => {
      let res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${item.id}`)
      this.setState(() => {
        this.state.prices.push(item.converted_price)})
      this.state.loading = false;
      return res.data
    }))
  }

  fetch_data_more = async () => {
    this.state.loading = true;
    return await Promise.all(this.state.hotels.slice(this.state.current_index, this.state.current_index+10).map(async (item) => {
      let res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${item.id}`)
      this.setState(() => {
        this.state.prices.push(item.converted_price)})
      this.state.loading = false;
      return res.data
    }))
  }

  initData = async (dest_id) => {
    this.state.loading = true;
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
    this.state.loading = false;
  }

  loader = async () => {
    this.state.loading = true;
    await this.timeout(6500)
    let hotel_list_more = await this.fetch_data_more()
    await this.setState({
      current_index: this.state.current_index+10,
      list: hotel_list_more,
      current_page: this.state.current_page + 1,
    })
    console.log("---------------------------------------------")
    this.state.loading = false;
    // this.pageNext(this.state.goValue, this.state.totalList)
  }
  componentDidMount () {
    this.state.loading = true;
    const url = window.location.href.toString()
    const dest_id = url.substring(url.lastIndexOf("/") + 1, url.length);
    this.setState({
      dest_id: dest_id
    })
    //console.log(dest_id)
        //const destination_id = this.getQueryVariable('destination_id')
    this.initData(dest_id);
    this.state.loading = false;
  }

  render() {
    return (
      <div className='HotelSearch'>
      <Navbar/>
      <Header type="list"/>
        <div className='listContainer'>
        <div className="listWrapper">
        <div className="listSearch">
          <SideSearch/>
          </div>
          <div className="listResult"> 
          {this.state.loading ? (
              <LoadingSpinner /> 
            ) : (
              <>
                {this.state.list.map((item, index) => (
                  <SearchItem item={item} price={this.state.prices[(index*2)+this.state.current_index]} id={this.state.dest_id} />
                ))}
              </>
          )}
          <div className="Center" align='center'>
            {this.state.current_page >= this.state.totalPage ? null : <Button type='primary' onClick={this.loader}>More</Button>}
          </div>
        </div>
        </div>
        </div>
        <Footer/>
        </div>
    )
  }
}
export default HotelSearch;