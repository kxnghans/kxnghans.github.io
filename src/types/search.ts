export type SearchCategory =
  | "Projects"
  | "Skills"
  | "Work"
  | "Education"
  | "Honors"
  | "Certifications"
  | "Community"
  | "Value";


export interface SearchLocation {
  pageName: string;
  componentType: "modal" | "slideshow" | "none";
  componentId?: string;
  itemId: string | number;
}

export interface SearchableItem {
  id: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  summary?: string;
  content: string;
  category: SearchCategory;
  location: SearchLocation;
}
