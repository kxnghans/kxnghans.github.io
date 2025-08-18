import React from 'react';

const Section = ({ title, children, className = '' }) => (
    <div className={`bg-gray-100 bevel-light dark:neumorphic-outset-dark rounded-2xl p-6 mb-8 ${className}`}>
        <h2 className="text-3xl font-bold mb-6 text-red-500 border-b-2 border-gray-300 dark:border-gray-700 pb-3">{title}</h2>
        {children}
    </div>
);

export default Section;