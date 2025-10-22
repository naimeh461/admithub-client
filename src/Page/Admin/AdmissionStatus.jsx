import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Authentication/useAxiosSecure";
import useAdmin from "../../Authentication/useAdmin";

const AdmissionStatus = () => {
  const [axiosSecure] = useAxiosSecure();
  const [isAdmin, isAdminLoading] = useAdmin();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);

  const { data: admissions = [], isLoading } = useQuery({
    queryKey: ["admin", "admissions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/admissions");
      return res.data?.admissions ?? [];
    },
    enabled: !!isAdmin,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status, reason }) => {
      const res = await axiosSecure.patch(`/admin/admissions/${id}/status`, { status, reason });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "admissions"] });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: data?.message || "Admission status updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err?.response?.data?.message || "Something went wrong!",
      });
    },
  });

  if (isAdminLoading) return <div className="p-6">Checking admin role...</div>;
  if (!isAdmin) return <div className="p-6 text-red-600">Access denied. Admins only.</div>;
  if (isLoading) return <div className="p-6">Loading admissions...</div>;

  // 🔹 Handle Approve Action
  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve Admission?",
      text: "Are you sure you want to approve this admission?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    });

    if (result.isConfirmed) {
      updateStatus.mutate({ id, status: "approved" });
    }
  };

  // 🔹 Handle Reject Action
  const handleReject = async (id) => {
    const { value: reason } = await Swal.fire({
      title: "Reject Admission",
      input: "textarea",
      inputLabel: "Enter reason (optional)",
      inputPlaceholder: "Write reason here...",
      inputAttributes: { "aria-label": "Type your reason here" },
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#dc2626",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (value.length > 200) {
          return "Reason too long (max 200 characters)";
        }
      },
    });

    if (reason !== undefined) {
      updateStatus.mutate({ id, status: "rejected", reason });
    }
  };

  // 🔹 Handle View Details Popup
  const handleView = (ad) => {
    Swal.fire({
      title: `<h3 class="text-sm font-bold text-purple-700">Admission Details</h3>`,
      html: `
        <div class="text-left text-sm text-gray-700 ">
          <div><strong>Name:</strong> ${ad.name || "—"}</div>
          <div><strong>Email:</strong> ${ad.candidateEmail || ad.userEmail || "—"}</div>
          <div><strong>College:</strong> ${ad.college_name || ad.collegeName || "—"}</div>
          <div><strong>Phone:</strong> ${ad.phoneNumber || "—"}</div>
          <div><strong>Status:</strong> ${ad.status}</div>
          ${
            ad.rejectionReason
              ? `<div><strong>Rejection Reason:</strong> ${ad.rejectionReason}</div>`
              : ""
          }
          <div><strong>Transaction ID:</strong> ${ad.transactionId || "—"}</div>
        </div>
      `,
      width: 600,
      confirmButtonText: "Close",
      confirmButtonColor: "#6d28d9",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Admissions — Manage Status
      </h2>

      {admissions.length === 0 ? (
        <div className="p-6 text-gray-500 text-center">No admissions found.</div>
      ) : (
        <div className="overflow-x-auto shadow-lg bg-white rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Candidate</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">College</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Applied</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admissions.map((a) => {
                const id = a._id ?? a.id;
                return (
                  <tr key={id} className="hover:bg-purple-50 transition">
                    <td className="px-6 py-3 font-medium text-gray-800">{a.name || "—"}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {a.candidateEmail || a.userEmail || "—"}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      {a.college_name || a.collegeName || "—"}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      {a.createdAt ? new Date(a.createdAt).toLocaleString() : "—"}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3  rounded-full text-xs font-semibold ${
                          a.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : a.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {a.status || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-3 flex gap-2">
                      <button
                        className="px-3  bg-green-600 hover:bg-green-700 text-white rounded text-sm transition"
                        onClick={() => handleApprove(id)}
                        disabled={updateStatus.isLoading}
                      >
                        Approve
                      </button>

                      <button
                        className="px-3  bg-red-600 hover:bg-red-700 text-white rounded text-sm transition"
                        onClick={() => handleReject(id)}
                        disabled={updateStatus.isLoading}
                      >
                        Reject
                      </button>

                      <button
                        className="px-3  bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm transition"
                        onClick={() => handleView(a)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdmissionStatus;
