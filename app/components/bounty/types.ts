export interface BountyGridItem {
  id: string;
  title: string;
  tag: string;
  year: string;
  description: string;
  image: string;
  stack: string[];
  ctaLabel: string;
  href: string;
  eyebrow: string;
  isFeatured: boolean;
}

export interface BountyPosterItem {
  id: string;
  label: string;
  value: string;
}
