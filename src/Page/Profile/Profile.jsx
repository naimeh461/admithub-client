import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
import userBlank from '../../assets/blank.png';
import useAxiosSecure from '../../Authentication/useAxiosSecure';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const updatedProfile = location.state?.updatedProfile || null;

  const [userInfo, setUserinfo] = useState(updatedProfile || {});
  const [loadingUserInfo, setLoadingUserInfo] = useState(!updatedProfile);

  const [axiosSecure] = useAxiosSecure();
  const [admissions, setAdmissions] = useState([]);
  const [loadingAdmissions, setLoadingAdmissions] = useState(true);

  useEffect(() => {
    if (updatedProfile) {
      setUserinfo(updatedProfile);
      setLoadingUserInfo(false);
      return;
    }
    if (!user?.email) {
      setUserinfo({});
      setLoadingUserInfo(false);
      return;
    }
    setLoadingUserInfo(true);
    fetch(`http://localhost:3000/addedclass/${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => setUserinfo(data || {}))
      .catch(err => {
        console.error('Failed to load user info:', err);
        setUserinfo({});
      })
      .finally(() => setLoadingUserInfo(false));
  }, [user?.email, updatedProfile]);

  useEffect(() => {
    let mounted = true;
    if (!user?.email) {
      setAdmissions([]);
      setLoadingAdmissions(false);
      return;
    }
    setLoadingAdmissions(true);
    axiosSecure.get('/admissions')
      .then(res => {
        if (!mounted) return;
        const data = res?.data?.admissions || [];
        setAdmissions(data);
      })
      .catch(err => {
        console.error('Failed to load admissions:', err);
        if (mounted) setAdmissions([]);
      })
      .finally(() => mounted && setLoadingAdmissions(false));
    return () => { mounted = false; };
  }, [axiosSecure, user?.email]);

  const requiredFields = ['name', 'photoUrl', 'phoneNumber'];
  const filledCount = requiredFields.reduce((acc, key) => acc + (userInfo?.[key] ? 1 : 0), 0);
  const completion = Math.round((filledCount / requiredFields.length) * 100);
  const missing = requiredFields.filter(k => !userInfo?.[k]);

  return (
    <div className="min-h-screen">
      <div className="py-20 bg-gray-50 flex justify-center px-4">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
          <div className="md:w-1/3 flex justify-center items-center bg-purple-50 p-6">
            <img
              src={userInfo?.photoUrl || userInfo?.photo || userBlank}
              alt="User"
              className="w-48 h-48 rounded-full object-cover border-4 border-purple-300"
            />
          </div>

          <div className="md:w-2/3 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-purple-700 mb-4">
                {loadingUserInfo ? 'Loading...' : (userInfo?.name || 'Name: N/A')}
              </h1>

              <p className="text-lg mb-2"><span className="font-semibold">Login Email: </span>{user?.email || 'N/A'}</p>
              <p className="text-lg mb-2"><span className="font-semibold">Candidate Email: </span>{userInfo?.candidateEmail || userInfo?.email || 'N/A'}</p>
              <p className="text-lg mb-2"><span className="font-semibold">Subject / Program: </span>{userInfo?.subject || 'N/A'}</p>
              <p className="text-lg mb-2"><span className="font-semibold">Current Institution: </span>{userInfo?.currentInstitution || 'N/A'}</p>
              <p className="text-lg mb-2"><span className="font-semibold">Education Level: </span>{userInfo?.educationLevel || 'N/A'}</p>
              <p className="text-lg mb-2"><span className="font-semibold">CGPA / %: </span>{userInfo?.cgpa || 'N/A'}</p>
              <p className="text-lg mb-2"><span className="font-semibold">Phone: </span>{userInfo?.phoneNumber || 'N/A'}</p>
              <p className="text-lg mb-2"><span className="font-semibold">Date of Birth: </span>{userInfo?.birth ? new Date(userInfo.birth).toLocaleDateString() : 'N/A'}</p>
              <p className="text-lg mb-2"><span className="font-semibold">Address: </span>{userInfo?.address || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 bg-gradient-to-r from-purple-50 to-pink-50 flex justify-center px-4">
        <div className="w-full max-w-4xl bg-white border-2 border-purple-200 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg transform transition-transform hover:scale-105 animate-pulse">
                !
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-semibold text-purple-700">Complete your profile</h3>
            <p className="text-sm text-gray-600 mt-1">
              Add missing details so you can apply to colleges and upload documents. This section is important.
            </p>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-purple-600 to-pink-500"
                  style={{ width: `${completion}%` }}
                  aria-valuenow={completion}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{completion}% complete</p>

              {missing.length > 0 && (
                <div className="mt-3 text-sm text-gray-700">
                  <strong>Missing:</strong>
                  <ul className="list-disc ml-5 mt-1">
                    {missing.map((m) => (
                      <li key={m} className="capitalize">
                        {m === 'photoUrl' || m === 'photo' ? 'Profile photo' : m === 'phoneNumber' ? 'Phone number' : m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link
              to={`/profileEdit/${userInfo?.email || user?.email}`}
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-400 text-white font-semibold rounded-full shadow-2xl transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
              aria-label="Update profile information"
            >
              Update Profile
            </Link>
            <div className="text-center text-xs text-gray-500 mt-2">Click to update your details & uploads</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white border border-purple-100 rounded-2xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-purple-700">My Admissions</h2>
          <Link
            to="/admission"
            className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg shadow hover:bg-purple-700 transition"
          >
            + Apply for New
          </Link>
        </div>

        {loadingAdmissions ? (
          <p className="text-center py-8 text-gray-500">Loading your admissions...</p>
        ) : admissions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-3">No admissions found.</p>
            <Link
              to="/admission"
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow hover:opacity-90 transition"
            >
              Browse Colleges
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            {admissions.map(a => (
              <div
                key={a._id}
                className="p-5 rounded-2xl border border-purple-100 bg-gradient-to-br from-white to-purple-50 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-purple-700">{a.college_name || a.collegeName || 'College'}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Applied: {a.createdAt ? new Date(a.createdAt).toLocaleString() : '—'}
                </p>
                <p className="text-sm mt-2"><strong>Candidate:</strong> {a.name}</p>
                <p className="text-sm"><strong>Email:</strong> {a.candidateEmail}</p>
                <p className="text-sm"><strong>Transaction:</strong> {a.transactionId || '—'}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/universityDetails/${a.collegeId}`}
                    className="text-sm text-purple-600 hover:underline"
                  >
                    View College →
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      {a.status || 'Submitted'}
                    </span>

                    {['approved', 'rejected'].includes(a.status) && (
                      <Link
                        to={`/review/${a.collegeId}`}
                        state={{ admission: a }}
                        className="ml-3 inline-block px-3 py-1.5 bg-gradient-to-r from-green-500 to-teal-400 text-white text-sm rounded-lg shadow hover:opacity-90 transition"
                      >
                        Leave Review
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;