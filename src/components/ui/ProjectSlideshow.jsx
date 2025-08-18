import React from 'react';
import Section from './Section';
import ProjectModal from '../modals/ProjectModal';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons';
import { projectData } from '../../data/projects';

const ProjectSlideshow = () => {
    const [selectedProject, setSelectedProject] = React.useState(null);
    const slideshowRef = React.useRef(null);

    const scroll = (scrollOffset) => {
        slideshowRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    };

    return (
        <Section title="Recommendations (Projects)" className="flex-1 flex flex-col min-h-0 !p-0 md:!p-2 lg:!p-4">
            <div className="relative flex-1 flex items-center">
                <button onClick={() => scroll(-320)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200/80 hover:bg-white dark:bg-dark-card/80 dark:hover:bg-dark-shadow-light p-2 rounded-full transition-colors z-10">
                    <ChevronLeftIcon />
                </button>
                <div ref={slideshowRef} className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-4 scrollbar-hide h-full items-center px-12">
                    {projectData.map((project, index) => (
                        <div key={index} 
                             className="snap-start flex-shrink-0 w-72 md:w-80 bg-gray-200 bevel-light dark:neumorphic-outset-dark rounded-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300" 
                             onClick={() => setSelectedProject(project)}>
                            <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-300 truncate">{project.title}</h3>
                                <div className="text-gray-600 dark:text-gray-400 text-sm h-16 overflow-hidden space-y-1">
                                    {project.highlights.slice(0, 2).map((highlight, i) => (
                                        <p key={i} className="truncate">
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">{highlight.label}:</span> {highlight.value}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => scroll(320)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200/80 hover:bg-white dark:bg-dark-card/80 dark:hover:bg-dark-shadow-light p-2 rounded-full transition-colors z-10">
                    <ChevronRightIcon />
                </button>
            </div>
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </Section>
    );
}

export default ProjectSlideshow;