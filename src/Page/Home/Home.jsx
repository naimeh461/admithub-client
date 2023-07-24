import React from 'react';
import FindColleges from './findColleges';
import Top3 from './Top3';
import Graduate from './Graduate';
import Research from './Research';
import Review from './Review';

const Home = () => {
    return (
        <div>
            <FindColleges></FindColleges>
            <Top3 ></Top3>
            <Graduate></Graduate>
            <Research></Research>
            <Review></Review>
        </div>
    );
};

export default Home;