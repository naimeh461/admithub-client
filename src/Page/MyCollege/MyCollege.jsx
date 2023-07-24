import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';

const MyCollege = () => {
    const { user } = useContext(AuthContext);


    const [userinfo, setUserinfo] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/addedclass/${user.email}`)
            .then(res => res.json())
            .then(data => setUserinfo(data));
    }, [])
    console.log(userinfo)
    return (
        <div>
            <div className="card lg:card-side bg-base-100 shadow-2xl w-[80%] mx-auto my-56">
                <figure><img src={userinfo.college_image}  alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{userinfo.college_name}</h2>
                    <p><span className="text-lg font-semibold">Candidate Name : </span>{userinfo.name}</p>
                    <p><span className="text-lg font-semibold">Candidate Email : </span>{userinfo.candidateEmail}</p>
                    <p><span className="text-lg font-semibold">Subject : </span>{userinfo.subject}</p>
                    <p><span className="text-lg font-semibold">Birth Date : </span>{userinfo.birth}</p>
                    <p><span className="text-lg font-semibold">Phone : </span>{userinfo.phoneNumber}</p>
                    <p><span className="text-lg font-semibold">Address : </span>{userinfo.address}</p>
                    <div className="card-actions justify-end">
                        <button className="btn purple-primary">Review</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCollege;