import type { CommunityItem } from "../types/data";
import { ASSET_URLS } from "./assets";

// Community & Leadership Dataset (SSOT)
// Volunteer leadership, academic mentorship, and community service.
export const communityData: CommunityItem[] = [
  // Photography & Media Venture & Open Heavens Church Media Lead
  {
    title: "Photography & Media",
    imageUrl: ASSET_URLS.COMMUNITY.PHOTOGRAPHY_MEDIA,
    summary: ["Venture: HansOnDeck LLC", "Role: Open Heavens Media Team Lead"],
    details: {
      title: "HansOnDeck LLC & Open Heavens Media Lead",
      details: [
        "Lead the volunteer media team at Open Heavens alongside running commercial shoots for HansOnDeck LLC.",
        "Direct multi-camera photo, video, and livestream broadcast production for weekly worship services, holiday celebrations, regional conferences, and community outreach.",
        "Manage weekly media production workflows, digital soundboards, livestream hardware/software, volunteer crew training, and social media distribution.",
      ],
    },
  },

  // NSBE Chapter Vice President
  {
    title: "Vice President of NSBE Chapter",
    imageUrl: ASSET_URLS.COMMUNITY.NSBE_CHAPTER,
    summary: [
      "Role: Vice President",
      "Achievement: All members secured offers",
    ],
    details: {
      title: "Vice President of National Society of Black Engineers Chapter",
      details: [
        "Ran weekly professional workshops, peer resume reviews, and mock coding interviews for engineering undergraduates.",
        "Connected student members with industry engineers through speaker panels and company recruiting visits.",
        "Led our chapter delegation to the national conference in San Francisco, where all 6 attending members secured engineering job offers.",
      ],
    },
  },

  // Readers and Writers Club President
  {
    title: "President of the Readers and Writers Club",
    imageUrl: ASSET_URLS.COMMUNITY.READERS_WRITERS,
    summary: ["Role: President", "Achievement: Tripled Club Membership"],
    details: {
      title: "President of the Readers and Writers Club",
      details: [
        "Coordinated weekly club meetings and organized campus spelling bees and annual student debates.",
        "Tripled active club membership through campus outreach and student community events.",
      ],
    },
  },

  // Lockheed Martin Code Quest Proctor
  {
    title: "Code Quest",
    imageUrl: ASSET_URLS.COMMUNITY.CODE_QUEST,
    summary: [
      "Event: Lockheed Martin Code Quest",
      "Role: Technical Proctor",
      "Locations: 20 locations, 4 continents",
    ],
    details: {
      title: "Code Quest",
      details: [
        "Served as a technical proctor for the Lockheed Martin Code Quest programming competition across 20 global sites.",
        "Judged and assisted high school teams solving algorithmic problems in Java, Python, C#, and C++.",
        "Managed computer lab setup and technical support at the Denver site to ensure smooth competition flow.",
      ],
    },
  },

  // Vegas Strong Thunderbird Airshow
  {
    title: "Vegas Strong Thunderbird Airshow",
    imageUrl: ASSET_URLS.COMMUNITY.THUNDERBIRD_AIRSHOW,
    summary: ["Event: Vegas Strong Airshow", "Role: Community Engagement"],
    details: {
      title: "Vegas Strong Thunderbird Airshow",
      details: [
        "Supported ground operations for the Air Force Thunderbirds home airshow with tens of thousands of attendees.",
        'Assisted operations during the "Vegas Strong" tribute year, honoring first responders and community members.',
        "Guided visitor tours around aircraft equipment and answered questions about flight line operations.",
        "Supported safety coordination and flight line logistics throughout the weekend.",
      ],
    },
  },
];
