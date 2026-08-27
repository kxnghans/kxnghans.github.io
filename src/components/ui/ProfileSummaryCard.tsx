import { Icon, ICONS } from "../icons";
import { UI_SURFACES } from "../../theme";
import LazyImage from "./LazyImage";

const profileImage = "/assets/Kobs DP.webp";
const profileImageFallback = "/assets/Kobs DP.png";

const ProfileSummaryCard = () => (
  <div className={`${UI_SURFACES.section} p-4 sm:p-6`}>
    <div className="flex flex-col items-center sm:flex-row">
      <LazyImage
        src={profileImage}
        fallbackSrc={profileImageFallback}
        alt="Kobby Hanson"
        loading="eager"
        fetchPriority="high"
        className="h-24 w-24 rounded-full border-4 border-red-600 object-cover shadow-lg sm:h-32 sm:w-32"
        containerClassName="mb-4 h-24 w-24 rounded-full sm:mr-6 sm:mb-0 sm:h-32 sm:w-32 flex-shrink-0"
      />
      <div className="text-center sm:text-left">
        <h1 className="flex items-center justify-center text-2xl font-bold text-gray-900 sm:justify-start sm:text-4xl dark:text-gray-200">
          Kobby Hanson
          <a
            href="https://www.linkedin.com/in/kobbyhanson"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-icon-link ml-3 text-gray-400 hover:text-gray-500"
            aria-label="Kobby Hanson LinkedIn Profile"
          >
            <Icon name={ICONS.LINKEDIN} size={30} className="linkedin-icon" />
          </a>
        </h1>
        <p className="text-md text-gray-500 sm:text-lg dark:text-gray-400">
          Technical Program Manager & Systems Leader
        </p>
        <p className="text-md text-red-600 sm:text-lg dark:text-red-400">
          <a
            href="https://hansondeck.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Founder & Software Studio Lead
          </a>
        </p>
        <div className="mt-2 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
          <p>M.S. in Data Science - UC Berkeley (4.0 GPA)</p>
          <p>B.S. in Electrical Engineering - UCCS</p>
          <p>Active Secret Security Clearance</p>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileSummaryCard;
