import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Star, Shield, Truck, CreditCard } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Index = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP entrance animations
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power2.out"
        }
      );
    }

    if (featuresRef.current) {
      gsap.fromTo(featuresRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.5,
          ease: "power2.out"
        }
      );
    }
  }, []);

  const handleShopNow = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-primary-foreground">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div ref={heroRef} className="text-center max-w-4xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Premium Quality Products</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gradient-light">
              Shop with Style & 
              <span className="block text-accent">Confidence</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Discover our curated collection of premium products with seamless shopping experience and unmatched quality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleShopNow}
                className="bg-white text-primary hover:bg-white/90 shadow-elegant animate-float group"
              >
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Shop Now
              </Button>
              
              <Button
                variant="ghost"
                size="xl"
                className="text-primary-foreground border-white/30 hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float-delayed" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full animate-float" />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/10 rounded-lg rotate-45 animate-float-delayed" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide exceptional service and quality that exceeds expectations
            </p>
          </motion.div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Shopping",
                description: "Your data is protected with enterprise-grade security"
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Free shipping on orders over $50 with express options"
              },
              {
                icon: CreditCard,
                title: "Easy Payments",
                description: "Multiple payment options including buy now, pay later"
              },
              {
                icon: Star,
                title: "Premium Quality",
                description: "Carefully curated products from trusted brands"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 group cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers and discover your next favorite product today.
            </p>
            <Button
              variant="secondary"
              size="xl"
              onClick={handleShopNow}
              className="bg-white text-primary hover:bg-white/90 shadow-elegant group"
            >
              <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Explore Products
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;