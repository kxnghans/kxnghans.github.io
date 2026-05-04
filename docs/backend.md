# Data Strategy & Infrastructure (backend.md)

## Architectural Rationale

Hanson-Tube is intentionally designed as a **Static Single Page Application (SPA)** with a **zero-backend architecture**. By relying entirely on client-side logic and static asset delivery, the platform guarantees:
1.  **Maximum Uptime**: Dependent only on the CDN edge nodes of GitHub Pages.
2.  **Zero Latency Data**: All domain data is bundled at build time, eliminating API round-trips for content loading.
3.  **Cost Efficiency**: $0 hosting and database costs.

---

## Data Layer Management (Static SSOT)

Instead of a Relational (SQL) or Document (NoSQL) database, the application utilizes a **Modular JavaScript Data Layer**:
*   **Implementation**: All content is structured as typed JavaScript objects/arrays in `src/data/` (e.g., `projects.js`, `skills.js`).
*   **Optimization Mandate**: To keep bundle sizes minimal, images and heavy media are *not* base64 encoded into the data layer. Instead, the data layer stores string URLs pointing to external buckets (e.g., `storage.googleapis.com`) or the `public/assets/` directory.
*   **Global Indexing**: A utility script (`searchableData.js`) acts as an in-memory materialized view, aggregating all static files into a single optimized array for the Global Search engine.

---

## Transactional Infrastructure: EmailJS

To handle the only mutable data flow in the application—the Contact Form—Hanson-Tube integrates **EmailJS**.

*   **Workflow**: 
    1. User submits form in `ContactPage.jsx`.
    2. React Hook Form validates the payload.
    3. Payload is routed directly to the EmailJS REST API from the client.
    4. EmailJS securely proxies the message to the configured email inbox.
*   **Optimization & Throttling**: The UI prevents spam by disabling the submit button during the network request and triggering a Sonner toast immediately upon resolution.
*   **Security (Keys)**: EmailJS Service IDs, Template IDs, and Public Keys must be injected via Vite Environment Variables (`VITE_EMAILJS_SERVICE_ID`, etc.) defined in `.env` and consumed via `import.meta.env`.

---

## Role-Based Access Control (RBAC)

**Status: Not Applicable.**
As a public-facing portfolio, there is no authentication mechanism, user sessions, or privileged routes. All content is inherently public, and the system relies on GitHub Repository permissions to restrict content modification.
