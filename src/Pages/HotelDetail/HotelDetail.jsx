import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd'
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"

import './index.scss'
import Top from '../../components/Top'
import Bottom from '../../components/Bottom'
const google = window.google

export default class Detail extends React.Component {
    state = {
        info: {},
        swiperList: [],
        amenitiesRatings: [],
        amenitiesmList: [],
        categories: [],
        map: null,
        lat: null,
        lng: null,
        marker: [],
    }
    // 获取地址栏?后面的参数
    getQueryVariable = (variable) => {
        // 从?开始获取后面的所有数据
        var query = window.location.search.substring(1)
        // 从字符串&开始分隔成数组split
        var vars = query.split("&")
        // 遍历该数组
        for (var i = 0; i < vars.length; i++) {
            // 从等号部分分割成字符
            var pair = vars[i].split("=")
            // 如果第一个元素等于 传进来的参的话 就输出第二个元素
            if (pair[0] === variable) return pair[1]
        }
        return (false)
    }

    // 对象转数组
    dataDispose = (values, keyName) => {
        let res = []
        for (const key in values) {
            if (keyName === 'categories') {
                let { name, score, popularity } = values[key]
                res.push({
                    name: name,
                    score: score,
                    popularity: popularity,
                })
            } else if (keyName === 'amenities') {
                res.push({
                    name: key,
                    status: values[key]
                })
            }
        }
        return res
    }

    initData = async (id) => {
        const res = await axios.get(https://hotelapi.loyalty.dev/api/hotels/${id})
        let { name, hires_image_index, default_image_index, image_details, amenities_ratings, categories, amenities, latitude, longitude } = res.data
        let arr = hires_image_index ? hires_image_index.split(',') : [default_image_index], newSwiperList = []
        arr.forEach((v, i) => {
            newSwiperList.push({
                name: name,
                imgs: ${image_details.prefix}${v}${image_details.suffix}
            })
        })
        this.setState({
            info: res.data,
            swiperList: newSwiperList,
            amenitiesRatings: amenities_ratings,
            amenitiesmList: this.dataDispose(amenities, 'amenities'),
            categories: this.dataDispose(categories, 'categories'),
            lat: latitude,
            lng: longitude
        })
    }

    initMap = () => {
        const myCenter = new google.maps.LatLng(this.state.lat, this.state.lng)
        const mapProp = {
            center: myCenter,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        const map = new google.maps.Map(document.getElementById("map"), mapProp)

        const marker = new google.maps.Marker({
            position: myCenter,
        })

        marker.setMap(map)

        const infowindow = new google.maps.InfoWindow({
            content: this.state.info.name
        })

        infowindow.open(map, marker)
    }
    componentDidMount () {
        const id = this.getQueryVariable('id')
        this.initData(id)
        this.initMap()
    }
    render () {
        return (
            <div className='container'>
                <Top />
                <div className='content'>
                    <div className='div1200'>
                        <div className='swiper d-flex d-flex-aifs d-flex-jcsb'>
                            <div className='swiper-list'>
                                <p className='hotel-name'>{this.state.info.name}</p>
                                <Carousel
                                    effect="fade"
                                    autoplay
                                >
                                    {
                                        this.state.swiperList.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <img src={item.imgs} alt={item.name} />
                                                </div>
                                            )
                                        })
                                    }
                                </Carousel>
                            </div>
                            <div className='swiper-desc'>
                                <div dangerouslySetInnerHTML={{ __html: this.state.info.description }}></div>
                            </div>
                        </div>
                        <div className='info-list'>
                            <div className='item'>
                                <p className='item-title'>categories</p>
                                <div className='item-ul d-flex d-flex-fww'>
                                    <div className='item-li row'>
                                        <table className='text-c' border="1">
                                            <thead>
                                            <tr>
                                                <th>name</th>
                                                <th>score</th>
                                                <th>popularity</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.categories.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.score}</td>
                                                            <td>{item.popularity ? (item.popularity).toFixed(2) : null}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className='item'>
                                <p className='item-title'>amenities-ratings</p>
                                <div className='item-ul d-flex d-flex-fww'>
                                    {
                                        this.state.amenitiesRatings.map((item, index) => {
                                            return (
                                                <div className='item-li' key={index}>
                                                    <span>{item.name}</span>
                                                    <span>{item.score}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='item'>
                                <p className='item-title'>amenities</p>
                                <div className='item-ul d-flex d-flex-fww'>
                                    {
                                        this.state.amenitiesmList.map((item, index) => {
                                            return (
                                                <div className='item-li' key={index}>
                                                    <span>{item.name}</span>
                                                    <span>{item.status ? <CheckOutlined /> : <CloseOutlined />}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>


                        </div>
                        <div id='map' style={{ width: "100%", height: "500px", position: "relative" }}>
                        </div>
                    </div>
                </div>
                <Bottom />
            </div>
        )
    }
}