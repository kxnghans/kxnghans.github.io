import React from 'react';
import Section from './Section';
import DetailModal from '../modals/DetailModal';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons';
import { certificationsData } from '../../data/certifications';

const CertificationsSlideshow = () => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const slideshowRef = React.useRef(null);

    const scroll = (scrollOffset) => {
        slideshowRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    };

    return (
        <Section title="Certifications" className="flex-1 flex flex-col min-h-0 !p-0 sm:!p-2 md:!p-4">
            <div className="relative flex-1 flex items-center">
                <button onClick={() => scroll(-320)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200/80 hover:bg-white dark:bg-dark-card/80 dark:hover:bg-dark-shadow-light p-1 sm:p-2 rounded-full transition-colors z-10">
                    <ChevronLeftIcon />
                </button>
                <div ref={slideshowRef} className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pt-4 pb-4 pl-4 scroll-pl-4 scrollbar-hide h-full items-center">
                    <div className="flex-shrink-0 w-8 sm:w-10 md:w-12"></div>
                    {certificationsData.map((item, index) => (
                        <div key={index} 
                             className="snap-start flex-shrink-0 w-64 sm:w-72 md:w-80 bg-gray-200 bevel-light dark:neumorphic-outset-dark rounded-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300" 
                             onClick={() => setSelectedItem(item.details)}>
                            <img src={item.imageUrl} alt={item.title} className="w-full h-32 sm:h-40 object-cover" />
                            <div className="p-3 sm:p-4">
                                <h3 className="text-md sm:text-lg font-bold mb-2 text-gray-900 dark:text-gray-300 truncate">{item.title}</h3>
                                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm h-12 sm:h-16 overflow-hidden space-y-1">
                                    {item.summary.map((line, i) => (
                                        <p key={i} className="truncate">{line}</p>
                                    ))}
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
            {selectedItem && <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </Section>
    );
}

export default CertificationsSlideshow;