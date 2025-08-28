import React from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaWindowClose, // Added for the close button
  FaExternalLinkAlt, // Added for external links
} from "react-icons/fa";

export const ChevronLeftIcon = () => <FaChevronLeft className="h-6 w-6" />;
export const ChevronRightIcon = () => <FaChevronRight className="h-6 w-6" />;
export const CloseIcon = () => (
  <FaWindowClose className="h-6 w-6 text-red-500" />
);
export const ExternalLinkIcon = () => (
  <FaExternalLinkAlt className="ml-1 inline-block h-4 w-4" />
);
