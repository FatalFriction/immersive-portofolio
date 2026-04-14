import { BountyGridItem, BountyPosterItem } from "../components/bountyGridTypes";

export interface FeaturedProjectItem {
  title: string;
  tag: string;
  description: string;
  year: string;
  stack: string[];
  image: string;
}

export interface PreviewCardPalette {
  glow: string;
  edge: string;
  wash: string;
  ink: string;
}

export interface HeroPreviewCard {
  title: string;
  detail: string;
  stack: string[];
  serial: string;
  palette: PreviewCardPalette;
  featured: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface HomeContent {
  techTags: string[];
  heroPreviewCards: HeroPreviewCard[];
  featuredProjects: FeaturedProjectItem[];
  processSteps: string[];
  bountyPosters: BountyPosterItem[];
  bountyItems: BountyGridItem[];
  footerLinks: FooterLink[];
}
