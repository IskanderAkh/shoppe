import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './slider.scss';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

export default function App() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                speed={1500}
                modules={[Pagination, Autoplay]}
                className={`mySwiper rounded-2xl`}
            >
                <SwiperSlide className='relative'>
                    <img src="./header_slider.png" alt="" className='headerslider-img rounded-lg' />
                    <div className='absolute top-1/2 left-40 -translate-x-1/2 -translate-y-1/2 text-center text-white slider-text'>
                        <h1 className='text-3xl font-medium'>Gold big hoops </h1>
                        <h4 className='text-2xl font-normal'>$ 68,00 </h4>
                        <button className='text-xl font-bold  slider_btn'>View Product</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src="./header_slider.png" alt="" className='headerslider-img rounded-lg' />
                    <div className='absolute top-1/2 left-40 -translate-x-1/2 -translate-y-1/2 text-center text-white slider-text'>
                        <h1 className='text-3xl font-medium'>Gold big hoops </h1>
                        <h4 className='text-2xl font-normal'>$ 61,00 </h4>
                        <button className='text-xl font-bold  slider_btn'>View Product</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src="./header_slider.png" alt="" className='headerslider-img rounded-lg' />
                    <div className='absolute top-1/2 left-40 -translate-x-1/2 -translate-y-1/2 text-center text-white slider-text'>
                        <h1 className='text-3xl font-medium'>Gold big hoops </h1>
                        <h4 className='text-2xl font-normal'>$ 62,00 </h4>
                        <button className='text-xl font-bold  slider_btn'>View Product</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src="./header_slider.png" alt="" className='headerslider-img rounded-lg' />
                    <div className='absolute top-1/2 left-40 -translate-x-1/2 -translate-y-1/2 text-center text-white slider-text'>
                        <h1 className='text-3xl font-medium'>Gold big hoops </h1>
                        <h4 className='text-2xl font-normal'>$ 63,00 </h4>
                        <button className='text-xl font-bold slider_btn'>View Product</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src="./header_slider.png" alt="" className='headerslider-img rounded-lg' />
                    <div className='absolute top-1/2 left-40 -translate-x-1/2 -translate-y-1/2 text-center text-white slider-text'>
                        <h1 className='text-3xl font-medium'>Gold big hoops </h1>
                        <h4 className='text-2xl font-normal'>$ 64,00 </h4>
                        <button className='text-xl font-bold slider_btn '>View Product</button>
                    </div>
                </SwiperSlide>

            </Swiper>
        </>
    );
}
