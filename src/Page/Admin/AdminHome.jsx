import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAdmin from "../../Authentication/useAdmin";
import useAxiosSecure from "../../Authentication/useAxiosSecure";

const StatCard = ({ title, value, hint }) => (
  <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-purple-700 mt-2">{value}</p>
    </div>
    {hint && <p className="text-xs text-gray-400 mt-3">{hint}</p>}
  </div>
);

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const [axiosSecure] = useAxiosSecure();

  const { data: universities = [], isLoading: univLoading } = useQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      const res = await axiosSecure.get("/university");
      return res.data || [];
    },
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", "recent"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return Array.isArray(res.data) ? res.data.slice(0, 6) : [];
    },
  });

  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["admin", "payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data?.payments || [];
    },
    enabled: !!isAdmin,
  });



  const { data: admissions = [], isLoading: admissionsLoading } = useQuery({
    queryKey: ["admin", "admissions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/admissions");
      return res.data?.admissions || [];
    },
    enabled: !!isAdmin,
  });

  const revenue = useMemo(() => {
    return (Array.isArray(payments) ? payments : []).reduce((sum, p) => {
      const amount = Number(p.amount ?? p.price ?? p.total ?? p.paymentAmount ?? 0);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  }, [payments]);

  const loading =
    isAdminLoading ||
    univLoading ||
    reviewsLoading ||
    paymentsLoading ||
    admissionsLoading;

  if (isAdminLoading) return <div className="p-6">Checking admin role...</div>;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access denied</h2>
          <p className="text-gray-600">You must be an administrator to access this page.</p>
          <Link to="/" className="mt-4 inline-block text-sm text-purple-600">Go to site home</Link>
        </div>
      </div>
    );
  }

  const totalUniversities = Array.isArray(universities) ? universities.length : 0;
  const totalReviews = Array.isArray(reviews) ? reviews.length : 0;
  const paymentsCount = Array.isArray(payments) ? payments.length : 0;
  const totalAdmissions = Array.isArray(admissions) ? admissions.length : 0;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-purple-700">Admin Home</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.displayName || user?.email}</p>
            <p className="text-xs text-gray-400 mt-1">Overview of universities, admissions, reviews and revenue</p>
          </div>

          <div className="flex gap-3">
            <Link to="/dashboard/addClass" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg shadow">
              Add University
            </Link>
            <Link to="/dashboard/manageUser" className="px-4 py-2 border border-purple-200 text-purple-700 rounded-lg bg-white shadow-sm">
              Manage Users
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Universities" value={totalUniversities} hint="From /university endpoint" />
          <StatCard title="Admissions (total)" value={totalAdmissions} hint="From /admin/admissions" />
          <StatCard title="Total Reviews (sample)" value={totalReviews} hint="Last few public reviews" />
          <StatCard title="Revenue" value={revenue != null ? `$${Number(revenue).toFixed(2)}` : "—"} hint={`${paymentsCount} payments recorded`} />
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Admissions</h2>
              <Link to="/dashboard/manageAdmissions" className="text-sm text-purple-600">Manage →</Link>
            </div>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : admissions.length === 0 ? (
              <p className="text-gray-500">No admissions found.</p>
            ) : (
              <ul className="space-y-3">
                {admissions.slice(0, 8).map(a => (
                  <li key={a._id || a.id} className="p-3 rounded-md border border-gray-100 flex justify-between items-start">
                    <div>
                      <div className="text-sm font-semibold text-purple-700">{a.college_name || a.collegeName || "College"}</div>
                      <div className="text-xs text-gray-500">{a.name || a.candidateName} • {a.candidateEmail || a.userEmail}</div>
                      <div className="text-xs text-gray-400 mt-1">{a.status || "pending"} • {a.createdAt ? new Date(a.createdAt).toLocaleString() : "—"}</div>
                    </div>
                    <div className="text-right">
                      <Link to={`/universityDetails/${a.collegeId}`} className="text-xs text-purple-600 hover:underline">View</Link>
                      <div className="text-xs text-gray-400 mt-2">{a.transactionId ? "Tx: " + String(a.transactionId).slice(0, 8) : "No payment"}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Payments & Revenue</h2>
              <Link to="/dashboard/payments" className="text-sm text-purple-600">All Payments →</Link>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Total payments: <span className="font-semibold text-gray-800">{paymentsCount}</span></p>
              <p className="text-sm text-gray-500">Total revenue: <span className="font-semibold text-purple-700">{revenue != null ? `$${Number(revenue).toFixed(2)}` : "—"}</span></p>
            </div>

            {payments.length === 0 ? (
              <p className="text-gray-500">No recent payments to show.</p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {payments.slice(0, 6).map(p => (
                  <li key={p._id || p.transactionId || Math.random()} className="p-3 rounded-md border border-gray-100 flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium">{p.email || p.userEmail || "Unknown user"}</div>
                      <div className="text-xs text-gray-500">{p.classId || p.collegeId || "—"}</div>
                      <div className="text-xs text-gray-400 mt-1">{p.date ? new Date(p.date).toLocaleString() : (p.createdAt ? new Date(p.createdAt).toLocaleString() : '')}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-purple-700">${Number(p.amount ?? p.price ?? p.total ?? p.paymentAmount ?? 0).toFixed(2)}</div>
                      <div className="text-xs text-gray-400 mt-2">{p.transactionId ? String(p.transactionId).slice(0, 8) : '—'}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-3 bg-white rounded-xl shadow p-5 mt-6 lg:mt-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Reviews</h2>
              <Link to="/dashboard/reviews" className="text-sm text-purple-600">All Reviews →</Link>
            </div>

            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews found.</p>
            ) : (
              <ul className="space-y-3">
                {reviews.map((r, idx) => (
                  <li key={idx} className="p-3 rounded-md border border-gray-100">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium text-sm">{r.user_name || r.userEmail || "Anonymous"}</div>
                        <div className="text-xs text-gray-500">{r.university || r.collegeName || "Unknown college"}</div>
                      </div>
                      <div className="text-sm font-semibold text-purple-700">{r.rating ?? "—"}/5</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{r.review}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;