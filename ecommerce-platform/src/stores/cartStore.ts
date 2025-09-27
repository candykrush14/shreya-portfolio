import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartStore, Product, ProductVariant } from '@types/index';
import { STORAGE_KEYS } from '@config/constants';

// Mock products data for demonstration
const mockProducts: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    originalPrice: 399.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    category: 'Electronics',
    stock: 25,
    rating: 4.8,
    reviewCount: 124,
    tags: ['wireless', 'noise-cancelling', 'premium'],
    specifications: { 'Battery Life': '30 hours', 'Connectivity': 'Bluetooth 5.0' },
    isOnSale: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  '2': {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring',
    price: 199.99,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
    category: 'Electronics',
    stock: 15,
    rating: 4.6,
    reviewCount: 89,
    tags: ['fitness', 'smartwatch', 'health'],
    specifications: { 'Battery Life': '7 days', 'Water Resistance': '50m' },
    isOnSale: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (productId: string, quantity = 1, variant?: ProductVariant) => {
        const { items } = get();
        const existingItem = items.find(item => 
          item.productId === productId && 
          (!variant || item.selectedVariant?.id === variant.id)
        );

        if (existingItem) {
          get().updateQuantity(productId, existingItem.quantity + quantity);
        } else {
          const newItem: CartItem = {
            productId,
            quantity,
            selectedVariant: variant
          };
          
          set(state => {
            const newItems = [...state.items, newItem];
            return {
              items: newItems,
              ...calculateTotals(newItems)
            };
          });
        }
      },

      removeItem: (productId: string) => {
        set(state => {
          const newItems = state.items.filter(item => item.productId !== productId);
          return {
            items: newItems,
            ...calculateTotals(newItems)
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set(state => {
          const newItems = state.items.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          );
          return {
            items: newItems,
            ...calculateTotals(newItems)
          };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },

      getItemQuantity: (productId: string) => {
        const item = get().items.find(item => item.productId === productId);
        return item?.quantity || 0;
      },
    }),
    {
      name: STORAGE_KEYS.CART_DATA,
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
      }),
    }
  )
);

function calculateTotals(items: CartItem[]) {
  const total = items.reduce((sum, item) => {
    const product = mockProducts[item.productId];
    if (!product) return sum;
    
    const itemPrice = item.selectedVariant?.price || product.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { total: Math.round(total * 100) / 100, itemCount };
}
