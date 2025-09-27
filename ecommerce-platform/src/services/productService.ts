import { Product, Category, SearchFilters, ApiResponse } from '../types';

// Mock product data with high-quality images
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience premium sound quality with these state-of-the-art wireless headphones featuring active noise cancellation and 30-hour battery life.',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
    ],
    category: 'Electronics',
    stock: 25,
    rating: 4.8,
    reviewCount: 124,
    tags: ['wireless', 'noise-cancelling', 'premium', 'bluetooth'],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz'
    },
    isOnSale: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking smartwatch with heart rate monitoring, GPS, and comprehensive health insights.',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80'
    ],
    category: 'Electronics',
    stock: 15,
    rating: 4.6,
    reviewCount: 89,
    tags: ['fitness', 'smartwatch', 'health', 'gps'],
    specifications: {
      'Battery Life': '7 days',
      'Water Resistance': '50m',
      'Display': '1.4" AMOLED',
      'GPS': 'Built-in'
    },
    isOnSale: false,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z'
  },
  {
    id: '3',
    name: 'Professional Camera Lens',
    description: 'Professional-grade 85mm portrait lens with exceptional optical quality and beautiful bokeh effects.',
    price: 1299.99,
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80'
    ],
    category: 'Electronics',
    stock: 8,
    rating: 4.9,
    reviewCount: 45,
    tags: ['camera', 'lens', 'professional', 'portrait'],
    specifications: {
      'Focal Length': '85mm',
      'Max Aperture': 'f/1.4',
      'Mount': 'Canon EF',
      'Weight': '950g'
    },
    isOnSale: false,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-17T00:00:00Z'
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Premium ergonomic office chair designed for all-day comfort with lumbar support and adjustable features.',
    price: 459.99,
    originalPrice: 599.99,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&q=80'
    ],
    category: 'Furniture',
    stock: 12,
    rating: 4.7,
    reviewCount: 156,
    tags: ['office', 'ergonomic', 'furniture', 'comfort'],
    specifications: {
      'Material': 'Mesh & Fabric',
      'Weight Capacity': '150kg',
      'Adjustability': 'Height, Armrests, Lumbar',
      'Warranty': '5 years'
    },
    isOnSale: true,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z'
  },
  {
    id: '5',
    name: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with touch controls, adjustable brightness, and sleek minimalist design.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'
    ],
    category: 'Home & Garden',
    stock: 20,
    rating: 4.4,
    reviewCount: 67,
    tags: ['lamp', 'led', 'minimalist', 'desk'],
    specifications: {
      'Light Source': 'LED',
      'Color Temperature': '3000K-6500K',
      'Power': '12W',
      'Dimming': 'Touch Control'
    },
    isOnSale: false,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-19T00:00:00Z'
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0cce2769fa2?w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80'
    ],
    category: 'Electronics',
    stock: 35,
    rating: 4.3,
    reviewCount: 203,
    tags: ['wireless', 'charging', 'qi', 'fast-charge'],
    specifications: {
      'Output': '15W Fast Charging',
      'Compatibility': 'Qi-enabled devices',
      'Indicator': 'LED',
      'Dimensions': '100 x 100 x 8mm'
    },
    isOnSale: false,
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest electronics and gadgets',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&q=80',
    productCount: 156
  },
  {
    id: '2',
    name: 'Furniture',
    slug: 'furniture',
    description: 'Modern furniture for home and office',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
    productCount: 89
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    productCount: 134
  },
  {
    id: '4',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel for all occasions',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80',
    productCount: 245
  }
];

class ProductService {
  async getProducts(filters?: SearchFilters): Promise<ApiResponse<Product[]>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredProducts = [...mockProducts];

    if (filters) {
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => 
          p.category.toLowerCase() === filters.category?.toLowerCase()
        );
      }

      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
      }

      if (filters.rating) {
        filteredProducts = filteredProducts.filter(p => p.rating >= filters.rating!);
      }

      if (filters.inStock) {
        filteredProducts = filteredProducts.filter(p => p.stock > 0);
      }

      if (filters.tags && filters.tags.length > 0) {
        filteredProducts = filteredProducts.filter(p =>
          filters.tags!.some(tag => p.tags.includes(tag))
        );
      }

      // Sorting
      switch (filters.sortBy) {
        case 'price_asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        default:
          // relevance - keep original order
          break;
      }
    }

    return {
      data: filteredProducts,
      message: 'Products retrieved successfully',
      status: 'success',
      pagination: {
        page: 1,
        limit: filteredProducts.length,
        total: filteredProducts.length,
        hasNext: false,
        hasPrev: false
      }
    };
  }

  async getProduct(id: string): Promise<ApiResponse<Product | null>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const product = mockProducts.find(p => p.id === id);

    return {
      data: product || null,
      message: product ? 'Product found' : 'Product not found',
      status: product ? 'success' : 'error'
    };
  }

  async getCategories(): Promise<ApiResponse<Category[]>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    return {
      data: mockCategories,
      message: 'Categories retrieved successfully',
      status: 'success'
    };
  }

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const searchResults = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    return {
      data: searchResults,
      message: `Found ${searchResults.length} products`,
      status: 'success'
    };
  }
}

export const productService = new ProductService();
