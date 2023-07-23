import React from 'react';
import { Link } from 'react-router-dom';

const UniversityCard = ({ college }) => {
    const { college_name , college_image , admission_data , research_history , events , sports, _id } = college
    return (
        <div>
            <div className="card card-side  shadow-xl w-[80%] mx-auto bg-[#291334] text-white ">
                <div className='bg-white rounded-s-xl flex justify-center'>
                <figure><img src={ college_image} alt="Movie" className='px-5' /></figure>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{college_name}</h2>
                    <p> <span className="text-lg font-semibold">Admission Date :</span> {admission_data}</p>
                    <p><span className="text-lg font-semibold">Events :</span> {events.join(", ")}</p>
                    <p><span className="text-lg font-semibold">Sports :</span> {sports.join(", ")}</p>
                    <p><span className="text-lg font-semibold">Research history : </span>{research_history}</p>
                    <div className="card-actions justify-end">
                        <button className="btn purple-primary"><Link to={`/unidetail/${_id}`}>Details</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityCard;