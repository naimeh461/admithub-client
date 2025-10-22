// ...existing code...
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../Authentication/useAxiosSecure";
import useStudent from "../../Authentication/useStudent";
// ...existing code...

const AdmissionFrom = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialPassedPayment = location.state?.payment || null;
  const passedCourse = location.state?.course || null;
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [isStudent, isStudentLoading] = useStudent();
  const [university, setUniversity] = useState(null);
  const [passedPayment, setPassedPayment] = useState(initialPassedPayment);

  console.log("AdmissionFrom - passedPayment:", passedPayment, axiosSecure);
  useEffect(() => {
    if (passedCourse) {
      setUniversity(passedCourse);
      return;
    }
    if (params.id) {
      fetch(`http://localhost:3000/admission/${params.id}`)
        .then((r) => r.json())
        .then((data) => setUniversity(data))
        .catch(() => setUniversity(null));
    }
  }, [passedCourse, params.id]);

  // If no payment passed in state, try server-side check (fallback)
  useEffect(() => {
    if (!university) return;
    if (passedPayment) return;

    if (!user?.email) {
      navigate("/login");
      return;
    }

    const q = new URLSearchParams({ email: user.email, classId: university._id }).toString();
    fetch(`http://localhost:3000/payments/check?${q}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.paid) {
          setPassedPayment(data.payment || data.payment);
        } else {
          navigate(`/payment/${university._id}`);
        }
      })
      .catch(() => {
        navigate(`/payment/${university._id}`);
      });
  }, [university, passedPayment, user, navigate]);

  // simplified submit using axiosSecure.post
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isStudentLoading) {
      Swal.fire({ icon: "info", title: "Please wait", text: "Checking user role..." });
      return;
    }

    if (!isStudent) {
      Swal.fire({
        icon: "error",
        title: "Not allowed",
        text: "Only students can submit admission.",
      });
      return;
    }

    if (!passedPayment) {
      Swal.fire({ icon: "error", title: "No payment", text: "Complete payment first." });
      return;
    }

    const form = e.target;
    const payload = {
      candidateName: form.name.value,
      photoUrl: form.photoUrl.value,
      subject: form.subject.value,
      candidateEmail: form.candidateEmail.value || user?.email,
      phoneNumber: form.phoneNumber.value,
      birth: form.birth.value,
      address: form.address.value,
      collegeId: university?._id || params.id,
      collegeName: university?.college_name || university?.name,
      collegeImage: university?.college_image,
      userEmail: user?.email,
      transactionId: passedPayment.transactionId || passedPayment.transaction_id || passedPayment.id,
      paymentRaw: passedPayment,
      createdAt: new Date(),
      status: 'panding'
    };

    // use axiosSecure.post and handle response with .then/.catch
    axiosSecure
      .post("/collegeAdmission", payload)
      .then((res) => {
        const ok = res?.data?.insertResult || res?.data?.success || (res?.status >= 200 && res?.status < 300);
        if (ok) {
          Swal.fire({ icon: "success", title: "Admission submitted", timer: 1400, showConfirmButton: false });
          navigate("/");
        } else {
          console.error("Admission response:", res.data);
          Swal.fire({ icon: "error", title: "Submission failed", text: "Server returned unexpected response." });
        }
      })
      .catch((err) => {
        console.error("Admission error:", err);
        Swal.fire({ icon: "error", title: "Error", text: "Could not submit admission. Try again later." });
      });
  };

  if (!university) return null;

  return (
    <div className="flex justify-center my-12">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6 text-purple-700">{university.college_name || "Admission"} - Application</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Candidate Name</label>
            <input name="name" required className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Candidate Photo URL</label>
            <input name="photoUrl" required className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">Subject / Program</label>
            <input name="subject" required className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Candidate Email</label>
            <input name="candidateEmail" defaultValue={user?.email} className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">Phone Number</label>
            <input name="phoneNumber" required className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Date of Birth</label>
            <input name="birth" type="date" required className="input input-bordered w-full" />
          </div>

          <div className="md:col-span-2">
            <label className="label">Address</label>
            <input name="address" required className="input input-bordered w-full" />
          </div>
        </div>

        <div className="mt-6">
          <button type="submit" className="bg-purple-600 text-white px-6  rounded hover:bg-purple-700">
            Submit Admission
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionFrom;
// ...existing code...