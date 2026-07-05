export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export const categories: Category[] = [
  {
    id: "c1",
    name: "Sherwanis",
    slug: "sherwani",
    description:
      "Hand-tailored raw silk and Banarasi brocade sherwanis featuring traditional gold tilla and zardosi craftsmanship.",
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "c2",
    name: "Kurta Sets",
    slug: "kurta",
    description:
      "Pure Chanderi and mulberry silk kurtas matched with premium soft silk trousers for daytime ceremonies and celebrations.",
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "c3",
    name: "Bandhgalas",
    slug: "bandhgala",
    description:
      "Architectural classic Jodhpuri Bandhgala jackets tailored in luxury high-density micro-velvets and raw silks.",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "c4",
    name: "Nehru Jackets / Bundis",
    slug: "nehru-jacket",
    description: "Vibrant Banarasi brocade Bundi waistcoats with handmade brass insignia buttons.",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "c5",
    name: "Luxury Accessories",
    slug: "accessories",
    description:
      "Bespoke leather mojaris, layered Basra pearl malas, and pure silk drapes to complete the noble wardrobe.",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
  },
];
