import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import useFetch from '../../hooks/useFetch';
import RoomItem from '../RoomItem/RoomItem';
import './Rooms.css'
import React from 'react';

const Rooms = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const {data, loading, error} = useFetch(`/hotels/room/${id}`);

  console.log(data)
  return (
    <div className='hotelRooms'>
      {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <RoomItem item={item} key={item._id}/>
                ))}
              </>
          )}
    </div>
  )
}

export default Rooms