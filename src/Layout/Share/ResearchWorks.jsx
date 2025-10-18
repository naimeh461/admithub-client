import React from 'react';

const ResearchWorks = ({ research }) => {

    const { college_name, college_image, research_works } = research
    return (
        <div className='grid '>

            <div className='grid card'>
                {
                    research_works.map((work, index) =>
                        <div key={index}>

                            <div className="card md:w-96 h-56 mb-32 bg-base-100 shadow-xl image-full ">
                                {/* Conditionally render only if image exists */}
                                {work.image ? (
                                    <figure>
                                        <img
                                            src={work.image}
                                            className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
                                        />
                                    </figure>
                                ) : null}

                                <div className="card-body ">
                                    <h2 className="card-title">{work.title}</h2>
                                    <p>University : {college_name}</p>
                                    <p>{work.publication_date}</p>
                                    <p><span className="text-lg font-semibold">Authors :</span> {work.authors.join(", ")}</p>
                                    <div className="card-actions justify-end">
                                        <a href={work.link} className="block px-3 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-300 text-white mt-2">Read Now</a>
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