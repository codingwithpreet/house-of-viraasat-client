export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export const mockAddresses: Address[] = [
  {
    id: "addr1",
    label: "Home",
    fullName: "Arjun Mehta",
    phone: "+91 98765 43210",
    line1: "Flat 12B, Prestige Towers",
    line2: "Linking Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    country: "India",
    isDefault: true,
  },
  {
    id: "addr2",
    label: "Office",
    fullName: "Arjun Mehta",
    phone: "+91 98765 43210",
    line1: "Suite 402, Maker Chambers IV",
    line2: "Nariman Point",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400021",
    country: "India",
    isDefault: false,
  },
];
