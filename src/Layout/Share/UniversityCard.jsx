import React from 'react';
import { Link } from 'react-router-dom';

const UniversityCard = ({ college }) => {
    const { college_name, college_image, admission_data, research_history, events, sports, _id } = college;

    return (
        <div className="max-w-4xl md:mx-auto my-6 mx-10">
            <div className="flex flex-col md:flex-row md:bg-white bg-gray-500 dark:bg-purple-50 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Image Section */}
                <div className="  h-full py-10 md:py-24  bg-white">
                    <img
                        src={college_image}
                        alt={college_name}
                        className="transition-transform duration-300 hover:scale-105"
                    />
                </div>


                {/* Info Section */}
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-purple-700 mb-3">{college_name}</h2>
                        <p className="text-gray-500  mb-1">
                            <span className="font-semibold">Admission Date:</span> {admission_data}
                        </p>
                        <p className="text-gray-500  mb-1">
                            <span className="font-semibold">Events:</span> {events.join(", ")}
                        </p>
                        <p className="text-gray-500  mb-1">
                            <span className="font-semibold">Sports:</span> {sports.join(", ")}
                        </p>
                        <p className="text-gray-500  mb-3">
                            <span className="font-semibold">Research History:</span> {research_history}
                        </p>
                    </div>

                    <div className="mt-4 md:mt-auto">
                        <Link
                            to={`/universityDetails/${_id}`}
                            className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityCard;
