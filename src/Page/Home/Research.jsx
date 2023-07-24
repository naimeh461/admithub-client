import React, { useEffect, useState } from 'react';
import ResearchWorks from '../../Layout/Share/ResearchWorks';


const Research = () => {
    const [researches, setResearches] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/research`)
            .then(res => res.json())
            .then(data => setResearches(data));
    }, [])
    return (

        <div className='mt-80'>
            <h2 className='text-center text-4xl font-bold  text-[#291334] mb-20'>Research Paper</h2>
            <div className='grid lg:grid-cols-3 md:grid-col-2 gap-5 w-[80%] mx-auto'>
            {
                researches.map(research => <ResearchWorks key={research._id} research={research}></ResearchWorks>)
            }
            </div>
        </div>
    );
};

export default Research;