import React, { useContext, useState } from 'react';
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Authentication/AuthProvider';
import {FaGoogle,FaGithub} from "react-icons/fa";
import SocialMediaLogin from '../../Layout/Share/SocialMediaLogin';

const LogIn = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const location = useLocation()
    const from = location.state?.from.pathname || "/"
    const navigate = useNavigate();

    const {googleSignIn,signIn} = useContext(AuthContext)
    const handleLogin=(event)=> {
        event.preventDefault();
        setSuccess("");
        setError("");
        const form = event.target
        const password = form.password.value;
        const email = form.email.value;
        signIn(email,password)

        .then(result => {
              const signInUser = result.user
              console.log(signInUser);
              form.reset();
              setSuccess("Your login successfully");
              navigate(from, {replace: true})
        })
        .catch(error => {
            setError(error.message);
        })
    }
 
    return (
        <div>
        <Form onSubmit={handleLogin} className="hero min-h-screen bg-base-200">
                <div>
                <h1 className="text-3xl font-bold mb-10 text-center">Log in</h1>
                <div className=" text-center justify-center  items-center">
                        <div className="-ml-32">
                            
                        </div>
                    <div>
                        <div className="text-center lg:text-left">
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body flex flex-col justify-center m-auto">
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email"className="input input-bordered" />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" />
                            </div>
                            <label className="label -mb-5 tex">
                                <p><Link className='text-[#75458d] ' to="/forget">Forget Password</Link> <br /></p>
                            </label>
                            <div className="form-control mt-6">
                            <button className="btn purple-primary">Login</button>

                          
                            <div className='flex flex-col justify-center items-center'>
                                <SocialMediaLogin></SocialMediaLogin>
                            </div>
                           
                            <label className="label mt-2">
                                <p>Do not Have an Account ? <Link className='text-[#75458d] ' to="/register">Register</Link> <br /></p>
                            </label>
                            </div>
                            <p className='text-red-700 mt-3'>{error}</p>
                            <p className='text-green-700 mt-3'>{success}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        </Form>
        </div>

    );
};

export default LogIn;