import React from "react";
import { FaLinkedin } from "react-icons/fa6";
import profileImage from "../../../assets/Kobs DP.png";

const ProfileSummaryCard = () => (
  <div className="bevel-light dark:neumorphic-outset-dark mb-8 rounded-2xl bg-gray-100 p-4 sm:p-6">
    <div className="flex flex-col items-center sm:flex-row">
      <img
        src={profileImage}
        alt="Kobby Hanson"
        className="mb-4 h-24 w-24 rounded-full border-4 border-red-600 object-cover shadow-lg sm:mb-0 sm:mr-6 sm:h-32 sm:w-32"
      />
      <div className="text-center sm:text-left">
        <h1 className="flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-gray-200 sm:justify-start sm:text-4xl">
          Kobby Hanson
          <a
            href="https://www.linkedin.com/in/kobbyhanson"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-gray-400 hover:text-gray-500"
          >
            <FaLinkedin size={30} />
          </a>
        </h1>
        <p className="text-md text-gray-500 dark:text-gray-400 sm:text-lg">
          Systems Engineer & Sr Business Analyst
        </p>
        <p className="text-md text-red-500 dark:text-red-400 sm:text-lg">
          <a
            href="https://hansondeck.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Entrepreneur
          </a>
        </p>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          <p>Masters in Data Science - UC Berkeley</p>
          <p>Bachelors in Electrical Engineering - UCCS</p>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileSummaryCard;
