import React from 'react';
import Section from '../components/ui/Section';
import DetailModal from '../components/modals/DetailModal';
import { educationData } from '../data/education';

const EducationPage = () => {
    const [selectedItem, setSelectedItem] = React.useState(null);

    return (
        <Section title="Education">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {educationData.map((edu, index) => (
                    <div key={index} 
                         className="bg-gray-200 bevel-light dark:neumorphic-outset-dark rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2" 
                         onClick={() => setSelectedItem(edu.details)}>
                        <img src={edu.imageUrl} alt={edu.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-2 text-red-500 dark:text-red-400 truncate">{edu.title}</h3>
                            <div className="text-gray-600 dark:text-gray-400 text-sm h-20 overflow-hidden space-y-1">
                                {edu.summary.map((line, i) => (
                                    <p key={i} className="truncate">{line}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedItem && <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </Section>
    );
};

export default EducationPage;