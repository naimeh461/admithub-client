import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';
import { Form, Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub } from "react-icons/fa";
import SocialMediaLogin from '../../Layout/Share/SocialMediaLogin';
const Register = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [photo, setPhoto] = useState("");
    const { createUser, googleSignIn, gitHubUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();
    //Register by email and password
    const handleRegister = (event) => {
        event.preventDefault();
        setSuccess("")
        setError("")
        const form = event.target;
        const name = form.name.value;
        const password = form.password.value;
        const email = form.email.value;
        const photo = form.photo.value;
        if (password.length < 6) {
            setError("Please add at least 6 characters in your password");
            return;
        }
        createUser(email, password)
            .then(() => {
                const saveUser = { name: name, email: email, photo: photo }
                fetch('http://localhost:3000/users', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Create user Success Fully',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
                reset();
                navigate("/")
            })
            .catch(error => {
                setError(error.message)
            })
        setName(name);
        setPhoto(photo)

    }
    //updater image and name
    updateUserProfile(name, photo)


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <Form onSubmit={handleRegister} className="flex flex-col text-center justify-center items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold mb-10">Register</h1>
                    </div>
                    <div className='flex m-auto text-center justify-center'>

                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="name" name="name" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo url</span>
                                    </label>
                                    <input type="text" placeholder="photo" name="photo" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" placeholder="email" name="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                                    <label className="label">
                                        <p>Already Have an Account <Link className='text-blue-400' to="/login">Log in</Link> <br /></p>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn purple-primary">Register</button>

                                    <div className='flex flex-col justify-center items-center'>
                                        <SocialMediaLogin></SocialMediaLogin>
                                    </div>
                                    <p className='text-red-700 mt-3'>{error}</p>
                                    <p className='text-green-700 mt-3'>{success}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;