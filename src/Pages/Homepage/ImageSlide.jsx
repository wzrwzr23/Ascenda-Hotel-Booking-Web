import React, {Component} from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlide.css';

export class ImageSlide extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 500,
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
                {/* <div className='imgcontainer'>
                    <div className="row title" style={{marginBottom: "20px"}}>
                        <div class="col-sm-12 btn btn-info">
                        </div>
                    </div>
                </div> */}
                <div id="imagewrapper">
                    <section>
                        <Slider {...settings} >
                            <div className="wdt">
                                <img className="img" src={'Images/hotelimage1.jpg'}/>
                            </div>
                            <div className="wdt">
                                <img className="img" src={'Images/hotelimage2.jpg'}/>
                            </div>
                            <div className="wdt">
                                <img className="img" src={'Images/hotelimage3.jpg'}/>
                            </div>
                        </Slider>
                    </section>
                    {/* <section>
                        <div className="destform">
                            <DestinationSearch/>
                        </div>
                    </section> */}
                </div>
            </div>
        );
    }
}

export default ImageSlide