import React from 'react';
import {
  FaHome,
  FaUserGraduate,
  FaBriefcase,
  FaAward,
  FaBars,
  FaSearch,
  FaMicrophone,
  FaSun,
  FaMoon,
  FaChevronLeft,
  FaChevronRight,
  FaCode,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaPaperPlane,
  FaTimes, // Added for the close button
  FaExternalLinkAlt, // Added for external links
} from 'react-icons/fa';

export const HomeIcon = () => <FaHome className="w-6 h-6" />;
export const ProjectsIcon = () => <FaCode className="w-6 h-6" />;
export const EducationIcon = () => <FaUserGraduate className="w-6 h-6" />;
export const WorkIcon = () => <FaBriefcase className="w-6 h-6" />;
export const HonorsIcon = () => <FaAward className="w-6 h-6" />;
export const MoreIcon = () => <FaBars className="w-6 h-6" />;
export const MenuIcon = () => <FaBars className="w-6 h-6" />;
export const SearchIcon = () => <FaSearch className="w-4 h-4" />;
export const MicIcon = ({ className }) => (
  <div className="w-6 h-6 flex items-center justify-center">
    <FaMicrophone className={`w-5 h-5 ${className}`} />
  </div>
);
export const SunIcon = () => <FaSun className="w-6 h-6" />;
export const MoonIcon = () => <FaMoon className="w-6 h-6" />;
export const ChevronLeftIcon = () => <FaChevronLeft className="w-6 h-6" />;
export const ChevronRightIcon = () => <FaChevronRight className="w-6 h-6" />;
export const EnvelopeIcon = () => <FaEnvelope className="w-6 h-6 mr-3 text-red-500" />;
export const PhoneIcon = () => <FaPhone className="w-6 h-6 mr-3 text-red-500" />;
export const LinkedinIcon = () => <FaLinkedin className="w-6 h-6 mr-3 text-red-500" />;
export const GithubIcon = () => <FaGithub className="w-6 h-6 mr-3 text-red-500" />;
export const GlobeIcon = () => <FaGlobe className="w-6 h-6 mr-3 text-red-500" />;
export const PaperPlaneIcon = () => <FaPaperPlane className="ml-2" />;
export const CloseIcon = () => <FaTimes className="w-6 h-6" />; // New component
export const ExternalLinkIcon = () => <FaExternalLinkAlt className="inline-block w-4 h-4 ml-1" />; // New component