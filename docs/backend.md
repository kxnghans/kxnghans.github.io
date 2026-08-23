# Data Strategy & Infrastructure (backend.md)

## Architectural Rationale

Hanson-Tube is intentionally designed as a **Static Single Page Application (SPA)** with a **zero-backend architecture**. By relying entirely on client-side logic and static asset delivery, the platform guarantees:

1. **Maximum Uptime**: Dependent only on CDN edge distribution (e.g., GitHub Pages).
2. **Zero Latency Data**: All domain data is compiled directly into static JavaScript modules, eliminating API round-trips for content loading.
3. **Zero Maintenance Overhead**: Eliminates runtime database maintenance, server provisioning, and backend hosting costs.

---

## Data Layer Management (Static SSOT)

Instead of a relational or document database, the application utilizes a modular JavaScript data architecture:

- **Source of Truth (`src/data/`)**: All domain records are maintained as modular, typed TypeScript modules (`projects.ts`, `skills.ts`, `work.ts`, `education.ts`, `honors.ts`, `community.ts`, `certifications.ts`, `contactData.ts`, `formData.ts`, `navigation.ts`).
- **Barrel Export (`src/data/index.ts`)**: Provides a centralized entry point exporting all data entities.
- **Materialized Search Index (`src/utils/searchableData.ts`)**: Aggregates all dataset arrays into an in-memory searchable collection structured as `{ id, title, subtitle?, tags?, summary?, content, category, location: { pageName, componentType, componentId?, itemId } }` for the Global Search Context.
- **High-Performance Search Engine (`src/utils/searchEngine.ts`)**: Zero-dependency, in-memory search scoring engine executing multi-token matching, field-weighted scoring hierarchy (Exact > Title > Tags > Subtitle > Summary > Content), tech term alias expansions (`c++`/`cpp`, `next.js`/`nextjs`, `ai`/`ml`), and Levenshtein typo tolerance. Queries run through React's `useDeferredValue` in `SearchContext.tsx` with LRU caching to eliminate UI hitching.
- **Media Asset Strategy**: Source imagery is maintained in a local `media/` directory and batch-processed via Sharp (`scripts/convert-assets.mjs`, `pnpm run assets:convert`) to high-compression WebP format under `public/assets/generated/` (cutting deploy payload from 40.6MB down to 6.0MB). UI consumers load assets asynchronously via `LazyImage.tsx` with skeleton shimmer states, native `loading="lazy"`, and `decoding="async"`.
- **Workbox Precaching**: Production service worker precaches application shell assets (~413 KiB) while runtime image requests are served via `CacheFirst` browser caching.

---

## Transactional Infrastructure: EmailJS

To handle form submissions on `ContactPage.tsx` without hosting a custom server or API gateway, Hanson-Tube integrates **EmailJS**:

- **Workflow**:
  1. User fills out contact form validated by React Hook Form.
  2. Submission checks client-side `localStorage` cooldown timestamp (`hanson_last_contact_sent`). If within the 60-second cooldown window (`SUBMIT_COOLDOWN_MS = 60000`), submission is halted and an informational cooldown toast is displayed.
  3. Validated submissions trigger `@emailjs/browser` SDK directly from the client.
  4. On successful dispatch, `localStorage` records the timestamp, the form resets, and a success toast is presented via Sonner.
  5. Payload is routed to EmailJS REST endpoints and delivered to the recipient inbox.
- **Configuration & Abuse Prevention (`VIBE-001`)**:
  - Environment variables (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`) are documented in `.env.example` and consumed via `import.meta.env`.
  - The EmailJS dashboard domain whitelist restricts API usage strictly to `https://kxnghans.github.io` and authorized local development origins.
  - EmailJS dashboard template settings support Google reCAPTCHA v3 or Cloudflare Turnstile integration to reject headless bot dispatches at the provider edge.

---

## Cloud Storage & CDN Media Staging (`VIBE-004`)

When utilizing Google Cloud Storage (`gs://portfolio_showcase`) as a fallback or origin for external media assets and downloads:

- **Uniform Bucket-Level Access**: Bucket ACLs enforce uniform access policies to prevent individual object permission drift:
  ```sh
  gcloud storage buckets update gs://portfolio_showcase --uniform-bucket-level-access
  ```
- **Read-Only Public IAM Policy**: Public access is restricted strictly to read-only retrieval without write, delete, or IAM administration grants:
  ```sh
  gcloud storage buckets add-iam-policy-binding gs://portfolio_showcase \
    --member=allUsers \
    --role=roles/storage.objectViewer
  ```
- **Asset Integrity**: PDF documents, demo videos, and project archives hosted in bucket storage are served over HTTPS TLS with public read-only headers.

---

## Role-Based Access Control (RBAC)

**Status: Not Applicable.**
All portfolio content is public. Access control is maintained at the repository and deployment level via GitHub branch protection and commit signing.
