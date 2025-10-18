import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Admission = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetch(`https://admit-hub-server.vercel.app/admission`)
      .then(res => res.json())
      .then(data => setColleges(data));
  }, []);

  return (
    <div className="w-[90%] max-w-6xl mx-auto my-20">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">
        College Admissions
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {colleges.map((college) => (
          <div
            key={college._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-3000"
          >
            <figure className="overflow-hidden py-10 px-5 glass">
              <img
                src={college.college_image}
                alt={college.college_name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </figure>
            <div className="p-5 flex flex-col justify-between h-48  bg-gradient-to-r from-purple-100 to-pink-10">
              <h3 className="text-xl font-semibold text-purple-700 mb-2 hover:text-purple-900 transition-colors duration-300">
                <Link to={`/admissionfrom/${college._id}`}>{college.college_name}</Link>
              </h3>
             
              <div className="mt-4">
                <Link
                  to={`/admissionfrom/${college._id}`}
                  className="inline-block px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admission;
