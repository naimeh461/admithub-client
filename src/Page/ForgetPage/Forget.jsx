import React, { useContext, useState } from 'react';
import { Form } from 'react-router-dom';
import { AuthContext } from '../../Authentication/AuthProvider';

const Forget = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { resetPassword } = useContext(AuthContext)
    const handleForget = (event) => {
        event.preventDefault();
        setSuccess("");
        setError("");
        const form = event.target
        const email = form.email.value;
        resetPassword(email)
            .then(result => {
                setSuccess("Password reset email sent!");

            })
            .catch(error => {
                setError(error.message);
            })


    }
    return (
        <div>
            <Form onSubmit={handleForget} className="hero min-h-screen h-24 bg-base-200">
                <div>
                    <h1 className="text-3xl font-bold mb-10 text-center">Forget Password</h1>
                    <div className=" text-center justify-center  items-center">
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body flex flex-col justify-center m-auto">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" name="email" className="input input-bordered" />
                                </div>

                                <button className="btn purple-primary">Submit</button>
                            </div>
                        </div>
                        <div>
                            <p className='text-red-700 mt-3'>{error}</p>
                            <p className='text-green-700 mt-3'>{success}</p>
                        </div>
                    </div>
                </div>

            </Form>
        </div>
    );
};

export default Forget;