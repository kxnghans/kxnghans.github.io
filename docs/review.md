# Security & Integrity Assessment (review.md)

## Security Boundaries

Hanson-Tube is a client-side static application. Security focus is primarily on data exposure and client-side integrity.

### 1. PII (Personally Identifiable Information)
*   **Handling**: The portfolio contains public professional data. Direct contact information (Phone, Email) is shielded behind the `ContactPage` form.
*   **Protection**: No private server-side data is accessible. User input in the contact form is sent directly to `EmailJS` and is not stored locally.

### 2. External Integrations
*   **EmailJS**: Used for form submissions. API Keys should be stored in `.env` and excluded from Git via `.gitignore`.
*   **LinkedIn**: Standard social links use `rel="noopener noreferrer"` to prevent tab-nabbing vulnerabilities.

---

## Integrity & Safety

### 1. AI Safety
*   **Generated Content**: All content is static and provided in `src/data/`. There is no runtime LLM generation, eliminating the risk of hallucinations or prompt injection.
*   **Code Generation**: AI-assisted code must adhere to `GEMINI.md` to ensure architectural consistency and prevent library bloat.

### 2. Dependency Integrity
*   **Vulnerability Audit**: Periodic `npm audit` is required to mitigate risks in the React and Vite ecosystems.
*   **Version Pinning**: Critical dependencies should be kept updated to their latest stable patches.

---

## Compliance

*   **Accessibility**: The Neumorphic design system must be continuously monitored for contrast ratios.
*   **License**: The project is open-source under the MIT License.
