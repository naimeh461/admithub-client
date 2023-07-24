import React, { useEffect, useState } from 'react';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Review = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch("https://admit-hub-server.vercel.app/reviews")
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [])

    return (
        <div className='mt-80 w-[80%] mx-auto  mb-40'>
            <h2 className='text-center text-4xl font-bold  text-[#291334] mb-20'>Student Review</h2>
            <div>
                <Swiper
                    grabCursor={true}
                    slidesPerView={1}
                    spaceBetween={100}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true
                    }}
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 50,
                        },


                        "@1.50": {
                            slidesPerView: 2,
                            spaceBetween: 100,
                        },
                    }}

                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >

                    <div className=''>
                    {
                        reviews.map(review => <SwiperSlide key={review._id} review={review}>
                            <div className='purple-primary rounded-2xl'>
                                <div className="card-side w-[80%] shadow-inner mx-auto gap-10 p-5 flex rounded-lg mt-4 mb-20 dark:bg  dark:bg-opacity-60 justify-center items-center ">
                                    <figure><img className=' h-[100px] rounded-full' src={review.user_picture} /></figure>
                                    <div className="p-0 my-auto w-full">
                                        <div className='flex gap-5 justify-between items-center'>
                                            <h2 className="text-xl font-medium my-4">{review.university}</h2>
                                            <h2 className="text flex items-center gap-3 ">{review.rating}<Rating style={{ maxWidth: 100 }} value={Math.round(review.rating)} /></h2>
                                        </div>
                                        <h2 className="card-title">{review.user_name}</h2>
                                        <p>{review.review}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }
                    </div>
                    <div>

                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default Review;