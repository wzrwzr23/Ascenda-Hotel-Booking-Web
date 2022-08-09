import './HotelSearch.css'
import {Button} from 'antd'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import SearchItem from '../../Components/SearchItem/SearchItem';
import React from "react";
import axios from "axios";
// import DestinationSearch from '../DestinationSearch/DestinationSearch';
import SideSearch from '../../Components/SideSearch/SideSearch2'
import LoadingSpinner from "./../../Components/Loading/Loading";
import {SearchContext} from "../../Context/SearchContext";

class HotelSearch extends React.Component {
  state = {
    list: [],
    current_page: 1,  //current number of page
    current_index: 10, //current index of hotel_list
    totalPage: 0,  //total number of page
    hotels:[],
    prices: [],
    dest_id: "",
    loading: false
  }

  static contextType = SearchContext

  timeout = (delay: number) => {
    return new Promise( res => setTimeout(res, delay) );
  }

  fetch_data = async () => {
    this.state.loading = true;
    return await Promise.all(this.state.hotels.slice(0, this.state.current_index).map(async (item) => {
      let res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${item.id}`)
      this.state.loading = false;
      return res.data
    }))
  }

  fetch_data_more = async () => {
    this.state.loading = true;
    return await Promise.all(this.state.hotels.slice(this.state.current_index, this.state.current_index+10).map(async (item) => {
      let res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${item.id}`)
      this.state.loading = false;
      return res.data
    }))
  }

  getStartDate () {
    const dates = this.context.dates
    let start;
    try{
      start = JSON.stringify(dates[0].startDate).slice(1, 11)
    } catch(e){
      start = "2022-09-23"
    }
    return start
  }

  getEndDate () {
    const dates = this.context.dates
    let end;
    try{
      end = JSON.stringify(dates[0].endDate).slice(1, 11)
    } catch(e){
      end = "2022-09-24"
    }
    return end
  }

  getGuest () {
    const options = this.context.options
    let guest;
    try{
      guest = options.guest
      if (guest === undefined){
        guest = "1"
      }
    }catch (e) {
      guest = "1"
    }
    return guest
  }

  initData = async (dest_id) => {
    console.log(this.context)
    const start = this.getStartDate()
    console.log(start)
    const end = this.getEndDate()
    console.log(end)
    const guest = this.getGuest()
    console.log(guest)
    this.state.loading = true;
    let url = `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${dest_id}&checkin=${start}&checkout=${end}&lang=en_US&currency=SGD&country_code=SG&guests=${guest}&partner_id=1`;
    /*let res = await axios.get(url).then(async () => {
      await this.timeout(3000)
      await axios.get(url)
    });*/
    await axios.get(url);
    await this.timeout(3000)
    const res = await axios.get(url);
    this.setState({
      hotels:res.data.hotels,
      totalPage: Math.ceil(res.data.hotels.length / 10),
    })
    let hotel_list = await this.fetch_data()
    let price_list = this.getPriceInit()

    await this.setState({
      list: hotel_list,
      prices: price_list
    })
    this.state.loading = false;
  }

  loader = async () => {
    this.state.loading = true;
    await this.timeout(6500)
    let hotel_list_more = await this.fetch_data_more()
    let price_list_more = this.getPriceThen()
    await this.setState({
      current_index: this.state.current_index+10,
      list: hotel_list_more,
      prices: price_list_more,
      current_page: this.state.current_page + 1,
    })
    console.log("---------------------------------------------")
    this.state.loading = false;
  }

  getPriceInit () {
    return this.state.hotels.slice(0, this.state.current_index).map((item) => (
        item.converted_price
    ))
  }
  getPriceThen () {
    return this.state.hotels.slice(this.state.current_index, this.state.current_index + 10).map((item) => (
        item.converted_price
    ))
  }

  componentDidMount () {
    this.setState({
      loading: true
    })
    const url = window.location.href.toString()
    const dest_id = url.substring(url.lastIndexOf("/") + 1, url.length);
    this.setState({
      dest_id: dest_id
    })
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
          <SideSearch/>
          </div>
          <div className="listResult"> 
          {this.state.loading ? (
              <LoadingSpinner /> 
            ) : (
              <>
                {this.state.list.map((item, index) => (
                  <SearchItem item={item} price={this.state.prices[index]} id={this.state.dest_id} />
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
        </>
    )
  }
}
export default HotelSearch;