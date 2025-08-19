import React from 'react';
import Section from '../components/ui/Section';
import ProjectModal from '../components/modals/ProjectModal';
import { projectData } from '../data/projects';

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = React.useState(null);
    return (
        <Section title="Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectData.map((project, index) => (
                    <div key={index} 
                         className="bg-gray-200 bevel-light dark:neumorphic-outset-dark rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2" 
                         onClick={() => setSelectedProject(project.details)}>
                        <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-300 truncate">{project.title}</h3>
                            <div className="text-gray-600 dark:text-gray-400 text-sm h-24 overflow-hidden space-y-1">
                                {project.summary.map((line, i) => (
                                    <p key={i} className="truncate">{line}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </Section>
    );
};

export default ProjectsPage;