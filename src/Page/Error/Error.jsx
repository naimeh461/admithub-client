import React from 'react';
import { Link, useRouteError } from "react-router-dom";
import bgImg  from "../../assets/background404.png"
const Error = () => {
    const { error } = useRouteError()
    return (
        <div>
              <div className="hero min-h-screen bg-local "  >
                <img src={bgImg} alt="" className="lg:h-screen -mt-32 "/>
                
                <div className="hero-content text-center text-neutral-content ">
                    <div className="max-w-md text-center lg:mt-20">
                        <h1 className="lg:-mt-20 lg:ml-11 w-full  text-2xl font-bold bg-[#291334] text-White p-4 rounded-2xl"> {error?.message} <br /> <hr className="my-2" /> PAGE NOT FOUND</h1>
                        <Link to="/"><button className="btn btn-white mt-[700px] text-2xl bg-[#291334] text-white">Go Back To Home</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;