/**
 * @file contactData.ts
 * @description Contact links and communication channels for Hanson-Tube.
 */
import { ICONS } from "../components/icons";
import type { ContactLink } from "../types/data";

// Direct contact, career, and developer profile links
export const contactLinks: ContactLink[] = [
  {
    href: "mailto:kobby.hanson97@gmail.com",
    icon: ICONS.EMAIL,
    text: "kobby.hanson97@gmail.com",
  },
  { href: "tel:719-360-2519", icon: ICONS.PHONE, text: "719-360-2519" },
  {
    href: "https://www.linkedin.com/in/kobbyhanson",
    icon: ICONS.LINKEDIN,
    text: "linkedin.com/in/kobbyhanson",
  },
  {
    href: "https://github.com/kxnghans",
    icon: ICONS.GITHUB,
    text: "github.com/kxnghans",
  },
  { href: "https://hansondeck.com", icon: ICONS.GLOBE, text: "hansondeck.com" },
];
