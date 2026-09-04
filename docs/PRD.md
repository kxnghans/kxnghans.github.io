# Product Requirements Document - Hanson-Tube

## Vision

Hanson-Tube is an interactive web portfolio that presents the work of a Systems Engineer and Business Analyst through a YouTube-inspired interface with a dark-mode neumorphic design.

## User Personas

- **Recruiters/Hiring Managers**: Seeking technical competence, project outcomes, and cultural fit in a highly reliable, frictionless manner.
- **Fellow Engineers/Collaborators**: Interested in tech stack details, code quality, technical challenges, and deep exploratory interaction.
- **Clients/Stakeholders**: Evaluating business analysis and project management capabilities via clear, transactional flows.

---

## Feature Classification by User Intent

To guide UX complexity, error handling, and component architecture, all features are categorized by their primary User Intent:

### 1. Transactional & Critical (High Reliability & Low Friction Required)

_Intent: The user is trying to accomplish a specific, critical goal (e.g., hiring, contacting, verifying credentials). Failure here results in immediate drop-off._

- **Contact System (EmailJS Integration)**: Requires strict validation, clear error states, and immediate toast feedback on send attempts.
- **Project Links & Verification**: External links to live demos and repositories open in new tabs (`target="_blank"`) with `rel="noopener noreferrer"`.
- **Work Experience & Education Timelines**: Chronological milestones with direct metric callouts and legible card summaries.
- **Lifetime Value & ROI Intelligence**: Quantified ROI metrics ($9.6M+ savings, 36x peak acceleration, 705k+ hours reclaimed, 0.0% audit error rates, 100% engine test coverage) and accredited governance pillars.
- **Mobile Navigation**: Sidebar toggle is responsive and reliable on viewports under 1024px.

### 2. Exploratory & Social (High Engagement & Interaction)

_Intent: The user is browsing, evaluating visual presentation and technical depth._

- **Lifetime Value Slicers & Dropdowns**: Multi-dimensional slicers (Domain Sector, Business Impact, Career Era) to filter ROI metrics, financial ledgers, and case studies.
- **Voice-Integrated Search & Smart Recommendations**: Natural language navigation and query filtering. Surfaces recommended topics (flagship ventures, core TPM skills, military honors, career milestones) when focused with an empty query, switching directly to live search on keystrokes. Shows a toast alert if the microphone is unavailable or unsupported.
- **Neumorphic UI Engine**: Dark/light mode toggle with inset and outset shadows responding to hover and active states.
- **Interactive Slideshows & Modals**: Project and skill carousels on the homepage with detailed modal dialogs.
- **Hanson-Tube Branding**: YouTube-inspired header and play-icon branding establishing the portfolio theme.

---

## Success Metrics

- **Engagement Depth**: Average number of projects clicked/expanded per session.
- **Conversion**: Frequency of contact form submissions and LinkedIn profile clicks.
- **Performance**: Sub-1s page transitions and initial load times, maintaining 60fps during UI animations.
