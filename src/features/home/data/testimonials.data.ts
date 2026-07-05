export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Siddharth Malhotra",
    rating: 5,
    role: "Khandaan regular",
    review:
      "Absolutely breathtaking! The Zardosi work is incredibly dense and detailed. Truly felt like royalty on my wedding day. Fitting was spot on with their custom size suggestions.",
  },
  {
    id: "t2",
    name: "Ranveer Singh",
    rating: 5,
    role: "Heritage Elite",
    review:
      "Remarkable craftsmanship. The weight of the raw silk is perfect—heavy enough to look structured and royal, but lined with very breathable cotton mulmul inside.",
  },
  {
    id: "t3",
    name: "Aman Verma",
    rating: 5,
    role: "Khandaan regular",
    review:
      "The Banarasi brocade bundi has such a beautiful metallic sheen without being loud. The custom brass buttons look and feel exceptionally high-end.",
  },
];
