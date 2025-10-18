import React, { useEffect, useState } from 'react';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        fetch("https://admit-hub-server.vercel.app/reviews")
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    }

    return (
        <div className='mt-32 w-[90%] mx-auto mb-40'>
            <h2 className='text-center text-4xl font-bold text-purple-800 mb-16'>Student Reviews</h2>

            <Swiper
                grabCursor={true}
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true
                }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 4, spaceBetween: 40 },
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {reviews.map(review => (
                    <SwiperSlide key={review._id}>
                        <div className="bg-white dark:bg-purple-100 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl min-h-[400px]">
                            <img
                                src={review.user_picture}
                                alt={review.user_name}
                                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-purple-500"
                            />
                            <h3 className="text-xl font-semibold text-purple-700">{review.user_name}</h3>
                            <p className="text-gray-600 text-sm mb-3">{review.university}</p>
                            <div className="flex items-center gap-2 mb-3">
                                <Rating style={{ maxWidth: 100 }} value={Math.round(review.rating)} />
                                <span className="text-purple-700 font-medium">{review.rating}</span>
                            </div>
                            <p className="text-gray-700 text-sm mb-4">
                                {expanded[review._id] ? review.review : `${review.review.substring(0, 100)}...`}
                            </p>
                            {review.review.length > 100 && (
                                <button
                                    onClick={() => toggleExpand(review._id)}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                                >
                                    {expanded[review._id] ? "Show Less" : "Read More"}
                                </button>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Review;
