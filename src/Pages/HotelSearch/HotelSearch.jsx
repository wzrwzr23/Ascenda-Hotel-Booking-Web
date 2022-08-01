import './HotelSearch.css'
import React from "react";
import axios from "axios";
import {Button} from "antd";

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
        <div className='listContainer'>
          {
            this.state.list.map((item, index) => {
              return (
                  /*<a href={`/detail?id=${item.id}`} key={index}>*/
                  /*<a href={`/roomsearch/`+item.id} key={index}>*/
                  <a href={`/hotelsearch/`+this.state.dest_id+`/roomsearch/`+item.id} key={index}>
                    {/*<Link to={`/hotelsearch/`+this.state.dest_id+`/roomsearch/`+item.id}>Home</Link>*/}
                    <img src={`${item.image_details.prefix}${item.default_image_index}${item.image_details.suffix}`} alt={item.name} />
                    <div>
                      <div>
                        <p>Name: {item.name}</p>
                        <p>Rating: {item.rating}</p>
                        <p>Prices: {this.state.prices[(index*2)+this.state.current_index]}</p>
                      </div>
                      <p>Address: {item.address}</p>
                      <p>City: {item.original_metadata.city}</p>
                      <p>Country: {item.original_metadata.country}</p>
                    </div>
                  </a>
              )
            }
            )
          }
          <div className="Center" align='center'>
            {this.state.current_page >= this.state.totalPage ? null : <Button type='primary' onClick={this.loader}>More</Button>}
          </div>
        </div>

    )
  }
}
export default HotelSearch;
