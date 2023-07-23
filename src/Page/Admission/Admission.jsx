import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Admission = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/admission`)
            .then(res => res.json())
            .then(data => setColleges(data));
    },)
    return (
        <div className='w-[80%] mx-auto flex flex-col gap-10 my-20'>
            {
                colleges.map(college =>
                    <div key={college._id}>
                        <div className="card lg:card-side bg-base-100 shadow-2xl ">
                            <figure><img className='w-[50%]' src={college.college_image} alt="Album" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-[#291334]"><Link to ={`/admissionfrom/${college._id}`}>{college.college_name}</Link></h2>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Admission;