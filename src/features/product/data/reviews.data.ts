export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  occasion?: string;
}

export interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: number;
}

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Arjun Mehta",
    location: "Mumbai, Maharashtra",
    rating: 5,
    date: "12 June 2025",
    title: "Beyond every expectation — a true work of art",
    body: "I wore this to my brother's wedding as the groom's brother and received more compliments than I could count. The zardosi work is absolutely breathtaking in person — photographs don't do it justice. The quality of the silk is superb; it drapes beautifully and feels weightless despite the heavy embroidery. The alteration session was smooth and professional. House of Viraasat has a customer for life.",
    verified: true,
    occasion: "Wedding",
  },
  {
    id: "r2",
    author: "Vikram Singhania",
    location: "Delhi, NCR",
    rating: 5,
    date: "3 May 2025",
    title: "Every rupee well spent — unmatched craftsmanship",
    body: "As a groom, I wanted something that would stand apart from the standard sherwanis available at mainstream stores. The Maharaja Zardosi Sherwani from House of Viraasat was exactly that. The moment it arrived in the heritage gift box, I knew this was special. The embroidery is impeccably even and the kundan buttons are genuinely beautiful pieces. Highly recommended for discerning grooms.",
    verified: true,
    occasion: "Wedding",
  },
  {
    id: "r3",
    author: "Rohan Kapoor",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    date: "18 March 2025",
    title: "Museum-quality embroidery, real luxury experience",
    body: "I've been to Lucknow's chikan market and seen artisan-grade work — this sherwani holds its own against the best. The packaging itself is a luxury experience. Customer service was extremely attentive and helped me select the correct sizing.",
    verified: true,
  },
  {
    id: "r4",
    author: "Pradeep Iyer",
    location: "Chennai, Tamil Nadu",
    rating: 4,
    date: "2 January 2025",
    title: "Exceptional quality — minor delivery delay",
    body: "The sherwani itself is absolutely stunning and I received enormous praise at my reception. My only minor note is the delivery was delayed by 2 days beyond the stated estimate, which caused some stress. However, the team kept me informed throughout and the final product is a masterpiece. Would recommend without hesitation.",
    verified: true,
    occasion: "Reception",
  },
];

export const ratingBreakdown: RatingBreakdown[] = [
  { stars: 5, count: 38, percentage: 90 },
  { stars: 4, count: 3, percentage: 7 },
  { stars: 3, count: 1, percentage: 3 },
  { stars: 2, count: 0, percentage: 0 },
  { stars: 1, count: 0, percentage: 0 },
];

export const overallRating = 4.9;
export const totalReviews = 42;
