import React from 'react';
import Image from './Image';
import AboutSection from './AboutSection';
import Trend from './Home';


const Dashboard = () => {
    return (
        <div>
            <Image/>
            <section id="section-1">
            <AboutSection/>
            </section>
            <Trend/>
        </div>
    );
    
};
export default Dashboard;