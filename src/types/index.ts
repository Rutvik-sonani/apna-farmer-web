// Common types used across the application

export interface AuthData {
    _id?: string;
    mobile?: string;
    name?: string;
    email?: string;
    token?: string;
    firstName?: string;
    lastName?: string;
    userType?: string;
    avatar?: string;
    whatsappNumber?: string;
    city?: string;
    // Add other auth-related fields as needed
}

export interface LatLog {
    latitude?: number;
    longitude?: number;
}

export interface Category {
    _id: string;
    name: string;
    image?: string;
    // Add other category fields
}

export interface Crop {
    _id: string;
    name?: string;
    cropNames?: Array<{ name: string }>;
    category?: string;
    price?: number;
    rate?: number;
    rateType?: string;
    quantity?: number;
    qut?: number;
    qutAvailable?: string;
    unit?: string;
    quality?: string;
    description?: string;
    images?: string[];
    imagesUrl?: string[];
    farmerId?: string;
    farmerName?: string;
    user?: {
        firstName?: string;
        lastName?: string;
        mobile?: string;
        address?: string;
    };
    location?: string;
    city?: string;
    district?: string;
    isFavorite?: boolean;
}

export interface Farmer {
    _id: string;
    name: string;
    mobile?: string;
    location?: string;
    crops?: Crop[];
}

export interface Buyer {
    _id: string;
    name?: string;
    user?: {
        firstName?: string;
        lastName?: string;
        companyName?: string;
        mobile?: string;
    };
    mobile?: string;
    location?: string;
    city?: string;
    district?: string;
    state?: string;
    requirements?: string[];
    cropCategories?: Array<{ name: string }>;
    isFavorite?: boolean;
}

export interface AgroShopItem {
    _id: string;
    shopName: string;
    ownerName?: string;
    shopType?: string[];
    city?: string;
    district?: string;
    address?: string;
    mobile?: string;
    image?: string;
    rating?: number;
    name?: string;
    category?: string;
    price?: number;
    description?: string;
}

export interface CommunityPost {
    _id: string;
    userId: string;
    userName?: string;
    userImg?: string;
    content?: string;
    description?: string;
    images?: string[];
    media?: Array<{ url: string }>;
    likes?: number;
    likeCount?: number;
    commentCount?: number;
    comments?: Comment[];
    createdAt?: string;
    timeAgo?: string;
}

export interface Comment {
    _id: string;
    userId: string;
    userName?: string;
    content: string;
    createdAt?: string;
}

export interface Profile {
    _id: string;
    name: string;
    mobile: string;
    email?: string;
    location?: string;
    farmSize?: string;
    crops?: string[];
    // Add other profile fields
}

export interface ApiResponse<T = unknown> {
    statusCode: number;
    message: string;
    data?: T;
}

export interface ApiError {
    message: string;
    statusCode?: number;
}
