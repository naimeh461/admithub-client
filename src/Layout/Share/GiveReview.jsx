import React, { useEffect, useState } from 'react';
import reviewImg from "../../assets/review.png";
import { Form, useParams, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Authentication/useAxiosSecure';
import useAuth from '../../Authentication/useAuth';

const GiveReview = () => {
  const params = useParams();
  const location = useLocation();
  const passedAdmission = location.state?.admission || null;

  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [college, setCollege] = useState(null);
  const [admission, setAdmission] = useState(passedAdmission);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id || (admission && admission.collegeId);
    if (!id) {
      setCollege(null);
      return;
    }
    fetch(`http://localhost:3000/universityDetails/${encodeURIComponent(id)}`)
      .then(res => res.json())
      .then(data => setCollege(data))
      .catch(() => setCollege(null));
  }, [params.id, admission]);

  useEffect(() => {
    if (passedAdmission) {
      setAdmission(passedAdmission);
      setLoading(false);
      return;
    }
    if (!user?.email) {
      setAdmission(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    axiosSecure.get('/admissions')
      .then(res => {
        const admissions = res?.data?.admissions || [];
        const matched = admissions.find(a =>
          String(a.collegeId) === String(params.id)
        );
        setAdmission(matched || null);
      })
      .catch(err => {
        console.error('Error fetching admissions:', err);
        setAdmission(null);
      })
      .finally(() => setLoading(false));
  }, [axiosSecure, user?.email, params.id, passedAdmission]);

  const handleReview = event => {
    event.preventDefault();
    if (!admission || !['approved', 'rejected'].includes(admission.status)) {
      Swal.fire({ icon: 'error', title: 'Not allowed', text: 'You can only review after admission decision.' });
      return;
    }

    const form = event.target;
    const user_name = form.name.value;
    const rating = parseFloat(form.reviewNumber.value);
    const review = form.reviewComment.value;

    const reviewData = {
      user_name,
      review,
      rating,
      user_picture: user?.photoURL || '',
      university: college?.college_name || admission?.college_name,
      collegeId: admission?.collegeId || params.id
    };

    axiosSecure.post('/reviews', reviewData)
      .then(res => {
        const ok = res?.data?.insertResult || (res?.status >= 200 && res?.status < 300);
        if (ok) {
          Swal.fire({ icon: 'success', title: 'Thank you for your review', showConfirmButton: false, timer: 1500 });
          form.reset();
        } else {
          Swal.fire({ icon: 'error', title: 'Failed', text: 'Server returned unexpected response.' });
        }
      })
      .catch(err => {
        console.error('Review submit error:', err);
        Swal.fire({ icon: 'error', title: 'Error', text: err?.response?.data?.message || 'Could not submit review.' });
      });
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Checking eligibility...</div>;

  if (!admission) {
    return (
      <div className="w-[90%] md:w-[70%] m-auto my-20 p-10 rounded-3xl bg-white/70 backdrop-blur-lg shadow-2xl border border-purple-200 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">{college?.college_name || 'This college'}</h2>
        <p className="text-gray-600 text-lg">You can leave a review only after your admission decision (approved or rejected).</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-100 via-white to-pink-100 py-16 px-4">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:flex items-center gap-10">
        {/* Left Image Section */}
        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img src={reviewImg} alt="Review" className="w-80 md:w-[90%] rounded-2xl shadow-md" />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-purple-700 mb-4 text-center">
            {college?.college_name || 'College'} Review
          </h2>

          {admission.status === 'rejected' && admission.adminReason && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-xl">
              <strong className="text-red-700">Rejection Reason:</strong>
              <p className="mt-2 text-sm text-red-600">{admission.adminReason}</p>
            </div>
          )}

          <Form onSubmit={handleReview} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName || user?.email}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="reviewNumber"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
              <textarea
                name="reviewComment"
                placeholder="Write your valuable feedback..."
                className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-semibold rounded-lg shadow-md hover:scale-105 transform transition duration-300 focus:outline-none"
            >
              Submit Review
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GiveReview;
