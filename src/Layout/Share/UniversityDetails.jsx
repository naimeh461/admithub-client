import React, { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useLoaderData, useParams } from 'react-router-dom';

const UniversityDetails = () => {

    const params = useParams();
    const [university, setUniversity] = useState([]);
    useEffect(() => {
        fetch(`https://admit-hub-server.vercel.app/universityDetails/${params.id}`)
            .then(res => res.json())
            .then(data => setUniversity(data));
    }, [])
    const {college_name,college_image, admission_data ,events, research_history, sports , college_rating , number_of_research , admission_process , events_details , research_works , sports_categories } = university
    return (
        <div className="w-[80%] m-auto">
         <div className="ring-2 ring-[#291334] ring-inset rounded-lg my-20">
            <div className="flex justify-between purple-primary p-5 rounded-t-md">
                    <h2 className="text-3xl font-bold">{college_name}</h2>
                    <Rating  className="" style={{ maxWidth: 100 }} value={Math.round(college_rating)}/>
            </div>
           <div className='text-center flex justify-center  p-10'>
           <figure className=''><img className="" src={college_image} alt="Album"/></figure>
           </div>
            <div className="flex flex-col gap-6 mt-4 text-center p-2 ">
                <p className="text-xl font-semibold"><span className="text-lg font-semibold">Admission Date :</span> {admission_data}</p>
                <p><span className="text-lg font-semibold">Admission Process :</span> {admission_process}</p>
                <p><span className="text-lg font-semibold">Events :</span> {events?.join(", ")}</p>
                <p><span className="text-lg font-semibold">Sports :</span> {sports?.join(", ")}</p>
                <p><span className="text-lg font-semibold">Research History :</span> {research_history}</p>
                <p><span className="text-lg font-semibold">Number of Research :</span> {number_of_research}</p>
                <p className=' purple-primary text-center p-2 rounded-lg w-[80%] mx-auto'><p className="text-lg font-semibold underline-offset-8 bg-white p-2 text-purple-950 mb-2">Sports</p> {sports_categories?.map((sport, index) => <div key={index}>
                    <div className='grid grid-cols-3 text-center justify-center items-center  p-2 rounded-2xl gap-10 mb-2 bg-[#3f204e]'>
                    <p c>Sports : {sport.category_name}</p>
                    <p>Team : {sport.team_name}</p>
                    <p>Captain : {sport.captain}</p>
                    </div>
                </div>)}</p>
                <p className=' purple-primary text-center p-2 rounded-lg w-[80%] mx-auto mb-10'><p className="text-lg font-semibold underline-offset-8 bg-white p-2 text-purple-950 mb-2">Research Work</p> {research_works?.map((work, index) => <div key={index}>
                    <div className='grid grid-cols-3 text-center justify-center items-center  p-2 rounded-2xl mb-2 bg-[#3f204e]  gap-10'>
                    <p >Research Title : {work.title}</p>
                    <p >Date : {work.publication_date}</p>
                    <p> Authors : {work.authors.join(", ")}</p>
                    
                    </div>
                </div>)}</p>
            </div>
    </div>
    </div>
    );
};

export default UniversityDetails;