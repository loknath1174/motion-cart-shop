import { motion } from "framer-motion";
import { Product } from "@/types";
import { Button } from "./ui/button";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (cardRef.current) {
      // GSAP entrance animation with stagger
      gsap.fromTo(cardRef.current, 
        { 
          y: 50, 
          opacity: 0, 
          scale: 0.9 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [index]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!product.inStock) return;

    addItem(product);
    
    // GSAP fly-to-cart animation
    if (imageRef.current) {
      const imageClone = imageRef.current.cloneNode(true) as HTMLImageElement;
      imageClone.style.position = 'fixed';
      imageClone.style.zIndex = '9999';
      imageClone.style.width = '50px';
      imageClone.style.height = '50px';
      imageClone.style.borderRadius = '50%';
      imageClone.style.pointerEvents = 'none';
      
      const rect = imageRef.current.getBoundingClientRect();
      imageClone.style.left = `${rect.left}px`;
      imageClone.style.top = `${rect.top}px`;
      
      document.body.appendChild(imageClone);
      
      // Animate to cart icon (top right)
      gsap.to(imageClone, {
        x: window.innerWidth - 100,
        y: -rect.top + 20,
        scale: 0.3,
        rotation: 360,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          document.body.removeChild(imageClone);
        }
      });
    }

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      ref={cardRef}
      className="product-card group cursor-pointer"
      onClick={handleViewDetails}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="product-card-image relative">
        <img
          ref={imageRef}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-secondary text-secondary-foreground px-2 py-1 rounded-lg text-sm font-bold">
            {discountPercentage}% OFF
          </div>
        )}
        
        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
        
        {/* Quick View Button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 text-primary hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-secondary text-secondary"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
        
        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};