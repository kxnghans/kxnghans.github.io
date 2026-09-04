import type { EducationItem } from "../types/data";
import { ASSET_URLS } from "./assets";

// Education Dataset (SSOT)
// Academic coursework, degrees, capstone systems, and engineering honors.
export const educationData: EducationItem[] = [
  // Graduate Degree: UC Berkeley Master of Science in Data Science
  {
    title: "Masters in Data Science",
    imageUrl: ASSET_URLS.EDUCATION.UC_BERKELEY_MS,
    summary: [
      "University of California, Berkeley",
      "Degree: Master of Science",
      "Honors: Summa Cum Laude",
      "Focus: Applied Machine Learning & MLSys",
    ],
    details: {
      title: "Master of Science in Data Science",
      subtitle: "University of California, Berkeley | School of Information",
      highlights: [
        { label: "Academic GPA", value: "4.0 / 4.0" },
        { label: "Capstone", value: "Fretwork Audio AMT" },
        { label: "Core Focus", value: "Applied ML & Systems" },
        { label: "Inference Latency", value: "< 1s AWS ECS" },
      ],
      details: [
        "Graduate Machine Learning & AI Curriculum:",
        "Applied Machine Learning: Supervised and unsupervised learning, OLS/Ridge/Lasso math, SVM kernels, Random Forests, XGBoost, multilayer perceptrons from scratch, CNNs, NLP embeddings, and algorithmic fairness audits.",
        "Machine Learning Systems Engineering: Production MLOps, containerized FastAPI inference microservices, multi-stage Docker builds, Kubernetes HPA autoscaling, CI/CD automated model testing, and data/concept drift detection.",
        "Data Engineering Fundamentals: Containerized multi-database architectures with Docker Compose, PostgreSQL ACID relational schemas, MongoDB document modeling, Neo4j graph traversals in Cypher, Nginx reverse proxies, and persistent ETL pipelines.",
        "Statistics for Data Science: Classical Linear Model, 6 Gauss-Markov assumptions, BLUE estimator properties, hypothesis testing, heteroskedasticity diagnostics (Breusch-Pagan, White robust errors), and Maximum Likelihood Estimation (MLE).",
        "Modern AI Strategy & Governance: Enterprise AI unit economics, Total Cost of Ownership, Data-as-an-Asset valuations, Apache Iceberg/Delta Lake open table formats, and GenAI Build vs Buy vs Fine-Tune strategies (RAG, PEFT/LoRA).",
        "Data Science Programming: Object-oriented Python architectures, dunder methods, Big-O algorithmic complexity profiling, vectorized NumPy tensor math, and Pandas MultiIndex data transformations.",
        "Research & Applications for Data Analysis: Observational study design, threat identification (selection bias, Simpson's Paradox), sampling theory, PII anonymization / k-anonymity privacy frameworks, and executive report design.",
        "Key Capstone & Research Initiatives:",
        "Fretwork Audio-to-Tablature Engine: Built an automatic music transcription system connecting Spotify's Basic Pitch note detection to a causal TabTransformer prior and a custom prox_viterbi_transformer decoder that penalizes awkward finger stretches. Deployed PyTorch models via FastAPI on AWS ECS Fargate with a Next.js 16 / alphaTab interface.",
      ],
      exposure: [
        "PyTorch",
        "TensorFlow / Keras",
        "Scikit-Learn",
        "NumPy / Pandas / SciPy",
        "FastAPI",
        "Docker / Kubernetes",
        "AWS ECS Fargate",
        "PostgreSQL / Neo4j / MongoDB",
        "Next.js 16 / alphaTab",
      ],
    },
  },

  // Undergraduate Degree: UCCS Bachelor of Science in Electrical Engineering
  {
    title: "Bachelors in Electrical Engineering",
    imageUrl: ASSET_URLS.EDUCATION.UCCS_EE_BS,
    summary: [
      "University of Colorado, Colorado Springs",
      "Degree: Bachelor of Science",
      "Honors: Cum Laude",
      "Distinction: 7x President's & Dean's Lists",
    ],
    details: {
      title: "Bachelor of Science in Electrical Engineering",
      subtitle:
        "University of Colorado, Colorado Springs | College of Engineering & Applied Science",
      highlights: [
        { label: "Academic GPA", value: "3.67 / 4.0" },
        {
          label: "Academic Honors",
          value: "Cum Laude (7x President's & Dean's Lists)",
        },
        { label: "Senior Capstone", value: "AR-VR Flight Simulator" },
        {
          label: "Concurrent Service",
          value: "USAF Reserve & Software Developer",
        },
      ],
      details: [
        "Circuits, Electronics & Solid-State Physics:",
        "Circuits I & II and AC Circuit Labs: Nodal/mesh analysis, Thevenin equivalents, second-order RLC damping response, phasor AC power factor correction, mutual inductance, and discrete Bode plot filter testing.",
        "Electronics I & II: Small-signal BJT/MOSFET models, Class AB push-pull output stages, differential pairs with active current mirrors, and SPICE design of a two-stage CMOS operational amplifier (60 dB gain, 60° phase margin).",
        "Physical & Power Electronics: Solid-state carrier transport, drift/diffusion, DC-DC switch-mode converters (Buck, Boost, Buck-Boost in CCM/DCM), PWM inverters, and high-frequency transformer magnetics.",
        "Semiconductor Devices I & II: Crystal lattices, Miller indices, Kronig-Penney band theory, Fermi-Dirac carrier statistics, PN junction electrostatics, Schottky vs Ohmic contacts, BJT Ebers-Moll physics, power MOSFETs, and optoelectronics.",
        "Embedded Systems & Computer Engineering:",
        "Microcomputer Systems & MicroLab II: Embedded C and Assembly programming, hardware Interrupt Service Routines, timer PWM generation, ADC/DAC sensor sampling, and UART/SPI/I2C peripheral communication.",
        "Computer Architecture: 5-stage classic RISC pipeline datapath, RAW data hazard forwarding and stalling, 2-bit saturating branch prediction, and multi-level set-associative cache design.",
        "RF, Electromagnetics & Wave Propagation:",
        "Electromagnetics I & II: Maxwell's equations in differential/integral forms, uniform plane wave propagation, transmission line reflections, Smith Chart impedance matching, rectangular waveguide TE/TM cutoff modes, and half-wave dipole radiation.",
        "Microwave Measurements Lab: Vector Network Analyzer two-port SOLT calibration, high-frequency S-parameter measurement (S11, S21), Keysight ADS microstrip filter simulations, and anechoic chamber antenna gain tests.",
        "Signal Processing, Mathematics & Applied Deep Learning:",
        "Signals & Systems: Continuous and discrete-time convolution, Fourier transforms (CTFT/DTFT), Laplace/Z-transform stability regions, and analog/digital filter design (Butterworth, Chebyshev, IIR/FIR).",
        "Deep Learning Curriculum: Neural network mathematical foundations, backpropagation, CNN vision architectures (AlexNet, ResNet), time-series LSTM models, autoencoders, and OpenCV image processing.",
        "Senior Capstone (AR-VR Flight Simulator): Built an embedded flight simulator combining 6-DoF aerodynamic flight models, IMU orientation tracking, and real-time cockpit graphics.",
        "Applied Mathematics & Modeling: Linear Algebra (SVD, QR/LU factorizations, eigendecomposition), Engineering Probability & Statistics (hypothesis testing, probability distributions), and state-space differential equation solvers in MATLAB.",
        "Academic Honors & Multi-Track Leadership:",
        "President's & Dean's Lists (7 Semesters): Maintained a 3.75–4.0 semester GPA while serving in the US Air Force Reserve and working as a university software developer.",
        "Engineering Communication & Ethics: Formal technical documentation, project lifecycle proposals, and cross-functional presentations.",
      ],
      exposure: [
        "LTspice / SPICE",
        "MATLAB / Simulink",
        "Keysight ADS",
        "Smith Charts",
        "VNA & Spectrum Analyzers",
        "C / C++",
        "Assembly (MIPS / ARM)",
        "STM32 / Microcontrollers",
        "VHDL / Verilog",
        "PyTorch / TensorFlow",
      ],
    },
  },
];
