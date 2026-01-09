import { Leaf, Recycle, Users, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SustainabilityPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden" data-testid="sustainability-hero">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1636101943361-4d8998149205?crop=entropy&cs=srgb&fm=jpg&q=85)'
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-6 text-shadow">
            Our Sustainability Mission
          </h1>
          <p className="text-xl text-white/90">
            Transforming waste into wonder, one aromatic at a time
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6 text-center">
              Transforming Waste into Premium Aromatics
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-8">
              Every day, temples across India discard tons of sacred flowers. At Gaura Naturals,
              we collect these blessed offerings and transform them - along with cow dung - into premium 
              aromatics. This gives them a second life while preserving their spiritual essence and 
              supporting village women artisans who handcraft each product using traditional methods.
            </p>
            <p className="text-lg text-muted-foreground text-center">
              Founded in October 2025 in Uttar Pradesh, we're pioneering the eco-luxury aromatics movement,
              reviving Vedic practices with modern sustainable innovation. Our charcoal-free, bamboo-less 
              products offer chemical-free alternatives that protect health, purify spaces, and balance doshas 
              while honoring ancient traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <Card className="p-8">
              <Recycle className="h-12 w-12 text-[#D5A147] mb-4" />
              <h3 className="text-2xl font-serif font-semibold mb-4 text-[#633014]">Circular Economy</h3>
              <p className="text-muted-foreground">
                We collect floral waste from temples and process it using traditional methods
                combined with modern sustainable practices. This circular approach reduces environmental
                impact while creating economic opportunities for local communities.
              </p>
            </Card>

            <Card className="p-8">
              <Leaf className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-2xl font-serif font-semibold mb-4">Natural Ingredients</h3>
              <p className="text-muted-foreground">
                Our products are made exclusively from natural ingredients including recycled temple flowers,
                cow dung, herbs, and essential oils. We're leading the charcoal-free incense movement with 
                bamboo-less sticks and dhoop cones. No chemicals, no artificial fragrances - just pure, 
                natural aromatics that honor both nature and Vedic tradition.
              </p>
            </Card>

            <Card className="p-8">
              <Users className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-2xl font-serif font-semibold mb-4">Empowering Artisans</h3>
              <p className="text-muted-foreground">
                Every product is handcrafted by skilled village women artisans. By choosing our products,
                you support fair wages, traditional craftsmanship, and the economic independence of
                rural communities across India.
              </p>
            </Card>

            <Card className="p-8">
              <Heart className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-2xl font-serif font-semibold mb-4">Social Impact</h3>
              <p className="text-muted-foreground">
                Beyond environmental benefits, our initiative creates sustainable livelihoods,
                preserves traditional knowledge, and builds stronger communities. Each purchase
                contributes to education, healthcare, and skill development programs.
              </p>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="bg-primary text-white rounded-sm p-12 text-center">
            <h2 className="text-4xl font-serif font-bold mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-5xl font-bold mb-2">500+</p>
                <p className="text-lg">Tons of Floral Waste Recycled</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">200+</p>
                <p className="text-lg">Women Artisans Employed</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">50+</p>
                <p className="text-lg">Villages Supported</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityPage;