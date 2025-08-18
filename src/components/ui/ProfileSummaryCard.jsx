import React from 'react';

const ProfileSummaryCard = () => (
    <div className="bg-gray-100 bevel-light dark:neumorphic-outset-dark rounded-2xl p-6 mb-8">
         <div className="flex flex-col md:flex-row items-center">
            <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Kobby Hanson"
                className="w-32 h-32 rounded-full mb-6 md:mb-0 md:mr-8 object-cover border-4 border-red-600 shadow-lg"
            />
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">Kobby Hanson</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">Systems Engineer (Lead) & Sr. Business Analyst</p>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <p>Masters in Data Science - UC Berkeley</p>
                    <p>Bachelors in Electrical Engineering - UCCS</p>
                </div>
            </div>
        </div>
    </div>
);

export default ProfileSummaryCard;