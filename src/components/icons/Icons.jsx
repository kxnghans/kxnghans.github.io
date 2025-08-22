import React from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaWindowClose,            // Added for the close button
  FaExternalLinkAlt,  // Added for external links
} from 'react-icons/fa';

export const ChevronLeftIcon = () => <FaChevronLeft className="w-6 h-6" />;
export const ChevronRightIcon = () => <FaChevronRight className="w-6 h-6" />;
export const CloseIcon = () => <FaWindowClose className="w-6 h-6 text-red-500" />;
export const ExternalLinkIcon = () => <FaExternalLinkAlt className="inline-block w-4 h-4 ml-1" />;