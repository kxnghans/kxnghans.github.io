import type { ProjectItem } from "../types/data";

export const projectData: ProjectItem[] = [
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
        "A static resume did not effectively show interactive apps, real metrics, and full-stack projects.",
      action:
        "Built a responsive single-page web app with React, TypeScript, Vite, and Tailwind CSS. Added interactive modals, carousels, voice search, offline PWA caching, and dark mode.",
      outcome:
        "Shipped a fast, accessible portfolio hosted on GitHub Pages that displays work history, ventures, and code demos in one place.",
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
        "Managing event rental equipment in Accra, Ghana, relied on manual order logs, missing return dates, and disconnected inventory counts.",
      action:
        "Built a full rental management system with a client booking portal and an admin warehouse dashboard using Next.js, Supabase, and Cloudflare Pages. Implemented live stock checks, order dispatch lifecycles, and automated return tracking.",
      outcome:
        "Cut booking turnaround time, prevented double bookings across warehouse inventory, and automated pickup and return schedules.",
      liveLink: "https://hansoncreations.com/apps/carohans",
      codeLink: "https://hansoncreations.com",
      highlights: [
        {
          label: "Operations Portal",
          value:
            "Built warehouse inventory control, client CRM, and real-time revenue reporting.",
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
        "Military personnel and veterans lacked a single centralized, offline solution for calculating Air Force fitness scores (DAFMAN 36-2905), drill pay, and High-3 vs. Blended Retirement System (BRS) pension comparisons, having to navigate fragmented websites and disconnected spreadsheets.",
      action:
        "Built MilCalc using React Native, Expo, MMKV, and SQLite for instant offline calculations. Programmed official Air Force physical fitness scoring tables (including altitude adjustments and waist-to-height ratio) alongside BRS, High-3, and military pay calculators.",
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
        "Youth groups and campus ministries lacked modern, fast-paced party games designed for in-person and remote group gatherings.",
      action:
        "Built a cross-platform mobile game using React Native, Expo, a custom Claymorphism 3D design system, and an isolated deterministic state engine. Connected game rooms in real time using Firebase Realtime Database.",
      outcome:
        "Delivered interactive party games with live room codes, quick player matchmaking, and responsive multiplayer state sync.",
      liveLink: "https://hansoncreations.com/apps/gospelgames",
      codeLink: "",
      highlights: [
        {
          label: "Monorepo Setup",
          value:
            "Separated pure game rules and state transitions from UI components and mobile client.",
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
        "Group travel planning gets messy across text threads, lost booking PDFs, and lost cell reception during flights and remote trips.",
      action:
        "Built an offline-first mobile app using React Native, Expo, SQLite local storage, and Supabase cloud sync. Added shared timelines, group expense splitting, and packing checklists that sync when back online.",
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
        "Transcribing audio and chords into playable guitar tabs is difficult because guitar fretboards offer multiple ways to play the same note, and simple rule sets ignore hand stretch limits and fretboard ergonomics.",
      action:
        "Trained a PyTorch TabTransformer neural network paired with a proximate Viterbi dynamic programming pathfinder for my UC Berkeley capstone. Deployed the inference pipeline to Cloudflare Workers for edge execution.",
      outcome:
        "Generated natural, playable tablature fingerings in real time with sub-100ms inference on the edge.",
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
  {
    title: "Creative Media Business",
    imageUrl: "/assets/generated/projects/creative-media.webp",
    summary: [
      "Venture: Photography LLC",
      "Revenue: $10K in first year",
      "Skills: Business Operations, Project Management",
    ],
    details: {
      title: "Photography Business Launch & Management",
      challenge:
        "After returning from deployment and relocating to a new city, I needed to establish a local network and build a creative outlet outside of work.",
      action:
        "Founded a photography LLC, handling client bookings, shoots, equipment, and accounting. Sourced clients through church groups, real estate networks, and community athletics.",
      outcome:
        "Hit $10,000 in first-year revenue, saved $3,000 through business deductions, and built connections with local founders, athletes, and community leaders.",
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
          value: "Expanded client base across real estate, athletics, and weddings.",
        },
      ],
    },
  },
  {
    title: "Facilities Automation",
    imageUrl: "/assets/generated/projects/facilities-automation.webp",
    summary: [
      "Savings: $55k+ saved monthly",
      "Tools: Microsoft Power Platform",
      "Accuracy: Error rate reduced to 0%",
    ],
    details: {
      title: "Facilities Management Automation",
      challenge:
        "The facilities team tracked key and vault combinations in spreadsheets across 450 locations, resulting in a 7.5% audit error rate.",
      action:
        "Built an automated workflow using Power Apps, Power Automate, and Power BI. Documented standard operating procedures and trained team members on the new tools.",
      outcome:
        "Reduced the audit error rate from 7.5% to 0% with direct validation. Saved 2,760 hours of monthly manual reconciliation, producing $55,200 in monthly cost savings.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Financial Impact",
          value: "Generated $55,200 in monthly operational savings.",
        },
        {
          label: "Process Improvement",
          value: "Cut audit errors from 7.5% to 0%.",
        },
        {
          label: "Tools Used",
          value:
            "Built end-to-end automation with Microsoft Power Platform.",
        },
      ],
    },
  },
  {
    title: "Innovation Dashboard",
    imageUrl: "/assets/generated/projects/innovation-dashboard.webp",
    summary: [
      "Savings: $1.1M saved in first year",
      "Tools: Power BI",
      "Engagement: 13% increase in participation",
    ],
    details: {
      title: "Innovation Gamification Dashboard",
      challenge:
        "Idea submission rates were low, and tracking individual process improvements across spreadsheets was inefficient.",
      action:
        "Created a Power BI dashboard to track submitted ideas, cost savings, and implementations. Added an employee leaderboard to boost team participation.",
      outcome:
        "Increased participation by 13% over legacy spreadsheets. The dashboard gave leadership direct visibility into team contributions, helping save $1.1 million and over 705,000 customer hours in year one.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/Idea%20Board%20Explained.pdf",
      codeLink: "",
      highlights: [
        {
          label: "Financial Impact",
          value: "Saved $1.1 million in the first year.",
        },
        {
          label: "Data Visualization",
          value: "Tracked savings and KPIs in Power BI.",
        },
        {
          label: "Team Engagement",
          value: "Increased team participation by 13%.",
        },
      ],
    },
  },
  {
    title: "Cloud Migration",
    imageUrl: "/assets/generated/projects/cloud-migration.webp",
    summary: [
      "Time: Overnight builds in 1 hour",
      "Cost: Over $10k saved",
      "Tech: AWS, Azure, OpenShift, Kubernetes",
    ],
    details: {
      title: "Cloud Migration & Infrastructure Optimization",
      challenge:
        "Unstable legacy hardware and bare-metal test clusters caused frequent outages and slow build cycles.",
      action:
        "Wrote a Cloud Concept of Operations (CONOPS) for a dedicated testbed across AWS, Azure, and OpenShift. Set up single-node OpenShift clusters for faster local testing and recovery.",
      outcome:
        "Cut nightly build times from 10 hours down to 1 hour, freeing up business hours for active debugging. Saved over $10,000 by applying existing enterprise licenses.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Time Savings",
          value:
            "Reduced build times by 90% (from 10 hours to 1 hour).",
        },
        {
          label: "Budget Savings",
          value:
            "Saved over $10,000 using existing enterprise licenses.",
        },
        {
          label: "Technical Stack",
          value:
            "Stabilized infrastructure using AWS, Azure, and OpenShift.",
        },
      ],
    },
  },
  {
    title: "Product Adoption Strategy",
    imageUrl: "/assets/generated/projects/product-adoption.webp",
    summary: [
      "Adoption: 800% usage increase",
      "Funding: Secured additional $1M",
      "Skills: UI/UX, Stakeholder Management",
    ],
    details: {
      title: "Product Adoption Strategy (MESHc Program)",
      challenge:
        "The MESHc tool had low adoption because engineering and business teams had conflicting needs: engineers wanted raw technical specs, while business teams needed summary roll-ups.",
      action:
        "Ran bi-weekly Adobe XD wireframing sessions with both teams. Designed a clean summary view with drill-down links to raw technical specs.",
      outcome:
        "Increased active usage by 800%, cut a month from the UI backlog, and helped secure an additional $1 million in follow-on program funding.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "User Adoption",
          value: "Increased tool adoption by 800%.",
        },
        {
          label: "Financial Success",
          value:
            "Helped secure $1 million in follow-on funding.",
        },
        {
          label: "Core Competencies",
          value:
            "Resolved cross-team requirements using Adobe XD prototypes.",
        },
      ],
    },
  },
  {
    title: "Logistics Data Pipeline",
    imageUrl: "/assets/generated/projects/logistics-pipeline.webp",
    summary: [
      "Productivity: 66% increase in efficiency",
      "Tools: Power Query, Excel",
      "Accuracy: Error rate below 5%",
    ],
    details: {
      title: "Logistics & Data Pipeline for Qatar Deployment",
      challenge:
        "During a deployment in Qatar supporting Afghan evacuation operations, our team faced high operational tempo and manual inventory tracking for perishable items.",
      action:
        "Built a Power Query pipeline in Excel that automatically flagged expiring items and alerted supply teams for reordering.",
      outcome:
        "Cut nightly supply reconciliation from hours to minutes, boosting team efficiency by 66%. Dropped the re-issuing error rate for medical supplies and rations from 20% down to under 5%.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Efficiency Gains",
          value: "Boosted supply throughput by 66%.",
        },
        {
          label: "Data Automation",
          value: "Automated inventory pipelines in Power Query.",
        },
        {
          label: "Quality Control",
          value: "Reduced supply error rate from 20% to under 5%.",
        },
      ],
    },
  },
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
        "During pandemic restrictions, our team needed a reliable plan to maintain shift coverage, track KPIs, and manage remote operations.",
      action:
        "Built a contingency plan using historical workload trends and regression models. Mapped team locations and shift metrics, and established standard operating procedures for distributed handoffs.",
      outcome:
        "Maintained a 91% mission-capable rate (7% above baseline) and prevented shift disruptions with zero workplace outbreaks.",
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
        "Young adults in my church community often lacked technical mentorship, portfolio experience, and industry connections after graduation.",
      action:
        "Organized and funded a summer development bootcamp with weekly mentoring, code reviews, and office hours. Brought in guest speakers from Google, Deloitte, Booz Allen Hamilton, and JPMorgan to share industry insights.",
      outcome:
        "Students built and launched a live church mobile app featuring community announcements, donation tracking, and tax receipt generation. Several participants landed their first technical internships.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Leadership",
          value: "Organized and led a practical software bootcamp.",
        },
        {
          label: "Community Impact",
          value: "Guided students in building a full mobile app.",
        },
        {
          label: "Networking",
          value:
            "Connected students with mentors across tech and consulting.",
        },
      ],
    },
  },
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
        "Forecast stock prices accurately by incorporating multiple economic indicators into time-series models.",
      action:
        "Trained an LSTM recurrent neural network using chronological data splits, feature normalization, and early stopping to avoid overfitting.",
      outcome:
        "Reached an R-squared score of 0.952 on validation sets and configured local Stable Diffusion pipelines for generative image tests.",
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
        "Training image classifiers and facial recognition pipelines from scratch requires tuning deep convolutional networks while avoiding overfitting on limited hardware.",
      action:
        "Built an AlexNet-based classification model with batch normalization and dropout in Python and TensorFlow. Implemented Sobel edge filters, median noise reduction, and logistic regression with k-fold cross-validation without high-level image libraries.",
      outcome:
        "Accurately classified facial datasets, tuned custom CNNs for Fashion-MNIST benchmarks under strict parameter budgets, and validated custom filter mathematics against OpenCV baselines.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/Facial%20Recognition%20Showcase.pdf",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/Computer%20Vision.zip",
      highlights: [
        {
          label: "Deep Learning",
          value:
            "Trained custom CNN and AlexNet architectures.",
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
        "Build an autonomous RC vehicle capable of obstacle avoidance and GPS waypoint navigation.",
      action:
        "Programmed an Arduino in C with GPS, digital compass, and ultrasonic distance sensors. Led the hardware integration and sensor calibration.",
      outcome:
        "Built a vehicle that navigated waypoints accurately, avoided real-time obstacles, and executed search patterns at the destination.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/RC%20Car%20Demo.MOV",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/RC%20Car%20-%20Robotics%20Showcase.zip",
      highlights: [
        {
          label: "Hardware Implementation",
          value:
            "Integrated GPS, compass, and sonar sensors on Arduino.",
        },
        {
          label: "Software Development",
          value:
            "Wrote waypoint navigation and obstacle avoidance in C.",
        },
        {
          label: "Leadership",
          value: "Led project scheduling, component selection, and testing.",
        },
      ],
    },
  },
  {
    title: "Immersive Flight Sim",
    imageUrl: "/assets/generated/projects/flight-simulator.webp",
    summary: [
      "Client: National Museum of WWII Aviation",
      "Tech: Unreal Engine, C#, Raspberry Pi",
      "Focus: Hardware/Software Integration",
    ],
    details: {
      title: "Flight Simulator for National Museum of WWII Aviation",
      challenge:
        "Build an interactive B-17 side-gunner flight simulator for a permanent museum exhibit.",
      action:
        "Built the simulation environment in Unreal Engine and wired a physical replica .50-caliber gun to an Arduino and Raspberry Pi for haptic recoil.",
      outcome:
        "Delivered synchronized hardware-software controls and realistic ballistics ready for visitor demonstrations.",
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
          label: "Client Project",
          value: "Built custom interactive software for a national aviation museum.",
        },
      ],
    },
  },
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
        "Design a two-stage CMOS operational amplifier targeting a 2,500 V/V gain specification (±25 V/V) on a 0.25-micron process.",
      action:
        "Simulated the op-amp stages in LTspice, calculating transconductance, pole locations, and output resistance. Verified biasing and frequency response on hardware test benches.",
      outcome:
        "Achieved 2,007 V/V in simulation. Mapped frequency response limits (low -3dB bandwidth) and identified compensation trade-offs for commercial viability.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/PCB%20Design.pdf",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/PCB%20Design.zip",
      highlights: [
        {
          label: "Hardware Design",
          value: "Designed and simulated a two-stage CMOS operational amplifier.",
        },
        {
          label: "Simulation & Analysis",
          value:
            "Modeled gain, power consumption, PSRR, and CMRR in LTspice.",
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
