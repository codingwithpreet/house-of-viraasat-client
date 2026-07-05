export interface CategoryItem {
  id: string;
  name: string;
  imageUrl: string;
  path: string;
}

export const categories: CategoryItem[] = [
  {
    id: "cat1",
    name: "Sherwanis",
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    path: "/products?category=sherwani",
  },
  {
    id: "cat2",
    name: "Kurta Sets",
    imageUrl:
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=600",
    path: "/products?category=kurta",
  },
  {
    id: "cat3",
    name: "Bandhgalas",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    path: "/products?category=bandhgala",
  },
  {
    id: "cat4",
    name: "Indo Western",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600",
    path: "/products?category=indo-western",
  },
  {
    id: "cat5",
    name: "Nehru Jackets",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600", // Using high-res category placeholders
    path: "/products?category=nehru-jacket",
  },
  {
    id: "cat6",
    name: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=600",
    path: "/products?category=accessories",
  },
];
