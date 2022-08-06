import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../Components/RoomItem/RoomItem.css'
import {SearchContext} from "../../Context/SearchContext";

class RoomList extends React.Component {
    state = {
        list: [],
        current_page: 1,  //current number of page
        current_index: 10, //current index of hotel_list
        totalPage: 0,  //total number of page
        rooms:[],
        redirect: false,
        dest_id: "",
        hotel_id: ""
    }

    static contextType = SearchContext

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

    timeout = (delay: number) => {
        return new Promise( res => setTimeout(res, delay) );
    }
    initData = async (hotel_id, dest_id) => {
        console.log(this.context)
        const start = this.getStartDate()
        console.log(start)
        const end = this.getEndDate()
        console.log(end)
        const guest = this.getGuest()
        console.log(guest)
        let res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${hotel_id}/price?destination_id=${dest_id}&&checkin=${start}&checkout=${end}&lang=en_US&currency=SGD&country_code=SG&guests=${guest}&partner_id=1`);
        await this.timeout(3000)
        res = await axios.get(`https://hotelapi.loyalty.dev/api/hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${start}&checkout=${end}&lang=en_US&currency=SGD&country_code=SG&guests=${guest}&partner_id=1`)
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
    }
    book = async (key) =>{
        try{
            const res = axios.post('/Kkeys', {
                "key": key
            });
            return res.data;
        }catch(err){}
    }

    componentDidMount () {
        const url = window.location.href.toString()
        const hotel_id = url.substring(url.lastIndexOf("/") + 1, url.length);
        const params = url.split("/")
        const dest_id = params[4]
        this.setState({
            dest_id: dest_id,
            hotel_id: hotel_id
        })
        this.initData(hotel_id, dest_id);
    }
    render() {
        return (
            <div className="roomItems">
                <div className="riDes">
                {
                    this.state.rooms.map((item) => {
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
                                <Link to={/hotelsearch/+this.state.dest_id+/roomsearch/+this.state.hotel_id+/booking/}>
                                    <button className="riCheckButton" onClick={() => this.book(item.key)}>Book Now!</button>
                                </Link>
                            </div>
                        )
                    })
                }
                </div>
{/*                {
                    this.state.redirect && <Navigate to='/some_route' replace={true} {this.state.}/>
                }*/}
            </div>

        );
    }
}

export default RoomList;