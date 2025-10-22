import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Authentication/useAxiosSecure";
import useAdmin from "../../Authentication/useAdmin";

const ManageUser = () => {
  const [axiosSecure] = useAxiosSecure();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [selectedUser, setSelectedUser] = useState(null);
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data?.users ?? res.data ?? [];
    },
    enabled: !!isAdmin,
  });

  // Fetch selected user details
  const { data: userDetails = null, isFetching: userLoading } = useQuery({
    queryKey: ["user", selectedUser],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${selectedUser}`);
      return res.data?.user ?? res.data ?? null;
    },
    enabled: !!selectedUser && !!isAdmin,
    staleTime: 1000 * 60 * 5,
  });

  // Mutation for changing roles
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (variables?.id) queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });

  // Role change handler
  const handleChangeRole = (id, role) => {
    if (!window.confirm(`Change role to "${role}"?`)) return;
    roleMutation.mutate({ id, role });
  };

  // Loading & access states
  if (isAdminLoading) return <div className="p-10 text-gray-600">Checking admin role...</div>;
  if (!isAdmin) return <div className="p-10 text-red-500 text-lg">🚫 Access denied. Admins only.</div>;
  if (isLoading) return <div className="p-10 text-gray-600">Loading users...</div>;

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">👥 Manage Users</h2>

      <div className="overflow-x-auto shadow-xl bg-white/90 backdrop-blur rounded-2xl border border-gray-100">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Role</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr
                key={u._id ?? u.id}
                className={`transition hover:bg-purple-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">{u.name || "—"}</td>
                <td className="px-6 py-4 text-gray-700">{u.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {u.role || "student"}
                  </span>
                </td>
                <td className="px-6  flex gap-6">
                  <button
                    className="px-3 bg-gradient-to-r from-blue-500 to-purple-300 hover:bg-blue-600 text-white rounded-md text-sm transition"
                    onClick={() => setSelectedUser(u._id ?? u.id)}
                  >
                    View
                  </button>

                  {/* Show only one button depending on role */}
                  {u.role === "admin" ? (
                    <button
                      className="w-32 bg-gradient-to-r from-purple-800 to-indigo-600 hover:bg-green-600 text-white rounded-full text-xs transition"
                      onClick={() => handleChangeRole(u._id ?? u.id, "student")}
                    >
                      Make Student
                    </button>
                  ) : (
                    <button
                      className="w-32 bg-gradient-to-r from-purple-800 to-indigo-600 hover:bg-purple-700 text-white rounded-full text-xs transition"
                      onClick={() => handleChangeRole(u._id ?? u.id, "admin")}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 p-8 relative animate-fadeIn">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4 text-purple-700">User Details</h3>

            {userLoading ? (
              <p className="text-gray-600">Loading user...</p>
            ) : !userDetails ? (
              <p className="text-gray-600">No details found.</p>
            ) : (
              <>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <strong>Name:</strong> {userDetails.name || "—"}
                  </div>
                  <div>
                    <strong>Email:</strong> {userDetails.email}
                  </div>
                  <div>
                    <strong>Role:</strong>{" "}
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {userDetails.role || "student"}
                    </span>
                  </div>

                  {Object.entries(userDetails).map(([k, v]) => {
                    if (["name", "email", "role", "_id", "id", "__v"].includes(k)) return null;
                    return (
                      <div key={k}>
                        <strong>{k}:</strong> {String(v)}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  {/* Only one role toggle button */}
                  {userDetails.role === "admin" ? (
                    <button
                      onClick={() =>
                        handleChangeRole(userDetails._id ?? userDetails.id, "student")
                      }
                      disabled={roleMutation.isLoading}
                      className="px-4  bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                    >
                      Make Student
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleChangeRole(userDetails._id ?? userDetails.id, "admin")
                      }
                      disabled={roleMutation.isLoading}
                      className="px-4 bg-gradient-to-r from-purple-100 to-indigo-600 text-white rounded-md transition"
                    >
                      Make Admin
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
