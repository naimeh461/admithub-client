import React, { useEffect, useState } from 'react';
import UniversityCard from '../../Layout/Share/UniversityCard';

const Top3 = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/universitydetails`)
            .then(res => res.json())
            .then(data => setColleges(data));
    },[])
    return (
        <div className='my-20 flex flex-col gap-10  mt-48'>
            <h2 className='text-center text-4xl font-bold  text-[#291334]'>Toy 3 University</h2>
            {
                colleges.map(college => <UniversityCard key={college._id} college={college}></UniversityCard>)
            }

        </div>
    );
};

export default Top3;