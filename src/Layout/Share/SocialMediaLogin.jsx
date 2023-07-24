import React, { useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';
import Swal from "sweetalert2";
import { AuthContext } from '../../Authentication/AuthProvider';


const SocialMediaLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"
    const { googleSignIn } = useContext(AuthContext)

    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
                const saveUser = { name: user.displayName, email: user.email }
                fetch('https://admit-hub-server.vercel.app/users', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(saveUser)
                })
            })
            .then(data => {
                console.log(data)
                Swal.fire({
                    icon: 'success',
                    title: 'Login Success Fully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true })
            })
            .catch((error) => {
                setError(error.message);
            })
    }


    return (
        <div >
            <div className='mt-10 '>
                <button className="p-2 rounded-lg text-sm purple-primary flex items-center gap-2 " onClick={handleGoogle}>
                    Register with Google <FaGoogle />
                </button>
            </div>
        </div>


    );
};

export default SocialMediaLogin;