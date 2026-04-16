export type HeroPreviewCard = {
  title: string;
  detail: string;
  serial: string;
  stack: string[];
  featured: boolean;
  palette: {
    glow: string;
    edge: string;
    wash: string;
    ink: string;
  };
};