// Configuration for the e-commerce platform
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://api.moderncart.com' 
    : 'http://localhost:3001',
  TIMEOUT: 10000,
  RETRIES: 3,
} as const;

export const APP_CONFIG = {
  APP_NAME: 'ModernCart',
  APP_VERSION: '1.0.0',
  COMPANY_NAME: 'ModernCart Inc.',
  SUPPORT_EMAIL: 'support@moderncart.com',
  CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',
  DEFAULT_LANGUAGE: 'en',
  ITEMS_PER_PAGE: 12,
  MAX_CART_ITEMS: 99,
} as const;

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  CATEGORIES: '/categories',
  SEARCH: '/search',
  WISHLIST: '/wishlist',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'moderncart_auth_token',
  USER_DATA: 'moderncart_user_data',
  CART_DATA: 'moderncart_cart_data',
  THEME: 'moderncart_theme',
  LANGUAGE: 'moderncart_language',
} as const;

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports & Outdoors',
  'Books',
  'Health & Beauty',
  'Toys & Games',
  'Automotive',
] as const;

export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export const PAYMENT_METHODS = {
  CARD: 'card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
} as const;
