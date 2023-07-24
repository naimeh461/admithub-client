import React, { useContext } from 'react';
import { Form } from 'react-router-dom';
import { AuthContext } from '../../Authentication/AuthProvider';
import Swal from 'sweetalert2';

const ProfileEdit = () => {
    const { user } = useContext(AuthContext);
    const handleSubmit = () => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const candidateEmail = form.candidateEmail.value;
        const address = form.address.value;
        const collegeName = form.university.value;
        const email = user.email;

        const updateInfo = { name: name, candidateEmail: candidateEmail, address: address, email: email, collegeName: collegeName, }
        fetch(`https://admit-hub-server.vercel.app/updateProfile/${email}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Update Profile Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    return (
        <div>
            <Form onSubmit={handleSubmit} className="flex flex-col text-center justify-center items-center my-10  ">
                <div className="form-control shadow-2xl p-14 flex flex-col gap-5 my-20 rounded-3xl">
                    <h2 className="-mt-14 mb-10 text-2xl purple-primary p-2 rounded-b-lg">Update College</h2>
                    <div className='flex flex-col gap-10 mx-auto'>
                        <div className="flex gap-10 ">
                            <div >
                                <label className="label">
                                    <span className="label-text">Candidate Name</span>
                                </label>
                                <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                            </div>

                            <div >
                                <label className="label">
                                    <span className="label-text">Subject</span>
                                </label>
                                <input type="text" placeholder="Subject" name="subject" className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="flex gap-10">
                            <div>
                                <label className="label">
                                    <span className="label-text">Candidate email</span>
                                </label>
                                <input type="email" placeholder="Candidate Email" name="candidateEmail" className="input input-bordered" required />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">University</span>
                                </label>
                                <input type="text" placeholder="University" name="university" className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="flex gap-10">
                            <div>
                                <label className="label">
                                    <span className="label-text">Candidate Address</span>
                                </label>
                                <input type="text" placeholder="Address" name="address" className="input input-bordered" required />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Login Email</span>
                                </label>
                                <input type="text" placeholder={user.email} name="email" className="input input-bordered" readOnly />
                            </div>
                        </div>

                    </div>

                    <div className="form-control mt-6">
                        <input className=" purple-primary btn-block p-3 rounded-lg" type="submit" value="Submit" />
                    </div>
                </div>

            </Form>
        </div>
    );
};

export default ProfileEdit;