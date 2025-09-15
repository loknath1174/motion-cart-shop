import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);
  
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    // Retrieve order data from session storage
    const storedOrderData = sessionStorage.getItem('orderData');
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    }
  }, []);

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <motion.div
      className="min-h-screen bg-gradient-subtle py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Success Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-success mb-2">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          className="bg-card border rounded-2xl shadow-lg p-8 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Order Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Number:</span>
                  <span className="font-mono font-semibold">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-semibold text-lg">
                    ${orderData?.amount?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className="text-success font-semibold">✓ Paid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Delivery:</span>
                  <span className="font-semibold">
                    {estimatedDelivery.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
              {orderData?.shippingAddress && (
                <div className="text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground">
                    {orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}
                  </p>
                  <p>{orderData.shippingAddress.address}</p>
                  <p>
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}
                  </p>
                  <p>{orderData.shippingAddress.country}</p>
                  <p className="pt-2">{orderData.customerEmail}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Order Items */}
        {orderData?.items && (
          <motion.div
            className="bg-card border rounded-2xl shadow-lg p-8 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Order Items</h2>
            <div className="space-y-4">
              {orderData.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        <motion.div
          className="bg-gradient-primary text-primary-foreground rounded-2xl p-8 text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">What happens next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm opacity-90">
            <div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                1
              </div>
              <p>We'll send you a confirmation email with tracking details</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                2
              </div>
              <p>Your items will be carefully packed and shipped within 24 hours</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                3
              </div>
              <p>Track your package and receive it within 3-5 business days</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => navigate('/')}
            variant="primary"
            size="lg"
            className="flex items-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={() => {
              // Mock order tracking
              alert(`Track your order ${orderId} at: https://tracking.example.com/${orderId}`);
            }}
            variant="outline"
            size="lg"
          >
            Track Order
          </Button>
        </motion.div>

        {/* Rating Prompt */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Star className="w-5 h-5" />
            <span>Love our service? We'd appreciate a 5-star review!</span>
            <Star className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};