import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../Components/RoomItem/RoomItem.css'
import {SearchContext} from "../../Context/SearchContext";
import useFetch from './../../hooks/useFetch'

class RoomList extends React.Component {
    state = {
        list: [],
        current_page: 1,  //current number of page
        current_index: 10, //current index of hotel_list
        totalPage: 0,  //total number of page
        rooms:[],
        redirect: false,
        dest_id: "",
        hotel_id: "",
        days: 0
    }

    static contextType = SearchContext

    getStartDate () {
        const dates = this.context.dates
        let start;
        try{
            // start = JSON.stringify(dates[0].startDate).slice(1, 11)
            start = JSON.stringify(dates[0].startDate)
        } catch(e){
            start = "2022-09-23"
        }
        return start
    }

    getEndDate () {
        const dates = this.context.dates
        let end;
        try{
            // end = JSON.stringify(dates[0].endDate).slice(1, 11)
            end = JSON.stringify(dates[0].endDate)
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

    getDatesInRange(startDate, endDate){
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const date = new Date(start.getTime());
    
        const dates = [];
    
        while (date <= end) {
          dates.push(new Date(date).getTime());
          date.setDate(date.getDate() + 1);
        }
    
        return dates;
      };

    getData = async () => {
        var data;
        try{
            data = await axios.get(`/keys`, {});
            console.log("data", data.data[12])
        }catch(err){}
        return data.data;
    }

    isAvailable = async (roomNumber) => {
        var data;
        try{
            data = await axios.get(`/keys`, {});
            // console.log("data", data.data[12])
        }catch(err){}
        var unavailableDatesOfRoom;
        for (let i=0; i<data.data.length; i++){
            if(data.data[i].key == roomNumber){
                unavailableDatesOfRoom = data.data[i].unavailableDates;
                break;
            }
            if(data.data[i].key != roomNumber && i == data.data.length-1){
                return false;
            }
        }
        console.log("unavailable dates = ", unavailableDatesOfRoom);
        const alldates = this.getDatesInRange(this.getStartDate(), this.getEndDate());
        const isFound = unavailableDatesOfRoom.some((date) =>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };

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
        const days = this.dayDifference();
        console.log(days);
        this.state.days = days;
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

    
    dayDifference() {
        const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
        const dates = this.context.dates
        const date1 = dates[0].endDate;
        console.log("date2 = ", date1);
        const date2 = dates[0].startDate;
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
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
                                {!this.isAvailable(item.key) ? (
                                    "."
                                ) : (<>
                                <div className="riDesc">
                                    <h1 className="riTitle">{item.description} room</h1>
                                </div>
                                <div className="riSubtitle">
                                    {item.amenities.slice(0,5).map((item, index) =>{
                                        return(
                                        <li key = {index}>{item}</li>
                                        )
                                    })}
                                </div>
                                <div className="riPricenight">S${item.converted_price}/night</div>
                                <div className="riPrice">Total S${(item.converted_price*this.state.days).toFixed(2)}</div>
                                {/* <button className="riCheckButton" onClick={this.handleClicked}>Book Now!</button> */}
                                <Link to={/hotelsearch/+this.state.dest_id+/roomsearch/+this.state.hotel_id+/booking/}>
                                    <button className="riCheckButton" onClick={() => this.book(item.key)}>Book Now!</button>
                                </Link>
                                </>)}
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