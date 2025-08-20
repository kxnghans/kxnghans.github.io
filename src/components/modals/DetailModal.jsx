import React from 'react';

const DetailModal = ({ item, onClose }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-gray-100 dark:bg-[#181818] rounded-lg w-3/5 h-3/4 relative transform transition-all duration-300 bevel-light dark:bevel-dark flex flex-col">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl z-10">&times;</button>
            <div className="p-6 py-4 overflow-y-auto max-h-full">
                <h2 className="text-3xl font-bold mb-2 text-red-500">{item.title}</h2>
                {item.subtitle && <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">{item.subtitle}</p>}
                <div className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {item.challenge && <p><span className="font-semibold">Challenge:</span> {item.challenge}</p>}
                    {item.action && <p><span className="font-semibold">Action:</span> {item.action}</p>}
                    {item.outcome && <p><span className="font-semibold">Outcome:</span> {item.outcome}</p>}
                    {Array.isArray(item.details) && 
                        (item.title === "LinkedIn Learning Courses" ? (
                            (() => {
                                const elements = [];
                                let currentGroup = [];

                                const renderGroup = (group) => {
                                    if (group.length > 0) {
                                        elements.push(
                                            <ul key={`group-${elements.length}`} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                                {group.map((detail, index) => (
                                                    <li key={index} className="mb-2">
                                                        {detail.includes(':') ? (
                                                            <>
                                                                <span className="font-semibold">{detail.split(':')[0]}</span>:
                                                                {detail.split(':').slice(1).join(':')}
                                                            </>
                                                        ) : (
                                                            detail
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    }
                                };

                                item.details.forEach((detail, index) => {
                                    if (detail.endsWith(':')) {
                                        renderGroup(currentGroup);
                                        currentGroup = [];
                                        elements.push(
                                            <h4 key={`header-${index}`} className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700 pb-1">{detail.slice(0, -1)}</h4>
                                        );
                                    } else {
                                        currentGroup.push(detail);
                                    }
                                });
                                renderGroup(currentGroup); // Render any remaining items
                                return elements;
                            })()
                        ) : (
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-3">
                                {item.details.map((detail, index) => (
                                    <li key={index}>
                                        {detail.includes(':') ? (
                                            <>
                                                <span className="font-semibold">{detail.split(':')[0]}</span>:
                                                {detail.split(':').slice(1).join(':')}
                                            </>
                                        ) : (
                                            detail
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ))
                    }
                </div>
                {item.highlights &&
                    <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Highlights</h3>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                            {item.highlights.map((highlight, i) => (
                                <li key={i}>
                                    <span className="font-semibold">{highlight.label}:</span> {highlight.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </div>
    </div>
);

export default DetailModal;