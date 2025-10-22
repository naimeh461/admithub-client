import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';
import { Form, Link, useNavigate } from 'react-router-dom';
import SocialMediaLogin from '../../Layout/Share/SocialMediaLogin';
import Swal from 'sweetalert2';

const Register = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [photo, setPhoto] = useState("");
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        createUser(email, password)
            .then(() => {
                const saveUser = { name, email, photo, role: "student" };
                fetch('http://localhost:3000/users', {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                icon: 'success',
                                title: 'User Created Successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });

                updateUserProfile(name, photo);
                setName(name);
                setPhoto(photo);
                navigate("/");
            })
            .catch(err => setError(err.message));
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">
                <h2 className="text-4xl font-bold text-center text-purple-700 mb-6">Register</h2>

                <Form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="input input-bordered w-full rounded-lg px-4 py-2"
                        required
                    />
                    <input
                        type="text"
                        name="photo"
                        placeholder="Photo URL"
                        className="input input-bordered w-full rounded-lg px-4 py-2"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input input-bordered w-full rounded-lg px-4 py-2"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input input-bordered w-full rounded-lg px-4 py-2"
                        required
                    />

                    <p className="text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-purple-600 font-semibold hover:underline">
                            Log in
                        </Link>
                    </p>

                    <button className="btn w-full bg-gradient-to-r from-purple-600 to-pink-400 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-500 transition-all duration-300">
                        Register
                    </button>

                    <div className="my-4 flex justify-center">
                        <SocialMediaLogin />
                    </div>

                    {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                    {success && <p className="text-green-600 text-center mt-2">{success}</p>}
                </Form>
            </div>
        </div>
    );
};

export default Register;
