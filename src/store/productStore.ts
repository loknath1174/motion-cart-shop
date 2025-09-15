import { create } from 'zustand';
import { Product, ProductFilters } from '../types';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  isLoading: boolean;
  searchQuery: string;
}

interface ProductActions {
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  setSearchQuery: (query: string) => void;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  applyFilters: () => void;
}

type ProductStore = ProductState & ProductActions;

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with our flagship wireless headphones featuring active noise cancellation.',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    features: ['Active Noise Cancellation', '30-hour battery', 'Quick charge', 'Premium materials'],
    specifications: {
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '280g',
      'Connectivity': 'Bluetooth 5.0'
    }
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.',
    price: 249.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Wearables',
    rating: 4.6,
    reviews: 892,
    inStock: true,
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', 'Sleep Tracking'],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery Life': '7 days',
      'Water Rating': '5ATM',
      'Connectivity': 'Bluetooth, WiFi, GPS'
    }
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    description: 'Premium ergonomic chair designed for all-day comfort with adjustable lumbar support and breathable mesh.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    category: 'Furniture',
    rating: 4.9,
    reviews: 456,
    inStock: true,
    features: ['Ergonomic Design', 'Adjustable Lumbar', 'Breathable Mesh', '10-year Warranty'],
    specifications: {
      'Weight Capacity': '300 lbs',
      'Seat Height': '17-21 inches',
      'Materials': 'Mesh, Aluminum',
      'Warranty': '10 years'
    }
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    description: 'Ultra-sharp 85mm f/1.4 portrait lens perfect for professional photography and videography.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop',
    category: 'Photography',
    rating: 4.7,
    reviews: 234,
    inStock: false,
    features: ['f/1.4 Aperture', 'Weather Sealed', 'Ultra-Sharp', 'Professional Grade'],
    specifications: {
      'Focal Length': '85mm',
      'Aperture': 'f/1.4',
      'Weight': '950g',
      'Mount': 'Canon EF'
    }
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches for the ultimate gaming experience.',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
    category: 'Gaming',
    rating: 4.5,
    reviews: 678,
    inStock: true,
    features: ['Mechanical Switches', 'RGB Backlighting', 'Programmable Keys', 'Anti-Ghosting'],
    specifications: {
      'Switch Type': 'Cherry MX Blue',
      'Backlighting': 'RGB LED',
      'Layout': 'Full Size',
      'Connectivity': 'USB-C'
    }
  },
  {
    id: '6',
    name: 'Luxury Skincare Set',
    description: 'Complete skincare routine with premium ingredients for healthy, glowing skin.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    category: 'Beauty',
    rating: 4.4,
    reviews: 321,
    inStock: true,
    features: ['Natural Ingredients', 'Dermatologist Tested', 'Cruelty Free', 'All Skin Types'],
    specifications: {
      'Items Included': '4 products',
      'Skin Type': 'All types',
      'Volume': '50ml each',
      'Origin': 'Made in USA'
    }
  }
];

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  filters: {},
  isLoading: false,
  searchQuery: '',

  setProducts: (products: Product[]) => {
    set({ products, filteredProducts: products });
  },

  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },

  setFilters: (newFilters: Partial<ProductFilters>) => {
    const { filters } = get();
    set({ filters: { ...filters, ...newFilters } });
    get().applyFilters();
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    const { filters } = get();
    set({ filters: { ...filters, search: query } });
    get().applyFilters();
  },

  fetchProducts: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({ 
      products: mockProducts, 
      filteredProducts: mockProducts,
      isLoading: false 
    });
  },

  fetchProductById: async (id: string) => {
    const { products } = get();
    
    if (products.length === 0) {
      await get().fetchProducts();
    }
    
    const product = get().products.find(p => p.id === id);
    if (product) {
      set({ selectedProduct: product });
    }
    return product || null;
  },

  applyFilters: () => {
    const { products, filters } = get();
    
    let filtered = products;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice!);
    }

    if (filters.rating !== undefined) {
      filtered = filtered.filter(product => product.rating >= filters.rating!);
    }

    if (filters.inStock !== undefined) {
      filtered = filtered.filter(product => product.inStock === filters.inStock);
    }

    set({ filteredProducts: filtered });
  }
}));