import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, CreditCard, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  
  const provider = searchParams.get('provider') || 'stripe';
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    // Simulate payment processing
    const processPayment = async () => {
      setIsProcessing(true);
      
      // Simulate payment gateway redirect and processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate payment success (90% success rate)
      const success = Math.random() > 0.1;
      
      if (success) {
        setPaymentStatus('success');
        // Redirect to success page after a short delay
        setTimeout(() => {
          navigate(`/payment-success?orderId=${orderId}`);
        }, 2000);
      } else {
        setPaymentStatus('failed');
      }
      
      setIsProcessing(false);
    };

    processPayment();
  }, [orderId, navigate]);

  const retryPayment = () => {
    setPaymentStatus('processing');
    setIsProcessing(true);
    
    // Simulate retry
    setTimeout(() => {
      setPaymentStatus('success');
      setIsProcessing(false);
      setTimeout(() => {
        navigate(`/payment-success?orderId=${orderId}`);
      }, 2000);
    }, 2000);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-subtle py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-md">
        <motion.div
          className="bg-card border rounded-2xl shadow-xl p-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Provider Logo */}
          <div className="mb-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
              provider === 'stripe' ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              <span className="text-white font-bold text-2xl">
                {provider === 'stripe' ? 'S' : 'R'}
              </span>
            </div>
            <h2 className="text-2xl font-bold">
              {provider === 'stripe' ? 'Stripe' : 'Razorpay'} Payment
            </h2>
            <p className="text-muted-foreground mt-1">
              Order ID: {orderId}
            </p>
          </div>

          {/* Payment Status */}
          {paymentStatus === 'processing' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader className="w-12 h-12 animate-spin text-primary mx-auto" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
                <p className="text-muted-foreground">
                  Please wait while we process your payment securely...
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  🔒 This is a demo payment. No real charges will be made.
                </p>
              </div>
            </motion.div>
          )}

          {paymentStatus === 'success' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CheckCircle className="w-16 h-16 text-success mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-success mb-2">Payment Successful!</h3>
                <p className="text-muted-foreground">
                  Redirecting you to the confirmation page...
                </p>
              </div>
            </motion.div>
          )}

          {paymentStatus === 'failed' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CreditCard className="w-16 h-16 text-destructive mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-destructive mb-2">Payment Failed</h3>
                <p className="text-muted-foreground mb-4">
                  There was an issue processing your payment. Please try again.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={retryPayment}
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Retrying...' : 'Retry Payment'}
                  </Button>
                  <Button
                    onClick={() => navigate('/checkout')}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Back to Checkout
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-xs text-muted-foreground">
              🛡️ Your payment is secured with end-to-end encryption
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};