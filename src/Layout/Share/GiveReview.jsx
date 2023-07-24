import React, { useEffect, useState } from 'react';
import reviewImg from "../../assets/review.png"
import { Form, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const GiveReview = () => {
    const params = useParams();
    const [college, setCollege ] = useState([]);

    useEffect(() => {
        fetch(`https://admit-hub-server.vercel.app/reviewdata/${params.id}`)
            .then(res => res.json())
            .then(data => setCollege(data));
    },)

    const handleReview = event => {
        event.preventDefault();
        const form = event.target;
        const user_name = form.name.value;
        const university =  college.college_name;
        const rating = parseFloat(form.reviewNumber.value);
        const review = form.reviewComment.value;
        const user_picture = college.photo;

        const reviewData = {user_name,review,rating,user_picture,university}
        fetch("https://admit-hub-server.vercel.app/reviews", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thank You for your review',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })

    }
    return (
        <div className="w-[80%]  m-auto s my-20 p-10   rounded-2xl  bg-opacity-80  text-white">
                    <h2 className="text-3xl font-bold  mb-8 text-center uppercase text-[#291334]">{college.college_name} review<br /></h2>
                    <div className="lg:flex justify-center items-center gap-20 p-10  bg-[#291334] rounded-2xl ">
                        <img className="lg:w-[40%] lg:h-[40%] " src={reviewImg} />
                        <div className="divider lg:divider-horizontal bg-white  rounded-lg"></div>
                        <div className="w-full  shadow-2xl  p-7 text-white  rounded-2xl">
                            <Form onSubmit={handleReview} >
                                <div >
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <textarea placeholder="Name" defaultValue={college?.name}  name="name" className="textarea textarea-bordered textarea-xs w-full text-black" ></textarea>
                                </div>
                                <div >
                                    <label className="label">
                                        <span className="label-text">Rating</span>
                                    </label>
                                    <textarea placeholder="Please Give float number under 5" name="reviewNumber" className="textarea textarea-bordered textarea-xs w-full text-black" ></textarea>

                                </div>
                                <div >
                                    <label className="label">
                                        <span className="label-text">Review</span>
                                    </label>
                                    <textarea placeholder="Your valuable feedback" name="reviewComment" className="textarea textarea-bordered textarea-lg w-full text-black" ></textarea>
                                </div>
                                <div className="form-control mt-6">
                                    <input className="bg-white p-3 rounded-lg w-full    text-[#291334]" type="submit" value="Submit Review" />
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
    );
};

export default GiveReview;