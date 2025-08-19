import React from 'react';
import ProfileSummaryCard from '../components/ui/ProfileSummaryCard';
import ProjectSlideshow from '../components/ui/ProjectSlideshow';
import SkillsSlideshow from '../components/ui/SkillsSlideshow';

const HomePage = () => (
    <div className="flex flex-col">
        <div className="mb-8">
            <ProfileSummaryCard />
        </div>
        <div className="mb-8">
            <ProjectSlideshow />
        </div>
        <div className="mb-8">
            <SkillsSlideshow />
        </div>
    </div>
);

export default HomePage;