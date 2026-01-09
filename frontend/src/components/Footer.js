import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email });
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-secondary text-white mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Gaura Naturals</h3>
            <p className="text-sm text-white/80 mb-4">
              Transforming floral waste and natural ingredients into premium aromatics.
              A journey of spirituality, sustainability, and tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-white/80 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-sm text-white/80 hover:text-primary transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-white/80 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Stay Connected</h4>
            <div className="space-y-3 mb-6">
              <a href="mailto:GAURANATURALSPVTLTD@GMAIL.COM" className="flex items-center text-sm text-white/80 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                GAURANATURALSPVTLTD@GMAIL.COM
              </a>
              <a href="tel:+918860140036" className="flex items-center text-sm text-white/80 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                +91 8860140036
              </a>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2" data-testid="newsletter-form">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                data-testid="newsletter-email-input"
              />
              <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90" data-testid="newsletter-submit-button">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Gaura Naturals Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;