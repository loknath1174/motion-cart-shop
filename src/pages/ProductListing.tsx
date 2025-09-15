import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/productStore";
import { Filter, Grid, List } from "lucide-react";

export const ProductListing = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { 
    filteredProducts, 
    isLoading, 
    fetchProducts, 
    setFilters, 
    filters 
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = ['All', 'Electronics', 'Wearables', 'Furniture', 'Photography', 'Gaming', 'Beauty'];
  
  const handleCategoryFilter = (category: string) => {
    setFilters({ category: category === 'All' ? undefined : category });
  };

  const handlePriceFilter = (minPrice?: number, maxPrice?: number) => {
    setFilters({ minPrice, maxPrice });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section
        className="text-center py-16 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-gradient mb-6">
          Premium Products, Delivered
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover our curated collection of high-quality products with seamless shopping experience
        </p>
        <Button variant="hero" size="xl" className="animate-float">
          Shop Now
        </Button>
      </motion.section>

      {/* Filters and View Options */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filters.category === category || (category === 'All' && !filters.category) ? "primary" : "outline"}
              size="sm"
              onClick={() => handleCategoryFilter(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* View Options */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? "primary" : "ghost"}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "primary" : "ghost"}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <motion.div
          className="bg-card p-6 rounded-lg border mb-8"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <h3 className="font-semibold mb-4">Price Range</h3>
          <div className="flex gap-4 items-center">
            <Button
              variant={!filters.minPrice && !filters.maxPrice ? "primary" : "outline"}
              size="sm"
              onClick={() => handlePriceFilter(undefined, undefined)}
            >
              All Prices
            </Button>
            <Button
              variant={filters.minPrice === 0 && filters.maxPrice === 100 ? "primary" : "outline"}
              size="sm"
              onClick={() => handlePriceFilter(0, 100)}
            >
              Under $100
            </Button>
            <Button
              variant={filters.minPrice === 100 && filters.maxPrice === 500 ? "primary" : "outline"}
              size="sm"
              onClick={() => handlePriceFilter(100, 500)}
            >
              $100 - $500
            </Button>
            <Button
              variant={filters.minPrice === 500 ? "primary" : "outline"}
              size="sm"
              onClick={() => handlePriceFilter(500, undefined)}
            >
              $500+
            </Button>
          </div>
        </motion.div>
      )}

      {/* Products Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {filteredProducts.length} Products
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <motion.section
        className="bg-gradient-primary text-primary-foreground rounded-2xl p-8 text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
        <p className="mb-6 opacity-90">Get notified about new products and exclusive deals</p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg text-foreground"
          />
          <Button variant="secondary" size="lg">
            Subscribe
          </Button>
        </div>
      </motion.section>
    </div>
  );
};