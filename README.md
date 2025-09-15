# EcomStore - Modern E-commerce Frontend

A beautiful, responsive e-commerce frontend built with React, Vite, TypeScript, Tailwind CSS, and advanced animations using GSAP and Framer Motion.

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse products with categories, filters, and search
- **Product Details**: Rich product pages with image galleries and specifications
- **Shopping Cart**: Persistent cart with localStorage, quantity management
- **Checkout Flow**: Complete checkout with shipping details and payment simulation
- **Order Management**: Order confirmation and success pages

### 🎨 User Interface & Design
- **Modern Design**: Clean, professional UI with beautiful gradients and shadows
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Automatic theme support via CSS variables
- **Animations**: Smooth page transitions (Framer Motion) and product animations (GSAP)
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### 🔐 Authentication
- **User Auth**: Login/signup with form validation
- **Demo Account**: Use `demo@example.com` / `password` for testing
- **Persistent Sessions**: Auth state preserved across browser sessions
- **Protected Routes**: Secure checkout and order pages

### 💳 Payment Integration
- **Multiple Providers**: Stripe and Razorpay payment simulation
- **Secure Flow**: End-to-end payment simulation with order confirmation
- **Order Tracking**: Mock order tracking and delivery estimates

### 🛠️ Technical Features
- **TypeScript**: Full type safety and IntelliSense
- **State Management**: Zustand for efficient global state
- **Persistence**: LocalStorage for cart and auth
- **Performance**: Lazy loading, optimized animations
- **SEO Optimized**: Meta tags, semantic HTML, structured data

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ecomstore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## 🏗️ Architecture

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, forms)
│   ├── ProductCard.tsx  # Product display component
│   ├── Header.tsx       # Navigation header
│   └── Layout.tsx       # Page layout wrapper
├── pages/               # Page components
│   ├── ProductListing.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Auth.tsx
│   ├── Checkout.tsx
│   ├── Payment.tsx
│   └── PaymentSuccess.tsx
├── store/               # Zustand stores
│   ├── authStore.ts     # Authentication state
│   ├── cartStore.ts     # Shopping cart state
│   └── productStore.ts  # Product catalog state
├── types/               # TypeScript type definitions
└── hooks/               # Custom React hooks
```

### Tech Stack

**Core Technologies:**
- **React 18**: Modern React with hooks and concurrent features
- **Vite**: Fast build tool and dev server
- **TypeScript**: Static typing and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework

**State Management:**
- **Zustand**: Lightweight state management with persistence
- **React Query**: Server state management and caching

**Animations:**
- **Framer Motion**: Declarative page transitions and animations
- **GSAP**: Advanced timeline animations for product interactions

**UI Components:**
- **Shadcn/ui**: Pre-built, accessible component library
- **Lucide React**: Beautiful icon library
- **Radix UI**: Unstyled, accessible UI primitives

## 🎯 Key Features Demo

### 1. Product Browsing
- Visit the homepage to see animated product cards
- Use category filters and search functionality
- Experience smooth hover animations and interactions

### 2. Product Details
- Click any product card for smooth page transition
- Explore image galleries and product specifications
- Add items to cart with flying animation effect

### 3. Shopping Cart
- View cart with persistent localStorage
- Update quantities and see real-time totals
- Experience smooth cart animations

### 4. Authentication
- Sign up for a new account or use demo credentials
- Forms include validation and loading states
- Auth state persists across browser sessions

### 5. Checkout Process
- Complete checkout form with validation
- Choose between Stripe or Razorpay simulation
- Experience payment flow and order confirmation

## 🧪 Testing

The project includes unit tests for core components and business logic:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**
- Component rendering and interactions
- Store logic and state management
- Form validation and error handling
- User workflows and edge cases

## 🎨 Design System

### Color Palette
- **Primary**: Purple/Blue gradient (`#8B5CF6` to `#6366F1`)
- **Secondary**: Gold accent (`#F59E0B`)
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Success, warning, and error colors

### Typography
- **Font Family**: Inter (Google Fonts)
- **Hierarchy**: Clear heading and body text scales
- **Accessibility**: Proper contrast ratios and readable sizes

### Animations
- **Page Transitions**: 400ms smooth slides and fades
- **Microinteractions**: Hover effects and button states
- **Product Animations**: GSAP staggered entrance and cart flies
- **Performance**: Respects `prefers-reduced-motion`

## 🔧 Customization

### Adding New Products
Products are stored in `src/store/productStore.ts`. Add items to the `mockProducts` array:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 99.99,
  originalPrice: 129.99, // optional
  image: 'image-url',
  category: 'Category',
  rating: 4.5,
  reviews: 100,
  inStock: true,
  features: ['Feature 1', 'Feature 2'], // optional
  specifications: { // optional
    'Spec Name': 'Spec Value'
  }
}
```

### Styling Components
Use the design system tokens defined in `src/index.css`:

```css
/* Use semantic tokens */
.my-component {
  @apply bg-primary text-primary-foreground;
  background: var(--gradient-primary);
  box-shadow: var(--shadow-glow);
}
```

### Adding Animations
Leverage Framer Motion for page transitions:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

## 🚀 Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy!

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Environment Variables
For production deployment, you might want to configure:
- `VITE_API_URL`: Backend API URL
- `VITE_STRIPE_PUBLIC_KEY`: Stripe public key
- `VITE_ANALYTICS_ID`: Analytics tracking ID

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash**: Product images
- **Lucide**: Beautiful icons
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **GSAP**: Professional animations
- **Shadcn/ui**: Component library

---

**Happy Shopping! 🛍️**

For questions or support, please open an issue on GitHub or contact the development team.