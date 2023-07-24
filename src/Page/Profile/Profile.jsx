import React, { useContext, useEffect, useState } from 'react';

import userBlank from "../../assets/blank.png"
import { AuthContext } from '../../Authentication/AuthProvider';
import { Link } from 'react-router-dom';
const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userInfo, setUserinfo] = useState([]);
    useEffect(() => {
        fetch(`https://admit-hub-server.vercel.app/addedclass/${user.email}`)
            .then(res => res.json())
            .then(data => setUserinfo(data));
    }, [])

    return (
        <div className='my-20'>


            <div className="card card-side shadow-xl w-[80%] mx-auto my-52 bg-[#291334] text-white">
                <figure>
                {userInfo?.photo ? <img className='h-[400px]' src={userInfo?.photo} alt="Movie" /> : <img src={userBlank} className='h-[400px]' alt="Movie" />}
                </figure>
                <div className="card-body">
                {userInfo?.name ? <h2 className="text-4xl font-semibold mb-6">{userInfo?.name}</h2> : <h2 className="text-4xl font-semibold">Name : N/A</h2>}
                {userInfo?.college_name ? <h2 className="text-xl"> <span className="text-lg font-semibold">College Name : </span>{userInfo?.college_name}</h2> : <h2 className="text-xl"> <span className="text-lg font-semibold">College Name : </span> N/A</h2>}
                {userInfo?.candidateEmail ? <h2 className="text-xl"> <span className="text-lg font-semibold">Candidate Email : </span>{userInfo?.candidateEmail}</h2> : <h2 className="text-xl"> <span className="text-lg font-semibold">Candidate Email : </span> N/A</h2>}
                {userInfo?.phoneNumber ? <h2 className="text-xl"> <span className="text-lg font-semibold">Phone Number : </span>{userInfo?.phoneNumber}</h2> : <h2 className="text-xl"> <span className="text-lg font-semibold">Phone Number :</span> N/A</h2>}
                {userInfo?.subject ? <h2 className="text-xl"> <span className="text-lg font-semibold">Subject :  </span>{userInfo?.subject}</h2> : <h2 className="text-xl"> <span className="text-lg font-semibold">Subject : </span> N/A</h2>}
                {userInfo?.address ? <h2 className="text-xl"> <span className="text-lg font-semibold">Address : </span>{userInfo?.address}</h2> : <h2 className="text-xl"> <span className="text-lg font-semibold">Address : </span> N/A</h2>}
                    
                    <div className="card-actions justify-end">
                        <button className="btn bg-white"><Link to ={`/profileEdit/${userInfo?.email}`}>Edit Profile</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;