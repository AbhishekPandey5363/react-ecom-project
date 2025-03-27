import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCards, EffectCoverflow, Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';

export default function CategorySlider({ title, data }) {
    let [slidesPerView, setSlidesPerView] = useState(window.innerWidth < 1000 ? 1 : 3)
    let [sliderType, setSliderType] = useState(window.innerWidth < 1000 ? 'cards' : 'coverflow')
    let navigate = useNavigate()
    let options = {
        effect: sliderType,
        grabCursor: true,
        centeredSlides: false,
        slidesPerView: slidesPerView,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
        pagination: false,
        modules: [EffectCoverflow, Pagination, EffectCards],
        className: "mySwiper"

    }
    function handelWindoResize() {
        setSlidesPerView(window.innerWidth < 1000 ? 1 : 3)
        setSliderType(window.innerWidth < 1000 ? 'cards' : 'coverflow')
        navigate(0)
    }
    window.addEventListener("resize", handelWindoResize);
    return (
        <>
            <div className="container-fluid Maincategory py-5 mb-5">
                <div className="container">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                        <h5 className="text-primary">Our {title}</h5>
                        <h3>We Deals in Following !</h3>
                    </div>

                    <Swiper {...options}>
                        {data?.map(item => {
                            return <SwiperSlide key={item.id}>
                                <div className=' card slider-container'>
                                    <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} height={300} alt="" />
                                    <div className='slider-card-elements'>
                                        <h4 className='text-primary'>{item.name}</h4>
                                        <Link to={title === "Maincategory" ? `/shop?mc=${item.name}` : title === "Subcategory" ? `/shop?sc=${item.name}` : `/shop?br=${item.name}`} className='btn text-light border-3 border-light'>Shop Now</Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}

                    </Swiper>
                </div>
            </div >
        </>
    )
}
