import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, getItemQuantity } = useCartStore();
  const itemQuantity = getItemQuantity(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product.id, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast.success(`${product.name} added to wishlist!`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card group cursor-pointer"
    >
      <Link to={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Sale Badge */}
          {product.isOnSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Sale
            </div>
          )}

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToWishlist}
            className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          >
            <Heart className="w-5 h-5" />
          </motion.button>

          {/* Quick Add to Cart */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="absolute bottom-3 left-3 right-3 bg-primary-600 text-white py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {itemQuantity > 0 ? `Add More (${itemQuantity})` : 'Add to Cart'}
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.isOnSale && (
              <span className="text-sm text-green-600 font-medium">
                Save ${(product.originalPrice! - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between">
            <span className={`text-sm ${
              product.stock > 0 
                ? product.stock > 10 
                  ? 'text-green-600' 
                  : 'text-orange-600'
                : 'text-red-600'
            }`}>
              {product.stock > 0 
                ? product.stock > 10 
                  ? 'In Stock' 
                  : `Only ${product.stock} left`
                : 'Out of Stock'
              }
            </span>
            
            {/* Category Tag */}
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
