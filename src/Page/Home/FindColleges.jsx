import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
const FindColleges = () => {
    const [colleges, setColleges] = useState([]);
    const searchRef = useRef(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/university?search=${search}`)
            .then(res => res.json())
            .then(data => setColleges(data));
    }, [search])

    const handleSearch = () => {
        setSearch(searchRef.current.value);
    }

    console.log(colleges)
    return (
        <div>
            <div className="input-group w-[80%] mx-auto mt-20">
                <input type="text" ref={searchRef} placeholder="Search" className="input input-bordered w-[90%]" />
                <button onClick={handleSearch} className="btn btn-square purple-primary"><AiOutlineSearch></AiOutlineSearch></button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-20 w-[80%] mx-auto'>
            {
                colleges.map(college =>
                    <div key={college._id} className='' >
                        <div className="card w-96 glass">
                            <figure className='p-10'><img  src={college.college_image} alt="car!" /></figure>
                            <div className="card-body  text-center">
                                <h2 className="text-xl font-semibold">{college.college_name}</h2>
                            </div>
                        </div>
                </div>)
            }
            </div>

        </div>
    );
};

export default FindColleges;