export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export const collections: Collection[] = [
  {
    id: "col1",
    name: "The Royal Bridal Series",
    slug: "royal-bridal",
    description:
      "Generational wedding couture featuring heavy gold wire zardosi details and royal structured fits.",
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "col2",
    name: "Festive Heritage",
    slug: "festive-heritage",
    description:
      "Lightweight, organic handloom silks and Chanderi kurtas for daytime pujas, sangeet, and haldi events.",
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "col3",
    name: "Sovereign Classics",
    slug: "sovereign-classics",
    description:
      "Timeless evening wear Jodhpuri Bandhgalas and bespoke gold-embroidered accessories.",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800",
  },
];
