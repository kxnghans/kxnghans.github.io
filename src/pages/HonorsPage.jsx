import React from 'react';
import Section from '../components/ui/Section';
import DetailModal from '../components/modals/DetailModal';
import CertificationsSlideshow from '../components/ui/CertificationsSlideshow';
import { honors } from '../data/honors';

const HonorsPage = () => {
    const [selectedItem, setSelectedItem] = React.useState(null);

    return (
        <div className="flex flex-col">
            <Section title="Honors & Awards">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {honors.map((honor, index) => (
                        <div key={index} 
                             className="bg-gray-200 bevel-light dark:neumorphic-outset-dark rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2" 
                             onClick={() => setSelectedItem(honor.details)}>
                            <img src={honor.imageUrl} alt={honor.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-300 truncate">{honor.title}</h3>
                                <div className="text-gray-600 dark:text-gray-400 text-sm h-10 overflow-hidden">
                                    {honor.summary.map((line, i) => (
                                        <p key={i} className="truncate">{line}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
            <div className="mb-8">
                <CertificationsSlideshow />
            </div>
             {selectedItem && <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </div>
    );
};

export default HonorsPage;