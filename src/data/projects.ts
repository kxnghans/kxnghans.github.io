import type { ProjectItem } from "../types/data";

export const projectData: ProjectItem[] = [
  {
    title: "CaroHans Ventures & Hub",
    imageUrl: "/assets/generated/projects/carohans-hub.webp",
    summary: [
      "Venture: HansonCreations Studio",
      "Platform: Next.js, Supabase, Cloudflare",
      "Impact: Multi-Tenant Enterprise Operations",
    ],
    details: {
      title: "CaroHans Ventures & Central Ecosystem Hub",
      challenge:
        "Scaling an innovation studio required centralized multi-tenant infrastructure to orchestrate client engagements, internal resource management, and digital product portals without fragmented operational silos.",
      action:
        "Engineered CaroHans as the flagship enterprise resource management system (ERMS) and HansonCreations central hub. Built on Next.js, Supabase, and Cloudflare Pages with role-based access control, edge-optimized workflows, and dynamic client project routing.",
      outcome:
        "Unified disparate business functions across the HansonCreations venture ecosystem under a single automated operational platform, accelerating cross-app deployments, client onboarding, and digital asset distribution.",
      liveLink: "https://hansoncreations.com/apps/carohans",
      codeLink: "https://hansoncreations.com",
      highlights: [
        {
          label: "Entrepreneurship",
          value:
            "Founded and deployed centralized venture infrastructure for HansonCreations.",
        },
        {
          label: "Architecture",
          value:
            "Multi-tenant Next.js with Supabase relational schemas and Cloudflare edge hosting.",
        },
        {
          label: "Operational Scale",
          value:
            "Streamlined resource tracking and digital product deployments across all ventures.",
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
      "Impact: DAFMAN 36-2905 & Pension Calculations",
    ],
    details: {
      title: "MilCalc – Military Pension & Fitness Mobile Suite",
      challenge:
        "Service members and veterans lacked a modern, offline-capable mobile suite to compute complex Department of the Air Force fitness scores (DAFMAN 36-2905) and compare High-3 versus Blended Retirement System (BRS) pension trajectories.",
      action:
        "Architected and built MilCalc from the ground up using React Native, Expo Go, and high-performance offline-first local storage (MMKV and SQLite). Integrated deterministic calculation engines, RevenueCat subscription tiers, and biometric security.",
      outcome:
        "Delivered a mission-critical utility app that provides instant, 100% offline financial forecasting and fitness score analysis, serving military personnel with high-fidelity calculations and zero latency.",
      liveLink: "https://hansoncreations.com/apps/milcalc",
      codeLink: "",
      highlights: [
        {
          label: "Product Strategy",
          value:
            "Identified and captured an underserved defense niche with high-utility mobile tooling.",
        },
        {
          label: "Mobile Architecture",
          value:
            "Built with React Native, Expo, and offline-first MMKV/SQLite local caching.",
        },
        {
          label: "Domain Modeling",
          value:
            "Accurately codified DAFMAN 36-2905 fitness matrices and BRS/High-3 pension math.",
        },
      ],
    },
  },
  {
    title: "Gospel Games Platform",
    imageUrl: "/assets/generated/projects/gospel-games.webp",
    summary: [
      "Venture: HansonCreations Gaming",
      "Stack: React Native Expo 54, Firebase RTDB",
      "Engine: Deterministic State Machine",
    ],
    details: {
      title: "Gospel Games – Interactive Faith-Based Gaming Platform",
      challenge:
        "Faith-based communities and youth ministries lacked modern, high-engagement interactive trivia and multiplayer games built with contemporary mobile gaming mechanics.",
      action:
        "Founded and developed the Gospel Games platform under HansonCreations. Engineered a modular monorepo containing a deterministic game engine (@repo/engine), React Native Expo 54 client, and Firebase Realtime Database for cross-device multiplayer synchronization.",
      outcome:
        "Created a scalable, real-time multiplayer gaming ecosystem that drives community engagement, live interactive gameplay, and seamless in-app monetization.",
      liveLink: "https://hansoncreations.com/apps/gospelgames",
      codeLink: "",
      highlights: [
        {
          label: "Venture Leadership",
          value:
            "Conceived, architected, and launched a dedicated faith-tech mobile gaming brand.",
        },
        {
          label: "Engine Design",
          value:
            "Implemented @repo/engine deterministic finite state machine for game rules.",
        },
        {
          label: "Real-time Sync",
          value:
            "Orchestrated low-latency multiplayer rooms using Firebase Realtime Database.",
        },
      ],
    },
  },
  {
    title: "Unpack Travel Companion",
    imageUrl: "/assets/generated/projects/unpack-travel.webp",
    summary: [
      "Venture: HansonCreations Travel Tech",
      "Stack: React Native, Local-First Engine",
      "Focus: Collaborative Group Itineraries",
    ],
    details: {
      title: "Unpack – Collaborative Group Travel & Itinerary Platform",
      challenge:
        "Group travel coordination is notoriously chaotic due to fragmented communication, scattered booking receipts, and poor offline access while in transit.",
      action:
        "Built Unpack as a next-generation travel companion app featuring collaborative itinerary planning, budget splitting, packing lists, and local-first data reconciliation designed for low-connectivity environments.",
      outcome:
        "Streamlined group trip planning into a single shared, offline-resilient digital workspace, eliminating planning friction and scheduling confusion.",
      liveLink: "https://hansoncreations.com/apps/unpack",
      codeLink: "",
      highlights: [
        {
          label: "Market Opportunity",
          value:
            "Addressed consumer group travel pain points with collaborative digital tools.",
        },
        {
          label: "Local-First UX",
          value:
            "Designed seamless offline caching for uninterrupted transit and flight usage.",
        },
        {
          label: "Product Design",
          value:
            "Intuitive timeline-based itinerary builder with shared budgeting workflows.",
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
      "Edge: Cloudflare Workers Deployment",
    ],
    details: {
      title: "Fretwork – AI-Powered Guitar Tablature & Pathfinding System",
      challenge:
        "Transcribing audio and chord progressions into biomechanically optimal guitar fretboard fingerings requires balancing physical hand biomechanics, fret distance penalties, and timbre nuances—a task traditional rule-based algorithms fail to optimize.",
      action:
        "Engineered Fretwork as a graduate research capstone at UC Berkeley. Developed a deep learning pipeline utilizing PyTorch and TabTransformer, paired with a custom proximate Viterbi dynamic programming pathfinder (prox_viterbi_transformer) to compute optimal fretboard transitions. Deployed as a low-latency web app on Cloudflare Workers.",
      outcome:
        "Achieved superior tablature fingering accuracy with biomechanically plausible transitions, delivering real-time interactive pathfinding through an edge-deployed machine learning application.",
      liveLink: "https://guitar-capstone.kobbyhanson.workers.dev/",
      codeLink: "",
      highlights: [
        {
          label: "Applied Machine Learning",
          value:
            "Trained PyTorch TabTransformer models on extensive musical score datasets.",
        },
        {
          label: "Algorithmic Innovation",
          value:
            "Designed prox_viterbi_transformer pathfinding to minimize physical hand strain.",
        },
        {
          label: "Edge Architecture",
          value:
            "Packaged and served lightweight inference via Cloudflare Workers edge runtime.",
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
        "After a deployment and moving to a new city, I needed to build a professional network and find a healthy outlet to balance my new job and life away from family.",
      action:
        "I established a photography LLC, managing all business operations from client relations and taxes to workflow streamlining. I engaged with new clients and my existing network from church, real estate meetups, and sports to build my client base.",
      outcome:
        "I successfully launched the business, hitting a $10,000 revenue target in the first year. I also gained $3,000 in tax savings through deductions and further improved my social presence and network by meeting prominent athletes, founders, and community advocates.",
      liveLink: "https://hansondeck.com/",
      codeLink: "",
      highlights: [
        {
          label: "Entrepreneurship",
          value: "Successfully launched and managed a profitable LLC.",
        },
        {
          label: "Financial Acumen",
          value: "Met a $10,000 first-year revenue target.",
        },
        {
          label: "Networking",
          value: "Built a strong network with notable clientele.",
        },
      ],
    },
  },
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
        "To create a more engaging and interactive way to showcase my professional experience, ventures, and projects than a traditional static resume.",
      action:
        "Designed and developed a responsive web application from scratch using React for the frontend, Vite for the build tool, and Tailwind CSS for styling. The application features a clean, modern UI with interactive elements like slideshows, modals, and a searchable interface.",
      outcome:
        "The result is a dynamic and user-friendly portfolio that not only presents my professional history in a compelling way but also demonstrates my frontend development skills and my ability to create a polished web application. The project is deployed on GitHub Pages and is continuously updated with new projects and features.",
      liveLink: "https://kxnghans.github.io/",
      codeLink: "https://github.com/kxnghans/mywalkthrough",
      highlights: [
        {
          label: "Tech Stack",
          value: "React, Vite, Tailwind CSS, Git, GitHub.",
        },
        {
          label: "Key Decisions",
          value:
            "Chose React for its component-based architecture, Vite for its fast development experience, and Tailwind CSS for its utility-first approach to styling.",
        },
        {
          label: "Benefits",
          value:
            "Provides an interactive and engaging user experience, effectively showcases my projects and skills, and is easily maintainable and scalable.",
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
        "Our facilities management team was tracking key and vault combinations in Excel matrices across 450 sites, leading to a 7.5% error rate and significant rework.",
      action:
        "I developed and implemented a fully automated system using the Microsoft Power Platform (Power Apps, Power Automate, Power BI), created a comprehensive report to document the new process, and conducted an internal training session with the team.",
      outcome:
        "The new system eliminated the error rate in audits from 7.5% to 0% by creating a single source of truth with real-time data flow from the app to Power BI reports. This saved over 2,760 hours of monthly research and reconciliation, equating to $55,200 in monthly operational savings and significant risk mitigation.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Financial Impact",
          value: "Achieved over $55,200 in monthly operational savings.",
        },
        {
          label: "Process Improvement",
          value: "Reduced audit error rate from 7.5% to 0%.",
        },
        {
          label: "Tools Used",
          value:
            "Implemented a full solution using the Microsoft Power Platform.",
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
        "Team innovation was low, and we needed a way to increase participation and improve personal record-keeping to foster a culture of innovation.",
      action:
        "I created a Power BI dashboard to track key innovation metrics (submissions, benefits savings in time and money, implementations) and gamified our initiatives with a leaderboard to encourage engagement.",
      outcome:
        "This led to a 13% increase in participation compared to the old spreadsheet-based system. The leaderboard also highlighted top contributors to leadership, creating a new avenue for high-level visibility and better-quantified tracking. The initiative resulted in $1.1M saved in the first year and over 705K customer hours saved.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/Idea%20Board%20Explained.pdf",
      codeLink: "",
      highlights: [
        {
          label: "Financial Impact",
          value: "Saved the company $1.1 million in the first year.",
        },
        {
          label: "Data Visualization",
          value: "Created an engaging and effective dashboard with Power BI.",
        },
        {
          label: "Team Engagement",
          value: "Increased innovation participation by 13%.",
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
        "Our team was struggling with unstable legacy hardware and bare-metal clusters that were causing significant downtime.",
      action:
        "I built a Cloud Concept of Operations (ConOps) for a dedicated testbed, integrating cloud providers like AWS, Microsoft Azure, and OpenShift for effective troubleshooting and recovery. I also utilized a single-node OpenShift cluster to streamline our testing process.",
      outcome:
        "This resulted in a 10x time savings, with nightly builds completing in one hour, which allowed for debugging and development during business hours. We also achieved over $10,000 in estimated budget savings by leveraging our existing enterprise license.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Time Savings",
          value:
            "Reduced nightly build times tenfold, enabling faster development cycles.",
        },
        {
          label: "Budget Savings",
          value:
            "Saved over $10,000 by utilizing existing enterprise licenses.",
        },
        {
          label: "Technical Stack",
          value:
            "Utilized AWS, Microsoft Azure, and OpenShift to stabilize legacy systems.",
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
        "A new program, MESHc, had low usage due to conflicting requirements from different teams—the RF team wanted detailed specs, while the business team wanted a simplified roll-up of information.",
      action:
        "I initiated and led bi-weekly wireframing sessions in Adobe XD to visualize a compromise. This resulted in a simplified default view with hyperlinks to detailed data, satisfying both teams without wasting development time.",
      outcome:
        "The project led to an 800% increase in adoption and usage. It also saved one month of wait time from the UI/UX team's backlog and helped secure an additional $1M in funding for a related program.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "User Adoption",
          value: "Increased program usage by 800% across teams.",
        },
        {
          label: "Financial Success",
          value:
            "Efforts contributed to securing an additional $1M in funding.",
        },
        {
          label: "Core Competencies",
          value:
            "Demonstrated strong skills in UI/UX design and stakeholder management.",
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
        "During a large-scale deployment in Qatar to support Afghan refugees, our team faced challenges with morale, tempo, and shelf-life operations.",
      action:
        "I created a Power Query data pipeline in Excel to automatically flag items that were soon to expire, allowing for proactive requisitioning.",
      outcome:
        "This improved our tempo and increased installation productivity by two-thirds, cutting nightly reconciliation time from hours to minutes. It also minimized mistakes and reduced the error rate for re-issuing critical items like food and medical supplies from 20% to less than 5%.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Efficiency Gains",
          value: "Increased team productivity by 66%.",
        },
        {
          label: "Data Automation",
          value: "Built a data pipeline using Power Query and Excel.",
        },
        {
          label: "Quality Control",
          value: "Reduced the error rate for critical supplies to under 5%.",
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
        "During the COVID-19 pandemic, I was responsible for planning essential operations and managing team productivity and KPIs while working remotely.",
      action:
        "I created a detailed contingency plan by using regression analysis and visualizing past transaction trends for team members. The final report included a map component identifying team members, locations, and stats. I also developed an effective communication SOP for our remote work demands.",
      outcome:
        "This proactive planning identified essential personnel and resulted in zero team outbreaks. We maintained a 91% mission capable rate, which was 7% better than the average.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Operational Excellence",
          value: "Maintained a 91% mission capable rate during a crisis.",
        },
        {
          label: "Analytical Skills",
          value: "Used data analysis for strategic contingency planning.",
        },
        {
          label: "Health & Safety",
          value: "Ensured zero team outbreaks through effective planning.",
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
        "I noticed a lack of mentorship and career guidance for the young adults in my church, who were often confused after graduation and had no experience.",
      action:
        "I proposed and secured funding for a 'Summer Bootcamp' for remote development. This initiative included bi-weekly mentoring sessions, code reviews, and office hours. I also leveraged my network to bring in peers from top companies like Google, Deloitte, Booz Allen Hamilton, and JP Morgan, as well as startup founders and a PhD candidate from the University of Cincinnati, to share their experiences and help my mentees develop their professional networks.",
      outcome:
        "This initiative helped my mentees develop their own church app, which included a community tab for news and engagement, charity transparency on cash flow, and automated forms for taxes. The most significant result was an increase in giving and the confidence and connections the team members gained to succeed professionally.",
      liveLink: "",
      codeLink: "",
      highlights: [
        {
          label: "Leadership",
          value: "Founded and led a successful mentorship bootcamp.",
        },
        {
          label: "Community Impact",
          value: "Developed and launched a mobile app for a non-profit.",
        },
        {
          label: "Networking",
          value:
            "Built a professional network for mentees with industry leaders.",
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
        "Develop a tool to accurately forecast stock prices using multiple data inputs.",
      action:
        "Built and trained a Long Short-Term Memory (LSTM) Recurrent Neural Network (RNN) using chronological data splitting, normalization, and Early Stopping to prevent overfitting.",
      outcome:
        "Achieved a high R-squared score of 0.952 on the prediction model. Also set up a Stable Diffusion environment for AI-based image generation.",
      liveLink: "",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/Stock_prediction_multivariate.html",
      highlights: [
        {
          label: "Predictive Modeling",
          value:
            "Built and trained an LSTM model for multivariate time-series forecasting.",
        },
        {
          label: "Data Integrity",
          value:
            "Employed proper time-series validation techniques to ensure model reliability.",
        },
        {
          label: "AI Applications",
          value:
            "Gained experience with generative AI by setting up a Stable Diffusion environment.",
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
      details: [
        "Facial Recognition: Developed a system to identify individuals from a dataset of celebrity faces using an AlexNet-like architecture, employing techniques like batch normalization and dropout to ensure stability and prevent overfitting.",
        "Image Classification: Optimized deep learning models for Fashion MNIST and Dog Breed classification, designing efficient CNNs under strict parameter and epoch constraints to overcome challenges like small datasets.",
        "Image Processing from Scratch: Implemented logistic regression with K-Fold cross-validation for animal classification and built image sharpening (Sobel operator) and noise removal (median filter) algorithms from the ground up to demonstrate a fundamental understanding of the processes.",
      ],
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/Facial%20Recognition%20Showcase.pdf",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/Computer%20Vision.zip",
      highlights: [
        {
          label: "Deep Learning",
          value:
            "Implemented and trained various CNN architectures (including AlexNet).",
        },
        {
          label: "Model Optimization",
          value:
            "Used techniques like K-Fold Cross-Validation, Batch Normalization, and Dropout to improve model performance and prevent overfitting.",
        },
        {
          label: "Fundamental Implementation",
          value:
            "Built core machine learning and image processing algorithms from scratch using Python, TensorFlow, and OpenCV.",
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
        "Implement an autonomous RC car that could react to its surroundings and navigate a course.",
      action:
        "Built the car using an Arduino toolkit, C programming, and a suite of sensors (GPS, compass, ultrasonic distance). As project lead, I directed team goals and organized resources.",
      outcome:
        "Successfully created a functional autonomous vehicle that navigates through predefined waypoints, actively avoids obstacles using an ultrasonic sensor, and executes a search pattern upon reaching its final destination.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/RC%20Car%20Demo.MOV",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/RC%20Car%20-%20Robotics%20Showcase.zip",
      highlights: [
        {
          label: "Hardware Implementation",
          value:
            "Integrated GPS, compass, and ultrasonic sensors with an Arduino microcontroller.",
        },
        {
          label: "Software Development",
          value:
            "Programmed autonomous navigation and obstacle avoidance logic in C.",
        },
        {
          label: "Leadership",
          value: "Directed team goals and managed project resources.",
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
        "Develop an engaging and realistic B-17 side gunner flight simulator for a museum exhibit.",
      action:
        "Used Unreal Engine to model realistic physics and designed the system to integrate with a life-size gun replica via a Raspberry Pi and Arduino for haptic feedback.",
      outcome:
        "Successfully established communication between the hardware and software, creating a functional foundation for the final exhibit.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/UE4%20Demo.mp4",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/50cal%20Simulator.zip",
      highlights: [
        {
          label: "Game Development",
          value: "Utilized Unreal Engine to build a realistic simulation.",
        },
        {
          label: "Hardware Integration",
          value:
            "Linked a Raspberry Pi and Arduino to the simulation for physical input.",
        },
        {
          label: "Client Project",
          value: "Developed an exhibit for a public-facing national museum.",
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
        "Design a two-stage CMOS op-amp circuit to meet a gain specification of 2500 V/V (±25 V/V) using a 0.25-micron process.",
      action:
        "Designed and simulated the op-amp using LTSpice, applying key theoretical principles for gain, transconductance, and output resistance. Debugged and optimized circuit performance using breadboarding and C programming.",
      outcome:
        "The simulated design achieved a gain of 2007 V/V. Analysis identified performance issues like low -3dB frequency and proposed resolutions, demonstrating a deep understanding of analog circuit design and trade-offs compared to commercial op-amps.",
      liveLink:
        "https://storage.googleapis.com/portfolio_showcase/PCB%20Design.pdf",
      codeLink:
        "https://storage.googleapis.com/portfolio_showcase/PCB%20Design.zip",
      highlights: [
        {
          label: "Hardware Design",
          value: "Designed and simulated a two-stage CMOS op-amp circuit.",
        },
        {
          label: "Simulation & Analysis",
          value:
            "Used LTSpice for circuit simulation and performance analysis (Gain, Power, PSRR, CMRR).",
        },
        {
          label: "Low-Level Programming",
          value:
            "Applied C, Assembly, and Verilog for circuit control and logic design.",
        },
      ],
    },
  },
];
