import useFetch from "../../hooks/useFetch";
import "./Featured.css";
import React from 'react'

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Doha,Jaipur,Dublin"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://cdn1.matadornetwork.com/blogs/1/2022/04/doha-qatar-fb.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Doha</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://img.etimg.com/thumb/msid-70104165,width-650,imgsize-1445127,,resizemode-4,quality-100/jaipur_gettyimages.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Jaipur</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://i.natgeofe.com/n/f07467ab-21af-4f95-85c7-05a79f5458d3/bridge-liffey-dublin_16x9.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Dublin</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;