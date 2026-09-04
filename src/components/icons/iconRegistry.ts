/**
 * @file iconRegistry.ts
 * @description Centralized Icon Registry mapping semantic icon names to react-icon glyphs.
 * Direct imports from react-icons are restricted outside this module.
 */
import type { IconType } from "react-icons";
import {
  FaBars,
  FaSearch,
  FaPlayCircle,
  FaMicrophone,
  FaTimesCircle,
  FaWindowClose,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaSyncAlt,
  FaHome,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaAward,
  FaChartLine,
  FaDollarSign,
  FaClock,
  FaCode,
  FaUsers,
  FaExternalLinkAlt,
  FaSun,
  FaMoon,
  FaMedal,
  FaProjectDiagram,
  FaCog,
  FaBolt,
  FaBuilding,
  FaStar,
  FaCompass,
} from "react-icons/fa";
import {
  FaCirclePlay,
  FaImage,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaPhoneVolume,
  FaEnvelopeCircleCheck,
  FaPaperPlane,
} from "react-icons/fa6";

export const ICONS = {
  // Navigation & Core UI
  MENU: "MENU",
  SEARCH: "SEARCH",
  PLAY: "PLAY",
  PLAY_CIRCLE: "PLAY_CIRCLE",
  MICROPHONE: "MICROPHONE",
  CLOSE: "CLOSE",
  CLOSE_CIRCLE: "CLOSE_CIRCLE",
  CHEVRON_DOWN: "CHEVRON_DOWN",
  CHEVRON_LEFT: "CHEVRON_LEFT",
  CHEVRON_RIGHT: "CHEVRON_RIGHT",
  CHECK: "CHECK",
  SYNC: "SYNC",
  IMAGE: "IMAGE",
  SEND: "SEND",
  EXTERNAL_LINK: "EXTERNAL_LINK",
  USERS: "USERS",
  SUN: "SUN",
  MOON: "MOON",
  MEDAL: "MEDAL",
  COG: "COG",
  BOLT: "BOLT",
  BUILDING: "BUILDING",
  STAR: "STAR",
  COMPASS: "COMPASS",

  // Sections & Navigation
  HOME: "HOME",
  WORK: "WORK",
  PROJECTS: "PROJECTS",
  EDUCATION: "EDUCATION",
  CERTIFICATION: "CERTIFICATION",
  HONORS: "HONORS",
  VALUE: "VALUE",
  SKILLS: "SKILLS",

  // Metrics & Value KPIs
  DOLLAR: "DOLLAR",
  CLOCK: "CLOCK",

  // Social & External Links
  LINKEDIN: "LINKEDIN",
  GITHUB: "GITHUB",
  GLOBE: "GLOBE",
  PHONE: "PHONE",
  EMAIL: "EMAIL",
} as const;

export type IconKey = keyof typeof ICONS;
export type IconName = (typeof ICONS)[IconKey];

export const ICON_MAP: Record<IconName, IconType> = {
  [ICONS.MENU]: FaBars,
  [ICONS.SEARCH]: FaSearch,
  [ICONS.PLAY]: FaPlayCircle,
  [ICONS.PLAY_CIRCLE]: FaCirclePlay,
  [ICONS.MICROPHONE]: FaMicrophone,
  [ICONS.CLOSE]: FaWindowClose,
  [ICONS.CLOSE_CIRCLE]: FaTimesCircle,
  [ICONS.CHEVRON_DOWN]: FaChevronDown,
  [ICONS.CHEVRON_LEFT]: FaChevronLeft,
  [ICONS.CHEVRON_RIGHT]: FaChevronRight,
  [ICONS.CHECK]: FaCheck,
  [ICONS.SYNC]: FaSyncAlt,
  [ICONS.IMAGE]: FaImage,
  [ICONS.SEND]: FaPaperPlane,
  [ICONS.EXTERNAL_LINK]: FaExternalLinkAlt,
  [ICONS.USERS]: FaUsers,
  [ICONS.SUN]: FaSun,
  [ICONS.MOON]: FaMoon,
  [ICONS.MEDAL]: FaMedal,
  [ICONS.COG]: FaCog,
  [ICONS.BOLT]: FaBolt,
  [ICONS.BUILDING]: FaBuilding,
  [ICONS.STAR]: FaStar,
  [ICONS.COMPASS]: FaCompass,

  [ICONS.HOME]: FaHome,
  [ICONS.WORK]: FaBriefcase,
  [ICONS.PROJECTS]: FaProjectDiagram,
  [ICONS.EDUCATION]: FaGraduationCap,
  [ICONS.CERTIFICATION]: FaCertificate,
  [ICONS.HONORS]: FaAward,
  [ICONS.VALUE]: FaChartLine,
  [ICONS.SKILLS]: FaCode,

  [ICONS.DOLLAR]: FaDollarSign,
  [ICONS.CLOCK]: FaClock,

  [ICONS.LINKEDIN]: FaLinkedin,
  [ICONS.GITHUB]: FaGithub,
  [ICONS.GLOBE]: FaGlobe,
  [ICONS.PHONE]: FaPhoneVolume,
  [ICONS.EMAIL]: FaEnvelopeCircleCheck,
};
