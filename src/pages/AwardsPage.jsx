import React from 'react';
import Section from '../components/ui/Section';
import DetailModal from '../components/modals/DetailModal';
import { awardsData } from '../data/awards';

const AwardsPage = () => {
    const [selectedItem, setSelectedItem] = React.useState(null);

    return (
        <Section title="Awards & Certifications">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {awardsData.map((award, index) => (
                    <div key={index} 
                         className="bg-gray-200 bevel-light dark:neumorphic-outset-dark rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2" 
                         onClick={() => setSelectedItem(award)}>
                        <img src={award.imageUrl} alt={award.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-300 truncate">{award.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm h-10 overflow-hidden">{award.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
             {selectedItem && <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </Section>
    );
};

export default AwardsPage;