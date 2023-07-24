import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
const Graduate = () => {
    const [graduates, setGraduates] = useState([]);
    useEffect(() => {
        fetch(`https://admit-hub-server.vercel.app/graduate`)
            .then(res => res.json())
            .then(data => setGraduates(data));
    }, [])
    return (
        <div className='mt-80'>
            <div>
                <h2 className='text-center text-4xl font-bold  text-[#291334]'>Graduate Student</h2>
            </div>
            <div className='grid gap-10  p-4 w-[80%] mx-auto mt-10'>
            <Marquee className="rounded-xl" speed={40}  gradient gradientWidth={10}>
                {
                    graduates.map((graduate,index )=> 
                        <div key={index} className='px-20' >
                        <div className="card w-96 purple-primary">
                            <figure className=' h-[150px] '><img  src={graduate.image} alt="car!" /></figure>
                            <div className="card-body  text-center">
                                <h2 className="text-lg font-semibold">{graduate.college_name}</h2>
                            </div>
                        </div>
                </div>)
                }
             </Marquee>
            </div>
        </div>
    );
};

export default Graduate;