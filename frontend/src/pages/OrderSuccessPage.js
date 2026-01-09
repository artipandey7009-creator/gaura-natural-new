import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { token } = useAuth();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('checking');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (sessionId) {
      checkPaymentStatus();
    }
  }, [sessionId]);

  const checkPaymentStatus = async () => {
    const maxAttempts = 5;
    const pollInterval = 2000;

    if (attempts >= maxAttempts) {
      setStatus('timeout');
      return;
    }

    try {
      const response = await axios.get(`${API}/checkout/status/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.payment_status === 'paid') {
        setStatus('success');
        clearCart();
        toast.success('Payment successful!');
      } else if (response.data.status === 'expired') {
        setStatus('expired');
      } else {
        setStatus('pending');
        setAttempts(prev => prev + 1);
        setTimeout(checkPaymentStatus, pollInterval);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <Card className="p-12 text-center">
          {status === 'checking' || status === 'pending' ? (
            <div data-testid="payment-checking">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
                Processing Your Payment
              </h1>
              <p className="text-muted-foreground">
                Please wait while we confirm your payment...
              </p>
            </div>
          ) : status === 'success' ? (
            <div data-testid="payment-success">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-muted-foreground mb-8">
                Thank you for your purchase. Your order has been confirmed and will be processed shortly.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90" data-testid="view-orders-button">
                    View My Orders
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" data-testid="continue-shopping-button">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div data-testid="payment-error">
              <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
                Payment Status Unavailable
              </h1>
              <p className="text-muted-foreground mb-8">
                We're unable to confirm your payment status right now. Please check your email for confirmation or contact support.
              </p>
              <Link to="/dashboard">
                <Button className="bg-primary hover:bg-primary/90">
                  Check My Orders
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccessPage;