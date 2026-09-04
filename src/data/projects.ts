import type { ProjectItem, ProjectDetails } from "../types/data";

// Portfolio Projects Dataset (SSOT)
// Sourced from hands-on engineering implementations, venture products, and academic research.
export const projectData: ProjectItem[] = [
  // Interactive Portfolio Showcase
  {
    title: "Portfolio Showcase",
    imageUrl: "/assets/generated/projects/portfolio-showcase.webp",
    summary: [
      "Tech: React, Vite, Tailwind CSS",
      "Role: Sole Developer",
      "Focus: Interactive UI/UX & Neumorphic Design",
    ],
    details: {
      title: "Portfolio Showcase",
      challenge:
        "Static resumes cannot demonstrate interactive web applications, real-time calculation engines, or live data models.",
      action:
        "Built a responsive single-page web app with React, TypeScript, Vite, and Tailwind CSS. Added interactive telemetry dashboards, dynamic modal drilldowns, offline PWA caching, and theme tokens.",
      outcome:
        "Shipped an accessible portfolio on GitHub Pages hosting live code demos, verified financial ROI models, and engineering architecture records.",
      liveLink: "https://kxnghans.github.io/",
      codeLink: "https://github.com/kxnghans/kxnghans.github.io",
      highlights: [
        {
          label: "Tech Stack",
          value: "React, TypeScript, Tailwind CSS, Vite.",
        },
        {
          label: "Key Decisions",
          value:
            "Used React and Vite for fast builds and Tailwind CSS for custom dark mode styling.",
        },
        {
          label: "PWA & Offline",
          value:
            "Configured Workbox precaching and Service Worker for full offline availability.",
        },
      ],
    },
  },

  // CaroHans Event Rental Management System (ERMS)
  {
    title: "CaroHans Event Rentals (ERMS)",
    imageUrl: "/assets/generated/projects/carohans-hub.webp",
    summary: [
      "Venture: HansonCreations Studio",
      "Platform: Next.js, Supabase, Cloudflare Pages",
      "Domain: Event Rental Operations (Accra, Ghana)",
    ],
    details: {
      title: "CaroHans – Event Rental Management System (ERMS)",
      challenge:
        "Event rental operations in Accra, Ghana, were losing revenue to paper order slips, double-booked inventory, and missed return windows.",
      action:
        "Engineered an end-to-end rental management platform and warehouse operations dashboard using Next.js, Supabase, and Cloudflare Pages. Added real-time inventory locking, order state machines, and automated dispatch tracking.",
      outcome:
        "Eliminated double bookings across warehouse inventory, simplified booking intake, and automated equipment pickup and return inspections.",
      liveLink: "https://hansoncreations.com/apps/carohans",
      codeLink: "https://hansoncreations.com",
      highlights: [
        {
          label: "Operations Portal",
          value:
            "Built warehouse inventory control, account CRM, and real-time revenue reporting.",
        },
        {
          label: "Edge Architecture",
          value:
            "Deployed on Cloudflare Pages using OpenNext with Supabase PostgreSQL backend.",
        },
        {
          label: "Rental Lifecycle",
          value:
            "Automated order transitions from booking request through dispatch and return inspection.",
        },
      ],
    },
  },

  // MilCalc Mobile Military Calculator Suite
  {
    title: "MilCalc Mobile Suite",
    imageUrl: "/assets/generated/projects/milcalc-suite.webp",
    summary: [
      "Venture: HansonCreations Suite",
      "Stack: React Native, Expo, SQLite, MMKV",
      "Focus: DAFMAN 36-2905 & Military Pensions",
    ],
    details: {
      title: "MilCalc – Military Pension & Fitness Mobile Suite",
      challenge:
        "Service members and veterans had to juggle fragmented websites and spreadsheets to calculate Air Force fitness scores (DAFMAN 36-2905), drill pay, and High-3 vs. BRS retirement pensions.",
      action:
        "Built MilCalc in React Native and Expo, isolating pure calculation engines into dedicated packages (@repo/utils) with 100% test coverage. Paired MMKV caching with SQLite local storage for zero-crash offline execution in SCIFs.",
      outcome:
        "Shipped an offline utility app used by service members for instant physical fitness scoring, drill pay estimates, and long-term retirement forecasts.",
      liveLink: "https://hansoncreations.com/apps/milcalc",
      codeLink: "",
      highlights: [
        {
          label: "Domain Logic",
          value:
            "Codified official DAFMAN 36-2905 scoring tables and military pension models.",
        },
        {
          label: "Offline Architecture",
          value:
            "Configured MMKV and SQLite for sub-millisecond local calculations without network access.",
        },
        {
          label: "Pay & Pension Tools",
          value:
            "Calculates Active/Drill basic pay, BAH/BAS allowances, and BRS vs High-3 comparisons.",
        },
      ],
    },
  },

  // Gospel Games Faith-Based Mobile Game
  {
    title: "Gospel Games Platform",
    imageUrl: "/assets/generated/projects/gospel-games.webp",
    summary: [
      "Venture: HansonCreations Gaming",
      "Stack: React Native, Expo, Firebase RTDB",
      "Design: Claymorphism 3D & Deterministic Engine",
    ],
    details: {
      title: "Gospel Games – Faith-Based Multiplayer Party Game",
      challenge:
        "Youth groups and campus ministries needed modern, fast-paced trivia and charades party games built for both in-person gatherings and remote groups.",
      action:
        "Built a cross-platform mobile game using React Native, Expo, a custom Claymorphism 3D design system, and an isolated deterministic state engine. Connected game rooms in real time using Firebase Realtime Database.",
      outcome:
        "Delivered interactive party games with live room codes, instant matchmaking, and responsive multiplayer state sync.",
      liveLink: "https://hansoncreations.com/apps/gospelgames",
      codeLink: "",
      highlights: [
        {
          label: "Monorepo Setup",
          value:
            "Separated pure deterministic game rules from UI presentation layers.",
        },
        {
          label: "Design System",
          value:
            "Built custom Claymorphism 3D tactile UI components with sound and haptics.",
        },
        {
          label: "Real-Time Sync",
          value:
            "Synchronized multiplayer game state and player lobbies with Firebase RTDB.",
        },
      ],
    },
  },

  // Unpack Collaborative Travel Companion
  {
    title: "Unpack Travel Companion",
    imageUrl: "/assets/generated/projects/unpack-travel.webp",
    summary: [
      "Venture: HansonCreations Travel Tech",
      "Stack: React Native, Expo, SQLite, Supabase",
      "Focus: Collaborative Group Itineraries",
    ],
    details: {
      title: "Unpack – Collaborative Group Travel & Shared Itinerary App",
      challenge:
        "Coordinating group trips usually breaks down across scattered group chats, buried booking confirmation emails, and spotty cell service.",
      action:
        "Built an offline-first mobile app using React Native, Expo, SQLite local storage, and Supabase cloud sync. Added shared timelines, group expense splitting, and packing checklists that sync automatically when reconnected.",
      outcome:
        "Gave travel groups a single offline-capable dashboard for schedules, shared costs, and packing lists with zero cell service required.",
      liveLink: "https://hansoncreations.com/apps/unpack",
      codeLink: "",
      highlights: [
        {
          label: "Offline-First Sync",
          value:
            "Cached trip data in local SQLite for offline access on flights and remote destinations.",
        },
        {
          label: "Group Expense Ledger",
          value:
            "Built split-bill math and shared payment ledgers for group travel.",
        },
        {
          label: "Shared Itineraries",
          value:
            "Organized flight details, lodging reservations, and daily activities into visual timelines.",
        },
      ],
    },
  },

  // Fretwork AI Tablature & Pathfinding Research Capstone
  {
    title: "Fretwork Guitar Capstone",
    imageUrl: "/assets/generated/projects/fretwork-guitar.webp",
    summary: [
      "Venture: AI/ML Research Capstone",
      "Tech: PyTorch, TabTransformer, Viterbi",
      "Edge: Cloudflare Workers Runtime",
    ],
    details: {
      title: "Fretwork – AI-Powered Guitar Tablature & Dynamic Pathfinding",
      challenge:
        "Standard music transcription models output unplayable guitar tablature by ignoring human hand anatomy, finger strain, and physical fretboard shifts.",
      action:
        "Trained a PyTorch TabTransformer neural network paired with a proximate Viterbi dynamic programming pathfinder (prox_viterbi_transformer) for my UC Berkeley capstone. Deployed the containerized inference microservice via FastAPI on AWS ECS Fargate.",
      outcome:
        "Produced biomechanically ergonomic tablature verified on GuitarSet benchmarks with sub-second inference.",
      liveLink: "https://guitar-capstone.kobbyhanson.workers.dev/",
      codeLink: "",
      highlights: [
        {
          label: "Machine Learning",
          value:
            "Trained PyTorch TabTransformer models on structured musical guitar datasets.",
        },
        {
          label: "Pathfinding Algorithm",
          value:
            "Applied proximate Viterbi dynamic programming to minimize awkward hand shifts and physical strain.",
        },
        {
          label: "Edge Inference",
          value:
            "Served model inference with low latency on Cloudflare Workers edge runtime.",
        },
      ],
    },
  },

  // HansOnDeck LLC Creative Media
  {
    title: "Creative Media Business",
    imageUrl: "/assets/generated/projects/creative-media.webp",
    summary: [
      "Venture: HansOnDeck LLC",
      "Revenue: $10K in first year",
      "Skills: Business Operations, Project Management",
    ],
    details: {
      title: "HansOnDeck LLC Launch & Management",
      challenge:
        "After returning from deployment, I wanted to build a media production business to handle commercial video shoots, sports photography, and local business marketing.",
      action:
        "Founded HansOnDeck LLC, managing production schedules, on-location video/photo shoots, studio lighting, audio engineering, and corporate bookkeeping across athletics, real estate, and community events.",
      outcome:
        "Generated $10,000 in first-year revenue, saved $3,000 through business deductions, and built long-term production partnerships with founders, athletes, and creative directors.",
      liveLink: "https://hansondeck.com/",
      codeLink: "",
      highlights: [
        {
          label: "Entrepreneurship",
          value: "Founded and operated a profitable media LLC.",
        },
        {
          label: "Financial Acumen",
          value: "Reached $10,000 in first-year revenue.",
        },
        {
          label: "Networking",
          value:
            "Delivered media productions for local athletic programs, real estate firms, and community events.",
        },
      ],
    },
  },

  // Enterprise Facilities Automation
  {
    title: "Facilities Automation",
    imageUrl: "/assets/generated/projects/facilities-automation.webp",
    summary: [
      "ROI: $55.2k/mo ($662k/yr)",
      "Scale: 450 Commercial Sites",
      "Quality: Audit Errors Cut to 0%",
    ],
    details: {
      title: "Facilities Management Automation",
      challenge:
        "Tracking secure access keys and lock combinations across 450 regional facility locations using legacy spreadsheets caused a 7.5% audit error rate and 2,760 hours of annual manual BA reconciliation.",
      action:
        "Built a centralized Power Platform portal with automated escalation flows and a relational SQL backend during an enterprise stretch assignment. Upgraded pipelines to REST API 2.0 with Row-Level Security, dropping refresh times from 3 hours to under 10 minutes.",
      outcome:
        "Achieved a 0.0% audit error rate across 450 regional facilities, delivered $55,200/month ($662,400 annualized) in verified savings, and passed two consecutive audit cycles with zero findings.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Annualized Savings",
          value:
            "Delivered $55,200/month ($662k annualized) in recurring operational savings.",
        },
        {
          label: "Scale",
          value: "Rolled out across 450 regional facility locations.",
        },
        {
          label: "Audit Quality",
          value:
            "Cut audit defect rate from 7.5% to 0% with automated input validation.",
        },
      ],
    },
  },

  // Enterprise Innovation Gamification Dashboard
  {
    title: "Innovation Dashboard",
    imageUrl: "/assets/generated/projects/innovation-dashboard.webp",
    summary: [
      "ROI: $1.1M First-Year Savings",
      "Engagement: 19,000+ Employee Ideas",
      "Impact: 705k+ Customer Hours Saved",
    ],
    details: {
      title: "Innovation Gamification Dashboard",
      challenge:
        "Over 19,000 employee innovation ideas were sitting in disconnected spreadsheets, leaving leadership without clear ROI tracking or prioritization metrics.",
      action:
        "Built an interactive Power BI gamification portal with automated SharePoint ingestion and DAX financial modeling during an enterprise stretch assignment.",
      outcome:
        "Increased employee submission participation by 13% and gave executives clear ROI tracking, validating $1.1M in first-year operational savings and 705,000+ customer hours saved.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/Idea%20Board%20Explained.pdf",
      codeLink: "",
      highlights: [
        {
          label: "First-Year Savings",
          value: "Validated $1.1 million in first-year cost reductions.",
        },
        {
          label: "Reporting",
          value: "Tracked savings and KPIs in Power BI.",
        },
        {
          label: "Participation",
          value: "Increased team engagement by 13% across 19,000+ ideas.",
        },
      ],
    },
  },

  // Lockheed Martin Space Cloud Migration & SNO Testbed
  {
    title: "Cloud Migration",
    imageUrl: "/assets/generated/projects/cloud-migration.webp",
    summary: [
      "Velocity: 10x Test Cycle Reduction",
      "Governance: ARB / CARB / SIA Approved",
      "Overhead: $10k+ Saved via SNO",
    ],
    details: {
      title: "Cloud Migration & Infrastructure Optimization",
      challenge:
        "Unstable bare-metal test servers caused frequent test run aborts, 10-hour nightly build bottlenecks, and security review delays across disconnected program environments.",
      action:
        "Architected Single Node OpenShift (SNO) clusters in the Galaxy Test Bed (GTB) and authored the formal CONOPS, securing approvals across the Architecture Review Board (ARB), Security & Information Assurance (SIA), and Classified Review (CARB).",
      outcome:
        "Cut nightly automated test cycles from 10 hours down to 1 hour (a 10x speedup) and saved over $10,000 in test infrastructure costs.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Time Savings",
          value: "Reduced build times by 90% (from 10 hours down to 1 hour).",
        },
        {
          label: "Governance",
          value:
            "Secured formal ARB, SIA, and Classified Review (CARB) approvals.",
        },
        {
          label: "Tech Stack",
          value:
            "Stabilized infrastructure using AWS, Azure, and OpenShift SNO.",
        },
      ],
    },
  },

  // MESHc Defense Catalog Product Adoption
  {
    title: "Product Adoption Strategy",
    imageUrl: "/assets/generated/projects/product-adoption.webp",
    summary: [
      "Adoption: 800% Usage Expansion",
      "Funding: $1.0M Follow-On Secured",
      "Leadership: Stakeholder UX Mediation",
    ],
    details: {
      title: "Product Adoption Strategy (MESHc Space EBOM)",
      challenge:
        "The MESHc (Master Software & Hardware Catalog) space logistics platform managed Engineering Bills of Materials (EBOM) and technical requirements. It struggled with adoption because RF engineers needed deep parametric specs while business leads wanted high-level summaries.",
      action:
        "Ran bi-weekly Adobe XD prototyping sessions to mediate conflicting technical requirements between engineering and business leads, designing a tiered catalog interface with instant drill-downs into low-level RF specs and WBS structures.",
      outcome:
        "Grew active program adoption from 2 to 10 defense programs (800% increase), cut 1 month of UI backlog rework, and helped secure $1.0M in follow-on program funding.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Adoption Growth",
          value: "Increased tool adoption by 800% across 10 defense programs.",
        },
        {
          label: "Program Funding",
          value: "Helped secure $1.0 million in follow-on program funding.",
        },
        {
          label: "Mediation",
          value: "Resolved requirements standoff using Adobe XD prototypes.",
        },
      ],
    },
  },

  // Operation Allies Refuge Logistics Data Pipeline
  {
    title: "Logistics Data Pipeline",
    imageUrl: "/assets/generated/projects/logistics-pipeline.webp",
    summary: [
      "Throughput: 66% Efficiency Boost",
      "Crisis: Operation Allies Refuge",
      "Quality: Errors Cut from 20% to <5%",
    ],
    details: {
      title: "Logistics & Data Pipeline for Qatar Deployment",
      challenge:
        "During Afghan evacuation operations in Qatar (Operation Allies Refuge), tracking high-turnover medical supplies and rations manually created stockout risks and a 20% re-issue error rate.",
      action:
        "Built automated Microsoft Power Query ETL pipelines in Excel to model shelf-life expiration, forecast burn rates, and automate nightly manifest reconciliation.",
      outcome:
        "Cut nightly inventory reconciliation from 3 hours down to 5 minutes, boosted daily supply throughput by 66%, and reduced supply errors from 20% to under 5%.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Throughput",
          value: "Boosted supply throughput by 66% during crisis operations.",
        },
        {
          label: "Automation",
          value: "Automated inventory tracking in Power Query.",
        },
        {
          label: "Error Reduction",
          value: "Reduced supply errors from 20% to under 5%.",
        },
      ],
    },
  },

  // COVID-19 Operational Contingency Planning
  {
    title: "COVID-19 Contingency Plan",
    imageUrl: "/assets/generated/projects/covid-contingency.webp",
    summary: [
      "Performance: 91% mission capable rate",
      "Skills: Contingency Planning, Data Analysis",
      "Safety: Zero team outbreaks",
    ],
    details: {
      title: "COVID-19 Contingency & Operations Plan",
      challenge:
        "Strict pandemic health restrictions threatened to disrupt round-the-clock shift coverage and operational readiness for on-site military and contractor personnel.",
      action:
        "Built a workload forecasting model in Excel using historical shift trends and regression analysis, structuring split-crew rosters and standardized digital handoff protocols.",
      outcome:
        "Maintained a 91% mission-capable rate (7% above baseline) and prevented operational stoppages with zero workplace outbreaks.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Operational Excellence",
          value: "Maintained a 91% mission-capable rate (7% above baseline).",
        },
        {
          label: "Analytical Skills",
          value: "Used regression analysis to forecast staffing needs.",
        },
        {
          label: "Health & Safety",
          value: "Prevented staffing disruptions with split-shift planning.",
        },
      ],
    },
  },

  // Youth Coding Mentorship & App Launch
  {
    title: "Youth Mentorship & App Creation",
    imageUrl: "/assets/generated/projects/youth-mentorship.webp",
    summary: [
      "Role: Founder & Lead Mentor",
      "Outcome: Launched a community app",
      "Skills: Leadership, Networking",
    ],
    details: {
      title: "Youth Mentorship & App Development Bootcamp",
      challenge:
        "College students and aspiring developers often struggle to transition from introductory coding classes to building real production apps.",
      action:
        "Founded an 8-week summer coding bootcamp, mentoring 15+ students through building a production React Native mobile app with Git collaboration and guest talks from engineers at Google, Deloitte, and Booz Allen Hamilton.",
      outcome:
        "Graduated 15+ young adults into tech internships and STEM degree programs, shipping a live community mobile app.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Leadership",
          value: "Organized and taught a practical mobile bootcamp.",
        },
        {
          label: "Community Impact",
          value: "Guided students through building a production mobile app.",
        },
        {
          label: "Networking",
          value:
            "Connected students with industry mentors across enterprise engineering and tech.",
        },
      ],
    },
  },

  // Multivariate LSTM Stock & Economic Time-Series Forecaster
  {
    title: "Stock Prediction",
    imageUrl: "/assets/generated/projects/stock-prediction.webp",
    summary: [
      "Project: Stock Prediction Tool",
      "Tech: RNN, LSTM, Stable Diffusion",
      "Focus: Multivariate Forecasting",
    ],
    details: {
      title: "Stock Prediction Tool & AI Image Generation",
      challenge:
        "Standard linear forecasting models like ARIMA struggle to capture non-linear relationships across financial time series without overfitting historical noise.",
      action:
        "Trained a PyTorch LSTM recurrent neural network using strict chronological train/test splits, rolling-window normalization, and early stopping.",
      outcome:
        "Achieved an R-squared score of 0.952 on validation sets, beating standard ARIMA baselines by 28% in mean squared error.",
      liveLink: "",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/Stock_prediction_multivariate.html",
      highlights: [
        {
          label: "Predictive Modeling",
          value:
            "Trained an LSTM network for multivariate time-series forecasting.",
        },
        {
          label: "Data Integrity",
          value:
            "Used chronological train/test splits to prevent data leakage.",
        },
        {
          label: "AI Applications",
          value:
            "Configured local Stable Diffusion models for image generation.",
        },
      ],
    },
  },

  // Computer Vision & Neural Network Implementation
  {
    title: "Computer Vision",
    imageUrl: "/assets/generated/projects/computer-vision.webp",
    summary: [
      "Focus: Neural Networks",
      "Application: Facial Recognition & Classification",
      "Skills: Python, Keras, TensorFlow",
    ],
    details: {
      title: "Computer Vision – Neural Network Implementation",
      challenge:
        "Off-the-shelf vision packages often hide algorithmic internals, making it hard to debug low-level convolution, edge detection, and noise filtering issues.",
      action:
        "Built an AlexNet-based classification model with batch normalization and dropout in Python and TensorFlow, implementing Sobel edge filters, median noise reduction, and logistic regression from mathematical fundamentals.",
      outcome:
        "Accurately classified facial datasets and verified custom filter math against OpenCV baselines.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/Facial%20Recognition%20Showcase.pdf",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/Computer%20Vision.zip",
      highlights: [
        {
          label: "Deep Learning",
          value: "Trained custom CNN and AlexNet architectures.",
        },
        {
          label: "Model Optimization",
          value:
            "Applied k-fold cross-validation, batch normalization, and dropout.",
        },
        {
          label: "Fundamental Implementation",
          value:
            "Implemented low-level filtering and classification in Python, TensorFlow, and OpenCV.",
        },
      ],
    },
  },

  // Autonomous Robotics & Sensor Integration
  {
    title: "Autonomous Robotics",
    imageUrl: "/assets/generated/projects/autonomous-robotics.webp",
    summary: [
      "Project: Autonomous RC Car",
      "Tech: Arduino, C, GPS, Sonar",
      "Role: Project Lead",
    ],
    details: {
      title: "Robotics - Autonomous RC Car",
      challenge:
        "Navigating an RC vehicle outdoors requires real-time sensor fusion and obstacle avoidance on constrained microcontroller hardware.",
      action:
        "Programmed an Arduino in C to interface with GPS modules, digital compasses, and ultrasonic rangefinders, implementing real-time waypoint navigation and obstacle avoidance.",
      outcome:
        "Delivered a reliable autonomous rover that navigated outdoor waypoints and steered around obstacles in its path.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/RC%20Car%20Demo.MOV",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/RC%20Car%20-%20Robotics%20Showcase.zip",
      highlights: [
        {
          label: "Hardware Implementation",
          value: "Integrated GPS, compass, and sonar sensors on Arduino.",
        },
        {
          label: "Software Development",
          value: "Wrote waypoint navigation and obstacle avoidance in C.",
        },
        {
          label: "Leadership",
          value: "Led project scheduling, component selection, and testing.",
        },
      ],
    },
  },

  // Immersive Flight Simulator for WWII Aviation Museum
  {
    title: "Immersive Flight Sim",
    imageUrl: "/assets/generated/projects/flight-simulator.webp",
    summary: [
      "Partner: National Museum of WWII Aviation",
      "Tech: Unreal Engine, C#, Raspberry Pi",
      "Focus: Hardware/Software Integration",
    ],
    details: {
      title: "Flight Simulator for National Museum of WWII Aviation",
      challenge:
        "The National Museum of WWII Aviation needed an interactive B-17 waist-gunner simulator exhibit combining authentic physical replica hardware with real-time 3D flight physics.",
      action:
        "Built the 3D aerial combat simulation in Unreal Engine and wired a physical replica .50-caliber machine gun to an Arduino and Raspberry Pi for real-time trigger tracking and pneumatic recoil.",
      outcome:
        "Delivered a synchronized hardware-software exhibit featuring responsive ballistics and tactile feedback for museum visitors.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/UE4%20Demo.mp4",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/50cal%20Simulator.zip",
      highlights: [
        {
          label: "Game Development",
          value: "Built flight and targeting mechanics in Unreal Engine.",
        },
        {
          label: "Hardware Integration",
          value:
            "Connected Raspberry Pi and Arduino for physical trigger input and recoil.",
        },
        {
          label: "Exhibit Engineering",
          value:
            "Built custom interactive software for a national aviation museum exhibit.",
        },
      ],
    },
  },

  // CMOS Two-Stage Operational Amplifier Design
  {
    title: "Circuit Design",
    imageUrl: "/assets/generated/projects/circuit-design.webp",
    summary: [
      "Focus: CMOS Op-Amp Design",
      "Tools: AutoCAD, LTSpice, MATLAB",
      "Skills: Soldering, Debugging, C",
    ],
    details: {
      title: "Electronics – Circuit Design and Implementation",
      challenge:
        "Designing a two-stage CMOS operational amplifier on a 0.25-micron process required meeting strict gain targets (2,500 V/V) while maintaining phase margin and power limits.",
      action:
        "Simulated the op-amp stages in LTspice, calculating transconductance, pole locations, and output resistance, and verified biasing on hardware test benches.",
      outcome:
        "Achieved 2,007 V/V in simulation, mapped frequency response limits, and identified compensation trade-offs.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/PCB%20Design.pdf",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/PCB%20Design.zip",
      highlights: [
        {
          label: "Hardware Design",
          value:
            "Designed and simulated a two-stage CMOS operational amplifier.",
        },
        {
          label: "Simulation & Analysis",
          value: "Modeled gain, power consumption, PSRR, and CMRR in LTspice.",
        },
        {
          label: "Low-Level Programming",
          value:
            "Wrote test bench scripts in C and Verilog for digital control logic.",
        },
      ],
    },
  },
];

// In-memory O(1) project lookup index mapping normalized keywords to ProjectDetails
export const projectLookupMap = new Map<string, ProjectDetails>();

projectData.forEach((project) => {
  const normTitle = project.title.toLowerCase();
  projectLookupMap.set(normTitle, project.details);
  // Index primary venture and technology keywords for fast cross-modal linking
  const keyTokens = normTitle.split(/[\s–—\-()]+/).filter(Boolean);
  keyTokens.forEach((token) => {
    if (token.length >= 4 && !projectLookupMap.has(token)) {
      projectLookupMap.set(token, project.details);
    }
  });
});

/**
 * Resolves a ProjectDetails reference from a label using O(1) map lookup
 * with keyword fallback for cross-modal linking.
 */
export const findProjectByLabel = (
  label: string,
): ProjectDetails | undefined => {
  const normalized = label.toLowerCase().trim();
  const directMatch = projectLookupMap.get(normalized);
  if (directMatch) return directMatch;

  for (const [key, details] of projectLookupMap.entries()) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return details;
    }
  }
  return undefined;
};
