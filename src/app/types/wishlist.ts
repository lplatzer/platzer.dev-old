export interface WishlistItem {
  id: string; // UUID
  title: string;
  description: string;
  productUrl: string; // Original product page URL
  geizhalsUrl?: string; // Optional Geizhals comparison URL
  idealoUrl?: string; // Optional Idealo comparison URL
  imageUrl?: string; // Optional product image URL
  isGifted: boolean; // Default false - tracks if item has been gifted
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface WishlistData {
  items: WishlistItem[];
}
