import React from 'react';

const ProfileSummaryCard = () => (
    <div className="bg-gray-100 bevel-light dark:neumorphic-outset-dark rounded-2xl p-4 sm:p-6 mb-8">
         <div className="flex flex-col sm:flex-row items-center">
            <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Kobby Hanson"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 sm:mb-0 sm:mr-6 object-cover border-4 border-red-600 shadow-lg"
            />
            <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-200">Kobby Hanson</h1>
                <p className="text-md sm:text-lg text-gray-500 dark:text-gray-400">Systems Engineer & Sr Business Analyst</p>
                <p className="text-md sm:text-lg text-red-500 dark:text-red-400"><a href="https://hansondeck.com" target="_blank" rel="noopener noreferrer">Entrepreneur</a></p>
                <div className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <p>Masters in Data Science - UC Berkeley</p>
                    <p>Bachelors in Electrical Engineering - UCCS</p>
                </div>
            </div>
        </div>
    </div>
);

export default ProfileSummaryCard;