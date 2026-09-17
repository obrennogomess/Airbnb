export interface HostInfo {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  yearsHosting: number;
  reviewCount: number;
  rating: number;
  responseRate: string;
  responseTime: string;
  about: string;
  coHosts?: {
    name: string;
    avatar: string;
    role: string;
  }[];
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  iconName: string;
  description?: string;
  available: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  location: string;
  date: string;
  rating: number;
  comment: string;
  yearsOnAirbnb?: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface BedroomInfo {
  title: string;
  description: string;
  beds: { type: string; count: number }[];
}

export interface ListingData {
  id: string;
  title: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  propertyType: string;
  roomType: string;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: string;
  isGuestFavorite: boolean;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFeePercent: number;
  description: string;
  theSpace: string;
  guestAccess: string;
  otherNotes: string;
  host: HostInfo;
  bedroomsInfo: BedroomInfo[];
  photos: PhotoItem[];
  amenities: Amenity[];
  reviews: ReviewItem[];
  ratingsBreakdown: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
  houseRules: {
    checkIn: string;
    checkOut: string;
    rules: string[];
    safety: string[];
    cancellation: string;
  };
}

export interface ReservationParams {
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults: number;
  children: number;
  infants: number;
  pets: number;
}
