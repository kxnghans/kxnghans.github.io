import React from 'react';
import Section from './Section';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons';
import { skillsData } from '../../data/skills';
import DetailModal from '../modals/DetailModal';

const SkillsSlideshow = () => {
    const [selectedSkill, setSelectedSkill] = React.useState(null);
    const slideshowRef = React.useRef(null);

    const scroll = (scrollOffset) => {
        slideshowRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    };

    const placeholderImageUrl = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <Section title="Skills" className="flex-1 flex flex-col min-h-0 !p-0 sm:!p-2 md:!p-4">
            <div className="relative flex-1 flex items-center">
                <button onClick={() => scroll(-320)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200/80 hover:bg-white dark:bg-dark-card/80 dark:hover:bg-dark-shadow-light p-1 sm:p-2 rounded-full transition-colors z-10">
                    <ChevronLeftIcon />
                </button>
                <div ref={slideshowRef} className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pt-4 pb-4 pl-4 scroll-pl-4 scrollbar-hide h-full items-center">
                    <div className="flex-shrink-0 w-8 sm:w-10 md:w-12"></div>
                    {skillsData.map((skill, index) => (
                        <div key={index} 
                             className="snap-start flex-shrink-0 w-64 sm:w-72 md:w-80 bg-gray-200 bevel-light dark:neumorphic-outset-dark rounded-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
                             onClick={() => setSelectedSkill(skill)}>
                            <img src={placeholderImageUrl} alt={skill.title} className="w-full h-32 sm:h-40 object-cover" />
                            <div className="p-3 sm:p-4">
                                <h3 className="text-md sm:text-lg font-bold mb-2 text-gray-900 dark:text-gray-300 truncate">{skill.title}</h3>
                                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm h-12 sm:h-16 overflow-hidden space-y-1">
                                    {(() => {
                                        let allDetails = [];
                                        if (skill.details) {
                                            allDetails = allDetails.concat(skill.details);
                                        }
                                        if (skill.exposure) {
                                            allDetails.push("Exposure to: " + skill.exposure.join(", "));
                                        }
                                        if (skill.subcategories) {
                                            skill.subcategories.forEach(subcat => {
                                                allDetails.push(subcat.title + ": " + subcat.details.join(", "));
                                            });
                                        }

                                        let displayString = "";
                                        allDetails.forEach((item, i) => {
                                            displayString += item;
                                            if (i < allDetails.length - 1) {
                                                displayString += ", ";
                                            }
                                            if ((i + 1) % 5 === 0 && i !== allDetails.length - 1) {
                                                displayString += "<br />";
                                            }
                                        });
                                        return <span dangerouslySetInnerHTML={{ __html: displayString }} />;
                                    })()}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex-shrink-0 w-4 sm:w-6 md:w-8"></div>
                </div>
                <button onClick={() => scroll(320)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200/80 hover:bg-white dark:bg-dark-card/80 dark:hover:bg-dark-shadow-light p-1 sm:p-2 rounded-full transition-colors z-10">
                    <ChevronRightIcon />
                </button>
            </div>
            {selectedSkill && <DetailModal item={selectedSkill} onClose={() => setSelectedSkill(null)} />}
        </Section>
    );
}

export default SkillsSlideshow;