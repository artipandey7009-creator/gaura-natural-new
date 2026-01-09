import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order
      const orderItems = cart.map(item => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const orderResponse = await axios.post(
        `${API}/orders`,
        {
          items: orderItems,
          shipping_address: shippingData
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderId = orderResponse.data.id;

      // Create checkout session
      const checkoutResponse = await axios.post(
        `${API}/checkout/create-session`,
        {
          order_id: orderId,
          host_url: window.location.origin
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe
      window.location.href = checkoutResponse.data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process checkout');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8" data-testid="checkout-title">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-semibold mb-6">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="checkout-form">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={shippingData.address}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    data-testid="address-input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingData.city}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      data-testid="city-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingData.state}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      data-testid="state-input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      value={shippingData.zip}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      data-testid="zip-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={shippingData.country}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      data-testid="country-input"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 mt-6"
                  data-testid="proceed-payment-button"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-serif font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary" data-testid="checkout-total">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;