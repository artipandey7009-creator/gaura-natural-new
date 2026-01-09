import { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const WishlistPage = () => {
  const { token } = useAuth();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${API}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${API}/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(wishlist.filter(item => item.id !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8" data-testid="wishlist-title">My Wishlist</h1>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : wishlist.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary/90">Browse Products</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <Card key={product.id} className="overflow-hidden" data-testid={`wishlist-item-${product.id}`}>
                <Link to={`/products/${product.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-xl font-serif font-semibold mb-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                  <p className="text-2xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-primary hover:bg-primary/90"
                      data-testid={`add-to-cart-${product.id}`}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemove(product.id)}
                      data-testid={`remove-wishlist-${product.id}`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;