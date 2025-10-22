import React, { useContext, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Authentication/useAxiosSecure';
import { AuthContext } from '../../Authentication/AuthProvider';

const ProfileEdit = () => {
    const { user } = useContext(AuthContext);
    const [submitting, setSubmitting] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        const form = event.target;
        const name = form.name.value.trim();
        const subject = form.subject.value.trim();
        const candidateEmail = form.candidateEmail.value.trim() || user?.email;
        const currentInstitution = form.currentInstitution.value.trim();
        const educationLevel = form.educationLevel.value;
        const cgpa = form.cgpa.value.trim();
        const address = form.address.value.trim();
        const photoUrl = form.photoUrl.value.trim();
        const phoneNumber = form.phoneNumber.value.trim();
        const birth = form.birth.value;

        const email = user?.email;

        const updateInfo = {
            name,
            subject,
            candidateEmail,
            currentInstitution,
            educationLevel,
            cgpa,
            address,
            photoUrl,
            phoneNumber,
            birth,
            email,
        };

        try {
            // only call axiosSecure for the PATCH (no extra verification)
            const res = await axiosSecure.patch(`/updateProfile/${encodeURIComponent(email)}`, updateInfo);
            const data = res?.data || {};

            if (data.modifiedCount > 0 || data.acknowledged || data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile updated',
                    text: 'Your profile has been updated successfully.',
                    showConfirmButton: false,
                    timer: 1400
                });
                navigate('/profile', { state: { updatedProfile: updateInfo } });
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'No changes',
                    text: 'No changes were detected or saved.',
                });
            }
        } catch (err) {
            console.error('Update failed', err);
            Swal.fire({
                icon: 'error',
                title: 'Update failed',
                text: 'There was an error updating your profile. Try again later.',
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="flex justify-center my-12 px-4">
            <Form onSubmit={handleSubmit} className="w-full max-w-3xl">
                <div className="bg-white shadow-2xl p-8 rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-6 text-purple-700">Update Profile & Admission Info</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Candidate Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Full name" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Subject / Program</span>
                            </label>
                            <input type="text" name="subject" placeholder="Desired program" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Candidate Email</span>
                            </label>
                            <input type="email" name="candidateEmail" defaultValue={user?.email || ''} placeholder="candidate@example.com" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Current University / College</span>
                            </label>
                            <input type="text" name="currentInstitution" placeholder="e.g. City University" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Education Level</span>
                            </label>
                            <select name="educationLevel" className="select select-bordered w-full" defaultValue="BBA" required>
                                <option value="HSC">HSC</option>
                                <option value="SSC">SSC</option>
                                <option value="BBA">BBA</option>
                                <option value="BBA Hons">BBA Hons</option>
                                <option value="Hons">Hons</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">CGPA / Percentage</span>
                            </label>
                            <input type="number" name="cgpa" step="0.01" min="0" max="100" placeholder="e.g. 3.75 or 85" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Candidate Photo URL</span>
                            </label>
                            <input type="url" name="photoUrl" placeholder="https://..." className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="tel" name="phoneNumber" placeholder="+1 555 555 5555" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Date of Birth</span>
                            </label>
                            <input type="date" name="birth" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Login Email (read only)</span>
                            </label>
                            <input type="text" name="email" defaultValue={user?.email || ''} className="input input-bordered w-full bg-gray-100" readOnly />
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" name="address" placeholder="Street, City, Country" className="input input-bordered w-full" required />
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`px-6 rounded-lg font-semibold transition ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'
                                }`}
                        >
                            {submitting ? 'Saving...' : 'Save Profile'}
                        </button>

                        <div className="text-sm text-gray-500">
                            These fields are required for college admission.
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default ProfileEdit;