# Security, Integrity, & Safety Assessment (review.md)

## Security Boundaries & PII Handling

Hanson-Tube operates entirely on the client side. Security is heavily focused on preventing accidental data exposure and maintaining the integrity of third-party integrations.

### 1. Personally Identifiable Information (PII)
*   **Public Data**: All data displayed on the portfolio (Work history, Education, Names) is considered public professional information.
*   **Private Data Protection**: Direct contact vectors (personal email address, phone numbers) are deliberately omitted from the source code.
*   **Form Handling**: Communication is routed exclusively through the `ContactPage` form. User inputs (Visitor Name, Visitor Email, Message) are volatile, stored only in React state, and transmitted directly to the EmailJS API. No PII is logged, stored in local storage, or tracked by the application.

### 2. External Integrations & Anti-Abuse
*   **EmailJS Security**: To prevent abuse of the EmailJS quota, the public key is exposed (as required by client-side EmailJS), but the account must be configured on the EmailJS dashboard to only accept requests originating from the whitelisted domain (`https://kxnghans.github.io`).
*   **Link Integrity (Anti-Tab-Nabbing)**: All external outbound links (LinkedIn, GitHub, Google Cloud Storage) must include `rel="noopener noreferrer"` to prevent the newly opened tab from hijacking the portfolio's window object.

---

## AI Safety & Generation Boundaries

With the integration of AI agents (like the Gemini CLI) into the development workflow, specific safety parameters are enforced:

*   **Static Content Mandate**: There is no runtime LLM generation for end-users. All portfolio text is statically defined in `src/data/`. This eliminates the risk of prompt injection or hallucination on the live site.
*   **Code Generation Guardrails**: AI-assisted code generation is strictly bound by the rules in `GEMINI.md`. Agents are explicitly forbidden from:
    1. Modifying `.env` files or committing secrets.
    2. Introducing external tracking scripts or analytics without explicit user directive.
    3. Bypassing the native Context API in favor of over-engineered state management libraries.

---

## Compliance & Maintenance

*   **Accessibility (a11y)**: The Neumorphic design system poses inherent risks to visual contrast. Continuous audits via ESLint's `jsx-a11y` plugin and manual Lighthouse checks are required to ensure the `text-secondary` and shadow tokens meet WCAG AA contrast ratios.
*   **Dependency Audits**: Routine `npm audit` checks are mandated to address vulnerabilities in the Vite and React compilation ecosystem, even though the deployed output is static HTML/JS.
