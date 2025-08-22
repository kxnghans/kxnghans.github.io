import React, { useEffect, useRef } from 'react';
import { CloseIcon } from '../icons/Icons';

const ProjectModal = ({ project, onClose }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div ref={modalRef} className="bg-gray-100 dark:bg-[#181818] rounded-lg w-3/5 relative transform transition-all duration-300 bevel-light dark:bevel-dark">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl z-10"><CloseIcon /></button>
                <div className="p-6">
                    <h2 className="text-3xl font-bold mb-4 text-red-500">{project.title}</h2>
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        <p><span className="font-semibold">Challenge:</span> {project.challenge}</p>
                        <p><span className="font-semibold">Action:</span> {project.action}</p>
                        <p><span className="font-semibold">Outcome:</span> {project.outcome}</p>
                    </div>
                     <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Highlights</h3>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                            {project.highlights.map((highlight, i) => (
                                <li key={i}>
                                    <span className="font-semibold">{highlight.label}:</span> {highlight.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="mt-6 flex space-x-4">
                        <a href="#" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform bevel-button-dark">Live Project</a>
                        <a href="#" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform bevel-button-dark">Code Repository</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;