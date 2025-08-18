import React from 'react';
import ProfileSummaryCard from '../components/ui/ProfileSummaryCard';
import ProjectSlideshow from '../components/ui/ProjectSlideshow';

const HomePage = () => (
    <div className="h-full flex flex-col">
        <ProfileSummaryCard />
        <ProjectSlideshow />
    </div>
);

export default HomePage;