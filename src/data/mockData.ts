/**
 * Mock Data for Development
 * This data is used for local development before connecting to Django API
 */

import type { Property, User, Favorite } from "@/services/api";

// Re-export types
export type { Property, User, Favorite } from "@/services/api";
// Mock User
export const mockUser: User = {
  id: "user-1",
  email: "user@example.com",
  full_name: "محمد أحمد",
  phone: "01012345678",
  avatar_url: "",
};

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: "prop-1",
    title: "شقة فاخرة في التجمع الخامس",
    title_ar: "شقة فاخرة في التجمع الخامس",
    location: "التجمع الخامس",
    address: "شارع 90، بجوار داون تاون مول",
    price: 2500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    floor: 5,
    furnished: true,
    usage_type: "residential",
    property_type: "apartment",
    listing_type: "sale",
    description: "شقة فاخرة بتشطيب سوبر لوكس، تطل على حديقة، قريبة من جميع الخدمات",
    contact: "01012345678",
    images: ["/placeholder.svg"],
    videos: [],
    status: "approved",
    views_count: 150,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "user-1",
  },
  {
    id: "prop-2",
    title: "فيلا في الشيخ زايد",
    location: "الشيخ زايد",
    address: "كمبوند بيفرلي هيلز",
    price: 8500000,
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    floor: 0,
    furnished: false,
    usage_type: "residential",
    property_type: "villa",
    listing_type: "sale",
    description: "فيلا مستقلة بحديقة خاصة وحمام سباحة",
    contact: "01012345678",
    images: ["/placeholder.svg"],
    videos: [],
    status: "pending",
    views_count: 85,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "user-1",
  },
  {
    id: "prop-3",
    title: "مكتب إداري في مدينة نصر",
    location: "مدينة نصر",
    address: "شارع مكرم عبيد",
    price: 15000,
    bedrooms: 0,
    bathrooms: 1,
    area: 120,
    floor: 8,
    furnished: true,
    usage_type: "administrative",
    property_type: "office",
    listing_type: "rent",
    description: "مكتب إداري مجهز بالكامل، موقع متميز",
    contact: "01012345678",
    images: ["/placeholder.svg"],
    videos: [],
    status: "rejected",
    rejection_reason: "الصور غير واضحة، يرجى إعادة رفع صور عالية الجودة",
    admin_notes: "الصور غير واضحة، يرجى إعادة رفع صور عالية الجودة",
    views_count: 45,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "user-1",
  },
];

// Mock Favorites
export const mockFavorites: Favorite[] = [
  {
    id: "fav-1",
    property_id: "prop-1",
    user_id: "user-1",
    property: mockProperties[0],
    created_at: new Date().toISOString(),
  },
];

// Helper to simulate API delay
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Local storage keys
const PROPERTIES_KEY = "mock_properties";
const FAVORITES_KEY = "mock_favorites";
const USER_KEY = "mock_user";

// Initialize mock data in localStorage
export const initMockData = () => {
  if (!localStorage.getItem(PROPERTIES_KEY)) {
    localStorage.setItem(PROPERTIES_KEY, JSON.stringify(mockProperties));
  }
  if (!localStorage.getItem(FAVORITES_KEY)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(mockFavorites));
  }
  if (!localStorage.getItem(USER_KEY)) {
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
  }
};

// Get properties from localStorage
export const getStoredProperties = (): Property[] => {
  const stored = localStorage.getItem(PROPERTIES_KEY);
  return stored ? JSON.parse(stored) : mockProperties;
};

// Alias for getMockProperties
export const getMockProperties = getStoredProperties;

// Save properties to localStorage
export const saveProperties = (properties: Property[]) => {
  localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));
};

// Get favorites from localStorage
export const getStoredFavorites = (): Favorite[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : mockFavorites;
};

// Save favorites to localStorage
export const saveFavorites = (favorites: Favorite[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

// Get user from localStorage
export const getStoredUser = (): User | null => {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

// Save user to localStorage
export const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
