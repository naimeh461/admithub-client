import React, { useEffect, useState } from 'react';
import UniversityCard from '../../Layout/Share/UniversityCard';

const Colleges = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        fetch(`https://admit-hub-server.vercel.app/alluniversitydetails`)
            .then(res => res.json())
            .then(data => setColleges(data));
    },[])
    return (
        <div>
            <div className='my-20 flex flex-col gap-10'>
            {
                colleges.map(college => <UniversityCard key={college._id} college={college}></UniversityCard>)
            }

        </div>
        </div>
    );
};

export default Colleges;