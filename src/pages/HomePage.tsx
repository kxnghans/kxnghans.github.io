import ProfileSummaryCard from "../components/ui/ProfileSummaryCard";
import ProjectSlideshow from "../components/ui/ProjectSlideshow";
import SkillsSlideshow from "../components/ui/SkillsSlideshow";

const HomePage = () => (
  <>
    <title>Hanson-Tube | Systems Engineer & Portfolio</title>
    <meta
      name="description"
      content="Interactive portfolio covering systems engineering, data science, and software projects by Kobby Hanson."
    />
    <div className="flex flex-col">
      <div className="mb-2">
        <ProfileSummaryCard />
      </div>
      <div className="mb-2">
        <ProjectSlideshow />
      </div>
      <div className="mb-2">
        <SkillsSlideshow />
      </div>
    </div>
  </>
);

export default HomePage;
