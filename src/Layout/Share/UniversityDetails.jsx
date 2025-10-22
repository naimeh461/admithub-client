import React, { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useLoaderData, useParams } from 'react-router-dom';

const UniversityDetails = () => {

    const params = useParams();
    const [university, setUniversity] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/universityDetails/${params.id}`)
            .then(res => res.json())
            .then(data => setUniversity(data));
    }, [])
    const { college_name, college_image, admission_data, events, research_history, sports, college_rating, number_of_research, admission_process, events_details, research_works, sports_categories } = university
    return (
        <div className="w-[85%] mx-auto my-16 bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center bg-gradient-to-r from-purple-700 to-purple-400 text-white p-6 rounded-t-2xl">
                <h2 className="text-3xl font-bold">{college_name}</h2>
                <Rating style={{ maxWidth: 120 }} value={Math.round(college_rating)} />
            </div>

            {/* Image */}
            <div className="flex justify-center bg-gradient-to-b from-purple-100 to-white p-10">
                <figure>
                    <img
                        className="rounded-xl shadow-lg w-full max-w-3xl object-cover "
                        src={college_image}
                        alt="University"
                    />
                </figure>
            </div>

            {/* Info Section */}
            <div className="flex flex-col gap-6 mt-4 text-center p-6 bg-purple-50 rounded-b-2xl">
                <p className="text-lg">
                    <span className="font-semibold text-purple-900">Admission Date:</span> {admission_data}
                </p>
                <p>
                    <span className="font-semibold text-purple-900">Admission Process:</span> {admission_process}
                </p>
                <p>
                    <span className="font-semibold text-purple-900">Events:</span>{" "}
                    {Array.isArray(events)
                        ? events.join(", ")
                        : typeof events === "object"
                            ? Object.values(events).join(", ")
                            : events}
                </p>
                <p>
                    <span className="font-semibold text-purple-900">Sports:</span>{" "}
                    {Array.isArray(sports)
                        ? sports.join(", ")
                        : typeof sports === "object"
                            ? Object.values(sports).join(", ")
                            : sports}
                </p>
                <p>
                    <span className="font-semibold text-purple-900">Research History:</span> {research_history}
                </p>
                <p>
                    <span className="font-semibold text-purple-900">Number of Research:</span>{" "}
                    {number_of_research}
                </p>

                {/* Sports Section */}
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl p-6 w-[85%] mx-auto shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">🏅 Sports</h3>
                    <div className="space-y-3">
                        {sports_categories?.map((sport, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 sm:grid-cols-3 bg-purple-700/30 backdrop-blur-sm rounded-lg p-4 shadow-md"
                            >
                                <p><span className="font-semibold">Sport:</span> {sport.category_name}</p>
                                <p><span className="font-semibold">Team:</span> {sport.team_name}</p>
                                <p><span className="font-semibold">Captain:</span> {sport.captain}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Research Section */}
                <div className="bg-gradient-to-br from-purple-700 to-purple-900 text-white rounded-xl p-6 w-[85%] mx-auto shadow-md mb-10">
                    <h3 className="text-2xl font-semibold mb-4">🧠 Research Works</h3>
                    <div className="space-y-3">
                        {research_works?.map((work, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 sm:grid-cols-3 bg-purple-800/40 backdrop-blur-sm rounded-lg p-4 shadow-md"
                            >
                                <p><span className="font-semibold">Title:</span> {work.title}</p>
                                <p><span className="font-semibold">Date:</span> {work.publication_date}</p>
                                <p><span className="font-semibold">Authors:</span> {work.authors.join(", ")}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UniversityDetails;