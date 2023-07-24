import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';
import { Link } from 'react-router-dom';

const MyCollege = () => {
    const { user } = useContext(AuthContext);


    const [userinfo, setUserinfo] = useState([]);
    useEffect(() => {
        fetch(`https://admit-hub-server.vercel.app/addedclass/${user.email}`)
            .then(res => res.json())
            .then(data => setUserinfo(data));
    }, [])
   
    return (
        <div>
            {userinfo.college_name ? <div className="card lg:card-side bg-base-100 shadow-2xl w-[80%] mx-auto my-56">
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
                        <button className="btn purple-primary"><Link to={`/review/${userinfo._id}`}>Review</Link></button>
                    </div>
                </div>
            </div>
            : <>
            <div className='text-center mt-10'>
                <p className='text-3xl font-bold'>No College Added</p>
            </div>
            <div className='h-full min-h-screen'>

            </div>
            
            </>
            }
            
        </div>
    );
};

export default MyCollege;