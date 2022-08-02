import React from "react";
import axios from "axios";
import '../../Components/RoomItem/RoomItem.css'

class RoomList extends React.Component {
    state = {
        list: [],
        totalList: [],
        current_page: 1,  //当前页码
        current_index: 10, //current index of hotel_list
        totalPage: 0,  //总页数
        rooms:[],
        prices: [],
        keys: [],
    }
    timeout = (delay: number) => {
        return new Promise( res => setTimeout(res, delay) );
    }
    initData = async (hotel_id, dest_id) => {
        let res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=2022-08-19&checkout=2022-08-20&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1`);
        await this.timeout(3000)
        res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=2022-08-19&checkout=2022-08-20&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1`)
        this.setState({
            rooms:res.data.rooms.slice(0, this.state.pageSize),
            totalList: res.data.rooms,
            totalPage: Math.ceil(res.data.rooms.length / 10),
        })
    }

    loader = async () => {
        await this.timeout(6500)
        await this.setState({
            current_index: this.state.current_index+10,
            current_page: this.state.current_page + 1,
        })
        console.log("---------------------------------------------")
        // this.pageNext(this.state.goValue, this.state.totalList)
    }
    handleClicked = () => {
        const room = 233;
        this.navigate(`/booking`, { state: { room } });
    };

    componentDidMount () {
        const url = window.location.href.toString()
        const hotel_id = url.substring(url.lastIndexOf("/") + 1, url.length);
        const params = url.split("/")
        const dest_id = params[4]
        this.initData(hotel_id, dest_id);
    }
    render() {
        return (
            <div className="roomItems">
                <div className="riDes">
                {
                    this.state.rooms.map((item, index) => {
                        return (
                            <div className="roomItem">
                                <div className="riDesc">
                                    <h1 className="riTitle">{item.price_type} room</h1>
                                </div>
                                <div className="riSubtitle">
                                    {item.description}
                                </div>
                                <div className="riPrice">S${item.converted_price}</div>
                                {/* <button className="riCheckButton" onClick={this.handleClicked}>Book Now!</button> */}
                                <form action="/booking">
                                    <button className="riCheckButton">Book Now!</button>
                                </form>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        );
    }
}

export default RoomList;