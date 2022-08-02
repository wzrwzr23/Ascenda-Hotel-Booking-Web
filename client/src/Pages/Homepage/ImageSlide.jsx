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
                                <img className="img" src={'images/hotelimage1.jpg'} alt='image1'/>
                            </div>
                            <div className="wdt">
                                <img className="img" src={'images/hotelimage2.jpg'} alt='image2'/>
                            </div>
                            <div className="wdt">
                                <img className="img" src={'images/hotelimage3.jpeg'} alt='image3'/>
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