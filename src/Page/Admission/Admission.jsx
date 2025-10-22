// ...existing code...
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Authentication/useAuth';
import useAxiosSecure from '../../Authentication/useAxiosSecure';

const Admission = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  // Set of collegeIds the user already applied to
  const [appliedCollegeIds, setAppliedCollegeIds] = useState(new Set());
  const [loadingApplied, setLoadingApplied] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/admission`)
      .then(res => res.json())
      .then(data => setColleges(data))
      .catch(err => {
        console.error('Failed to load colleges:', err);
        setColleges([]);
      });
  }, []);

  useEffect(() => {
    let mounted = true;
    if (!user?.email) {
      setAppliedCollegeIds(new Set());
      setLoadingApplied(false);
      return;
    }

    setLoadingApplied(true);
    axiosSecure.get('/admissions')
      .then(res => {
        if (!mounted) return;
        const admissions = res?.data?.admissions || [];
        const ids = new Set(admissions.map(a => String(a.collegeId)));
        setAppliedCollegeIds(ids);
      })
      .catch(err => {
        console.error('Failed to load user admissions:', err);
        if (mounted) setAppliedCollegeIds(new Set());
      })
      .finally(() => mounted && setLoadingApplied(false));

    return () => { mounted = false; };
  }, [axiosSecure, user?.email]);

  const handleApplyNow = async (id, college) => {
    if (!user?.email) {
      return navigate('/login');
    }

    // prevent applying twice (extra safety)
    if (appliedCollegeIds.has(String(id))) {
      return;
    }

    try {
      const q = new URLSearchParams({ email: user.email, classId: id }).toString();
      const res = await fetch(`http://localhost:3000/payments/check?${q}`);
      if (!res.ok) {
        return navigate(`/payment/${id}`);
      }
      const data = await res.json();
      if (data.paid) {
        navigate(`/admissionfrom/${id}`, { state: { payment: data.payment, course: college } });
      } else {
        navigate(`/payment/${id}`);
      }
    } catch (err) {
      console.error('Check payment error:', err);
      navigate(`/payment/${id}`);
    }
  };

  return (
    <div className="w-[90%] max-w-6xl mx-auto my-20">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">
        College Admissions
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college) => {
          const applied = appliedCollegeIds.has(String(college._id));
          return (
            <div
              key={college._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <figure className="overflow-hidden py-10 px-5 glass">
                <img src={college.college_image} alt={college.college_name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </figure>

              <div className="p-5 flex flex-col justify-between bg-gradient-to-r from-purple-50 to-pink-50 h-48">
                <h3 className="text-xl font-semibold text-purple-700 mb-3 hover:text-purple-900 transition-colors duration-300">
                  {college.college_name}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {college.description?.slice(0, 100) || "Explore admission opportunities and details for this college."}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleApplyNow(college._id, college)}
                    disabled={applied}
                    aria-disabled={applied}
                    className={`px-4 font-semibold rounded-lg transition-colors duration-300 ${applied
                        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                  >
                    {applied ? 'Already Applied' : 'Apply Now'}
                  </button>

                  <button
                    onClick={() => navigate(`/universityDetails/${college._id}`)}
                    className="px-4  border border-purple-600 text-purple-700 font-semibold rounded-lg hover:bg-purple-100 transition-colors duration-300"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admission;
// ...existing code...