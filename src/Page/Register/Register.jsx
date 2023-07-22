import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';
import { Form, Link, useNavigate } from 'react-router-dom';
import {FaGoogle,FaGithub} from "react-icons/fa";
const Register = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [photo, setPhoto] = useState("");
    const {createUser,googleSignIn,gitHubUser, updateUserProfile} = useContext(AuthContext)
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
        if(password.length < 6){
            setError("Please add at least 6 characters in your password");
            return;
        }
        createUser(email,password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setSuccess("Account create successfully")
            navigate("/", {replace: true})
        })
        .catch(error =>{
            setError(error.message)
        })
        setName(name);
        setPhoto(photo)

    }
    //updater image and name
    updateUserProfile(name,photo)

    const handleGoogle = () => {
        googleSignIn()
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate("/", {replace: true})
        })
        .catch((error) => {
            setError(error.message);
        })
    }

    // GitHub Register
    const handleGitHub = () => {
        gitHubUser()
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate("/", {replace: true})
        })
        .catch((error) => {
            setError(error.message);
        })
    }
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

                                    <div className='mt-10 gap-2 m-auto flex'>
                                        <button className="p-2 rounded-lg text-sm purple-primary flex items-center gap-2" onClick={handleGoogle}>
                                            Register with Google <FaGoogle />
                                        </button>
                                        <button className="p-2 rounded-lg text-sm purple-primary flex items-center gap-2" onClick={handleGitHub}>
                                            <p>Register with GitHub</p> <FaGithub />
                                        </button>
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