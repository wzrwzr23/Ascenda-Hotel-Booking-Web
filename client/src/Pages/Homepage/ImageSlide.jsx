import React, {Component} from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlide.css';

export class ImageSlide extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 400,
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            removeClippedSubviews: false,
            useTransform: false
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
                                <img className="img" src={'Images/hotelimage1.jpeg'}/>
                            </div>
                            <div className="wdt">
                                <img className="img" src={'Images/hotelimage2.jpeg'}/>
                            </div>
                            <div className="wdt">
                                <img className="img" src={'Images/hotelimage3.jpeg'}/>
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