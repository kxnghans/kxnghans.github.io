import React from 'react';
import ProfileSummaryCard from '../components/ui/ProfileSummaryCard';
import ProjectSlideshow from '../components/ui/ProjectSlideshow';

const HomePage = () => (
    <div className="h-full flex flex-col">
        <div className="mb-8">
            <ProfileSummaryCard />
        </div>
        <div className="mb-8">
            <ProjectSlideshow />
        </div>
    </div>
);

export default HomePage;