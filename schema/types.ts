// Auto-generated TypeScript types from Drupal GraphQL schema.
// Run `decoupled-cli schema sync` to regenerate.

export interface NodeAgency {
  id: string;
  agencyType: any[];
  body: { value: string; summary?: string };
  email: string;
  headOfficial: string;
  image: { url: string; alt: string; width: number; height: number };
  path: string;
  phone: string;
  title: string;
  websiteUrl: string;
}

export interface NodeHomepage {
  id: string;
  ctaDescription: { value: string };
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTitle: string;
  featuredAgenciesTitle: string;
  heroDescription: { value: string };
  heroSubtitle: string;
  heroTitle: string;
  path: string;
  statsItems: any[];
  title: string;
}

export interface ParagraphStatItem {
  id: string;
  label: string;
  number: string;
}

export interface NodeOfficial {
  id: string;
  agency: any[];
  body: { value: string; summary?: string };
  email: string;
  office: string;
  path: string;
  phone: string;
  photo: { url: string; alt: string; width: number; height: number };
  position: string;
  title: string;
}

export interface NodePage {
  id: string;
  body: { value: string; summary?: string };
  path: string;
  title: string;
}

export interface NodePressRelease {
  id: string;
  body: { value: string; summary?: string };
  category: any[];
  contactEmail: string;
  contactName: string;
  featured: boolean;
  image: { url: string; alt: string; width: number; height: number };
  path: string;
  title: string;
}

export interface NodeProgram {
  id: string;
  agency: any[];
  body: { value: string; summary?: string };
  budget: string;
  eligibility: string;
  image: { url: string; alt: string; width: number; height: number };
  path: string;
  programArea: any[];
  title: string;
}
