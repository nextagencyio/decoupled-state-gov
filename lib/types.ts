// Shared types
export interface DrupalImage {
  url: string
  alt: string
  width?: number
  height?: number
  variations?: ImageVariation[]
}

export interface ImageVariation {
  name: string
  url: string
  width: number
  height: number
}

export interface DrupalTerm {
  id: string
  name: string
}

// Base node type
export interface DrupalNode {
  __typename: string
  id: string
  title: string
  path: string
  body?: {
    processed: string
    summary?: string
  }
  image?: DrupalImage
}

// Paragraph types
export interface DrupalStatItem {
  id: string
  number: string
  label: string
}

// Homepage
export interface DrupalHomepage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: {
    processed: string
  }
  statsItems?: DrupalStatItem[]
  featuredAgenciesTitle?: string
  ctaTitle?: string
  ctaDescription?: {
    processed: string
  }
  ctaPrimary?: string
  ctaSecondary?: string
}

export interface HomepageData {
  nodeHomepages: {
    nodes: DrupalHomepage[]
  }
}

// Agency
export interface DrupalAgency extends DrupalNode {
  headOfficial?: string
  phone?: string
  email?: string
  websiteUrl?: string
  agencyType?: DrupalTerm[]
}

export interface AgenciesData {
  nodeAgencies: {
    nodes: DrupalAgency[]
  }
}

// Official
export interface DrupalOfficial extends DrupalNode {
  position?: string
  agency?: DrupalTerm[]
  email?: string
  phone?: string
  office?: string
  photo?: DrupalImage
}

export interface OfficialsData {
  nodeOfficials: {
    nodes: DrupalOfficial[]
  }
}

// Government Program
export interface DrupalProgram extends DrupalNode {
  agency?: DrupalTerm[]
  eligibility?: string
  budget?: string
  programArea?: DrupalTerm[]
}

export interface ProgramsData {
  nodePrograms: {
    nodes: DrupalProgram[]
  }
}

// Press Release
export interface DrupalPressRelease extends DrupalNode {
  category?: DrupalTerm[]
  featured?: boolean
  contactName?: string
  contactEmail?: string
  created?: {
    timestamp: number
  }
}

export interface PressReleasesData {
  nodePressReleases: {
    nodes: DrupalPressRelease[]
  }
}

// Basic Page
export interface DrupalPage extends DrupalNode {}

// Feature color type
export type FeatureColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo'
