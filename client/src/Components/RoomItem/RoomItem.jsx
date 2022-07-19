import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import './RoomItem.css'
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useFetch from "../../hooks/useFetch";
import { SearchContext } from '../../Context/SearchContext';
import axios from 'axios';

const RoomItem = ({item}) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const {user} = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const {dates,options} = useContext(SearchContext);
  const navigate = useNavigate();
  const room = 233;

  const getDatesInRange = (startDate, endDate) => {
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

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const {numb, count} = counter(roomNumber)
    if(numb>=options.room){return true;}
    return false;
  };

  const counter = (roomNumber) => {
    var isFound;
    var count=[];
    var numb = 0;
    console.log(roomNumber[0])
    for(let i=0; i<roomNumber.length; i++){
      isFound = roomNumber[i].unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
      if(!isFound) {
        count.push(i);
        numb+=1;
      }
    }
    console.log(numb)
    return {numb, count};
  };

  const book = async ()=>{
    try{
      const {numb, count} = counter(item.roomNumbers)
      for (let i=0; i<options.room; i++){
        const id = item.roomNumbers[count[0]]._id
        const res = axios.put(`/rooms/availability/${id}`,{
          dates: alldates,
        });
        return res.data;
      }
    }catch(err){}
  }

  


  const handleClicked = () => {
    if(true){ //supposed to be user
      setOpenModal(true);
      book()
      navigate(`/booking`, { state: { room } });
    }else{
      navigate('/login')
    }
    
  };

  

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate)
  return (
    <div className="roomItem">
      {loading ? (
        "loading"
      ) : (<>
        <img src="https://pix10.agoda.net/hotelImages/18391689/0/2c6de0f77a916b78928c57f088f08fc6.jpg?ca=19&ce=1&s=1024x768" className="riImg" />
        <div className="riDesc">
            <h1 className="riTitle">{item.title}</h1>
            <div className="riRating">
              <span className="r1"><FontAwesomeIcon icon={faStar} /></span>
              <span className="r2"><FontAwesomeIcon icon={faStar} /></span>
              <span className="r3"><FontAwesomeIcon icon={faStar} /></span>
              <span className="r4"><FontAwesomeIcon icon={faStar} /></span>
              <span className="r5"><FontAwesomeIcon icon={faStarHalf} /></span>
            </div>
            <span className="riSubtitle">
            {item.desc}
            </span>
            <span className="riFeatures">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </span>
            <span className="riPrice">${item.price*days*options.room}</span>
            <button className="riCheckButton" onClick={handleClicked} disabled={!isAvailable(item.roomNumbers)}>Book Now!</button>
        </div>
        </>
      )}{openModal}
    </div>
  )
}

export default RoomItem