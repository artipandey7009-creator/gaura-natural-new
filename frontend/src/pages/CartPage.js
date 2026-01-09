import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-8" data-testid="cart-title">Shopping Cart</h1>
          <Card className="p-12">
            <p className="text-muted-foreground mb-6">Your cart is empty</p>
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary/90">Continue Shopping</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8" data-testid="cart-title">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="p-6" data-testid={`cart-item-${item.id}`}>
                <div className="flex gap-6">
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <Link to={`/products/${item.id}`}>
                      <h3 className="text-xl font-serif font-semibold mb-2 hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-primary font-bold mb-4">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          data-testid={`decrease-quantity-${item.id}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center" data-testid={`quantity-${item.id}`}>{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          data-testid={`increase-quantity-${item.id}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive/80"
                        data-testid={`remove-item-${item.id}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold" data-testid="cart-subtotal">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary" data-testid="cart-total">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              {isAuthenticated ? (
                <Link to="/checkout">
                  <Button className="w-full bg-primary hover:bg-primary/90" data-testid="checkout-button">
                    Proceed to Checkout
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button className="w-full bg-primary hover:bg-primary/90" data-testid="login-to-checkout-button">
                    Login to Checkout
                  </Button>
                </Link>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;