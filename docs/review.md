# Security, Integrity, & Safety Assessment (review.md)

## Security Boundaries & PII Handling

Hanson-Tube operates entirely on the client side. Security is focused on preventing accidental data exposure, mitigating anti-abuse vectors, and maintaining integration integrity.

### 1. Personally Identifiable Information (PII)

- **Public Data**: All data displayed on the portfolio (Work history, Education, Names) is considered public professional information.
- **Private Data Protection**: Direct personal email addresses and phone numbers are deliberately omitted from source code.
- **Form Handling**: Communication is routed exclusively through the `ContactPage` form. Inputs (Visitor Name, Visitor Email, Message) exist ephemerally in React state and are transmitted directly to the EmailJS REST API. No PII is logged, stored in local storage, or tracked by the client.

### 2. External Integrations & Anti-Abuse

- **EmailJS Security**: The public key is injected via `import.meta.env.VITE_EMAILJS_PUBLIC_KEY`. The EmailJS dashboard domain whitelist restricts API usage to `https://kxnghans.github.io` and local origins.
- **Link Integrity**: All external outbound links include `target="_blank"` and `rel="noopener noreferrer"` to eliminate reverse tab-nabbing vulnerabilities.

---

## AI Safety & Generation Boundaries

With AI-assisted tooling integrated into the workflow, strict boundaries are enforced:

- **Static Content Mandate**: There is no runtime LLM generation for end-users. All portfolio text is statically defined in `src/data/`, eliminating prompt injection and hallucination risks.
- **Code Generation Guardrails**:
  1. No committing secrets or hardcoded credentials.
  2. No adding unapproved tracking scripts or analytics.
  3. No bypassing the native Context API for third-party state managers.
  4. Zero-tolerance for ESLint errors (`pnpm run lint`).

---

## Compliance & Maintenance

- **Accessibility (a11y)**: The Neumorphic design system is audited via ESLint `jsx-a11y` and manual contrast checks to ensure text and interactive controls meet WCAG AA contrast standards.
- **Dependency Audits**: Regular `pnpm audit` executions ensure tooling and dependencies remain secure.

---

## Architectural Gaps & Recommendations

| Severity | Gap / Area                    | Description                                                                                                     | Current State                         | Recommendation                                                                                                                   |
| :------- | :---------------------------- | :-------------------------------------------------------------------------------------------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------- |
| **Low**  | Asset Compression Pipeline    | Generated images in `public/assets/generated/` are stored as PNGs.                                              | PNG format (~100-300KB each).         | Add automated WebP conversion script to reduce bundle payload by ~60%.                                                           |
| **Low**  | Ecosystem Projects Linkage    | External live ecosystem projects (Fretwork, Gospel Games, MilCalc, Unpack, CaroHans) pending dataset ingestion. | Defined in roadmap Phase 2.           | Ingest structured project metadata and live links into `src/data/projects.js` during Phase 2 sprint.                             |
| **Low**  | Cloud Bucket Fallback Staging | High-resolution media hosted locally vs GCP Cloud Storage.                                                      | Stored in `public/assets/generated/`. | Maintain local assets as default SSOT; stage GCP Cloud Storage bucket for optional CDN asset streaming if repository size grows. |
