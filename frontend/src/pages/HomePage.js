import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${API}/products`),
        axios.get(`${API}/categories`)
      ]);
      setProducts(productsRes.data.slice(0, 6));
      setCategories(categoriesRes.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1426244434402-9d59aceabbf3?crop=entropy&cs=srgb&fm=jpg&q=85)',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 text-shadow" data-testid="hero-title">
            Touch of Nature
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Handcrafted eco-friendly aromatics from recycled flowers and cow dung.
            Experience purity, spirituality, and the essence of Vedic tradition.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg" data-testid="hero-shop-button">
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4" data-testid="categories-title">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handcrafted aromatics, each telling a story of sustainability and tradition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link to={`/products?category=${category}`} key={index}>
                <Card className="group relative overflow-hidden border-border hover:border-primary/50 transition-all duration-500 h-64" data-testid={`category-card-${index}`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl font-serif font-bold text-white z-10">{category}</h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
              Featured Products
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <Card className="product-card-hover group bg-white border-border hover:border-primary/50 transition-all duration-500 overflow-hidden" data-testid={`product-card-${product.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-2">
                      {product.labels?.map((label, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                          {label}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-serif font-semibold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                      <Button variant="ghost" className="text-primary hover:text-primary/80">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-[#D5A147]/20 hover:border-[#D5A147] transition-all duration-500 hover:shadow-[0_8px_24px_rgba(213,161,71,0.15)]">
              <Leaf className="h-12 w-12 text-[#D5A147] mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-2 text-[#633014]">Eco-Friendly</h3>
              <p className="text-muted-foreground text-sm">
                Made from recycled temple flowers and cow dung, supporting environmental sustainability.
              </p>
            </Card>
            <Card className="p-8 text-center border-[#D5A147]/20 hover:border-[#D5A147] transition-all duration-500 hover:shadow-[0_8px_24px_rgba(213,161,71,0.15)]">
              <Sparkles className="h-12 w-12 text-[#D5A147] mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-2 text-[#633014]">Handcrafted</h3>
              <p className="text-muted-foreground text-sm">
                Lovingly crafted by village women artisans, preserving traditional methods.
              </p>
            </Card>
            <Card className="p-8 text-center border-[#D5A147]/20 hover:border-[#D5A147] transition-all duration-500 hover:shadow-[0_8px_24px_rgba(213,161,71,0.15)]">
              <Heart className="h-12 w-12 text-[#D5A147] mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-2 text-[#633014]">Pure & Natural</h3>
              <p className="text-muted-foreground text-sm">
                Free from harmful chemicals, bringing the purest essence of nature to your space.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
            Experience the Essence of Tradition
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join us in our mission to transform nature's gifts into premium aromatics while supporting local artisans.
          </p>
          <Link to="/sustainability">
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
              Learn Our Story
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;