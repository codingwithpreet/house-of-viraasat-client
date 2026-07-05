export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "THE IMPERIAL ANCESTRY",
    subtitle: "Raw Silk Zardosi Sherwanis",
    tagline:
      "Hand-tailored for generational legacies, highlighting authentic dabka and tilla wire embroidery.",
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1600",
    ctaText: "Explore the Atelier",
    ctaLink: "/products",
  },
  {
    id: 2,
    title: "SARTORIAL RESTRAINT",
    subtitle: "Midnight Velvet Bandhgalas",
    tagline:
      "Sharp Jodhpuri cuts crafted with horsehair interlining to sculpt the perfect posture.",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=1600",
    ctaText: "Discover Tailoring",
    ctaLink: "/products",
  },
];
