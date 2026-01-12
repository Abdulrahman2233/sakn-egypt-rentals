/**
 * API Service Layer
 * Ready to connect with Django REST API
 * Replace BASE_URL with your Django API URL
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Types
export interface Property {
  id: string;
  title: string;
  title_ar?: string;
  location: string;
  location_ar?: string;
  address?: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  floor?: number;
  furnished?: boolean;
  usage_type?: string;
  property_type: string;
  listing_type: string;
  description?: string;
  description_ar?: string;
  contact?: string;
  images?: string[];
  videos?: string[];
  status: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  admin_notes?: string;
  views_count?: number;
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  address?: string;
  city?: string;
  country?: string;
  bio?: string;
  job_title?: string;
  company?: string;
  website?: string;
  birth_date?: string;
}

export interface Favorite {
  id: string;
  property_id: string;
  user_id: string;
  property?: Property;
  created_at: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Helper function to make API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem("auth_token");
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        data: null,
        error: errorData.message || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || "Network error" };
  }
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    return apiRequest<{ user: User; token: string }>("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  signup: async (data: {
    email: string;
    password: string;
    full_name?: string;
    phone?: string;
  }) => {
    return apiRequest<{ user: User; token: string }>("/auth/signup/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout: async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    return { data: true, error: null };
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("auth_token");
  },
};

// Properties API
export const propertiesApi = {
  getAll: async (filters?: { status?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.search) params.append("search", filters.search);
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiRequest<Property[]>(`/properties/${query}`);
  },

  getMyProperties: async () => {
    return apiRequest<Property[]>("/properties/my/");
  },

  getById: async (id: string) => {
    return apiRequest<Property>(`/properties/${id}/`);
  },

  create: async (data: Partial<Property>) => {
    return apiRequest<Property>("/properties/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<Property>) => {
    return apiRequest<Property>(`/properties/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest<void>(`/properties/${id}/`, {
      method: "DELETE",
    });
  },
};

// Favorites API
export const favoritesApi = {
  getAll: async () => {
    return apiRequest<Favorite[]>("/favorites/");
  },

  add: async (propertyId: string) => {
    return apiRequest<Favorite>("/favorites/", {
      method: "POST",
      body: JSON.stringify({ property_id: propertyId }),
    });
  },

  remove: async (id: string) => {
    return apiRequest<void>(`/favorites/${id}/`, {
      method: "DELETE",
    });
  },
};

// Profile API
export const profileApi = {
  get: async () => {
    return apiRequest<User>("/profile/");
  },

  update: async (data: Partial<User>) => {
    return apiRequest<User>("/profile/", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};

// Upload API (for images/videos)
export const uploadApi = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const token = localStorage.getItem("auth_token");
    
    try {
      const response = await fetch(`${BASE_URL}/upload/image/`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      
      const data = await response.json();
      return { data: data.url, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  uploadVideo: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const token = localStorage.getItem("auth_token");
    
    try {
      const response = await fetch(`${BASE_URL}/upload/video/`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      
      const data = await response.json();
      return { data: data.url, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },
};
