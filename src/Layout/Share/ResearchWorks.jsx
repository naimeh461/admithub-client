import React from 'react';

const ResearchWorks = ({ research }) => {

    const { college_name, college_image, research_works } = research
    return (
        <div className='grid '>

            <div className='grid card'>
                {
                    research_works.map((work, index) =>
                        <div key={index}>
                            {/* <div className="glass card">
                            <figure><img className='w-[200px] h-[150px] card' src={work.image} alt="car!" /></figure>
                            <div className="">
                                <h2 className="">Life hack</h2>
                                
                                <div className=" justify-end">
                                    <button className="btn btn-primary">Learn now!</button>
                                </div>
                            </div>
                        </div> */}
                            <div className="card w-96 h-56 mb-32 bg-base-100 shadow-xl image-full">
                                <figure><img src={work.image} alt="Shoes" className='w-[400px] h-[100px]' /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{work.title}</h2>
                                    <p>University : {college_name}</p>
                                    <p>{work.publication_date}</p>
                                    <p><span className="text-lg font-semibold">Authors :</span> {work.authors.join(", ")}</p>
                                    <div className="card-actions justify-end">
                                        <a href={work.link} className="btn ">Read Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ResearchWorks;