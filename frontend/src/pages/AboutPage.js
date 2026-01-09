import { Card } from '@/components/ui/card';
import { Users, Target, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden" data-testid="about-hero">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1678082309214-3b2941e387f8?crop=entropy&cs=srgb&fm=jpg&q=85)'
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-6 text-shadow">
            About Gaura Naturals
          </h1>
          <p className="text-xl text-white/90">
            A journey rooted in tradition, driven by sustainability
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6 text-center">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-6">
              Founded in October 2025 in Uttar Pradesh, India, Gaura Naturals Pvt Ltd was born from a powerful vision: 
              to transform natural waste into premium aromatic products while honoring our Vedic traditions. 
              We bridge the gap between ancient wisdom and modern environmental consciousness, creating sustainable 
              alternatives that protect health and the planet.
            </p>
            <p className="text-lg text-muted-foreground text-center">
              Every product tells a story of transformation - from recycled temple flowers and cow dung that once 
              served sacred rituals to handcrafted aromatics that purify your space. Each item carries the essence 
              of purity, devotion, and artisan craftsmanship, empowering village women artisans and reviving 
              Vedic practices in modern eco-luxury.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center">
              <Target className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground text-sm">
                To inspire a shift towards chemical-free alternatives, protecting health and the planet. 
                We create premium, eco-friendly aromatics while empowering rural artisans, supporting Vedic 
                rituals, balancing doshas, and purifying spaces through sustainable innovation.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <Award className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-3">Our Values</h3>
              <p className="text-muted-foreground text-sm">
                Purity, Tradition, Sustainability, and Innovation guide everything we do. We believe in 
                creating products that honor Vedic practices, protect health, nurture spiritual well-being, 
                and foster eco-luxury experiences that connect you with nature.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-3">Our Community</h3>
              <p className="text-muted-foreground text-sm">
                Working with over 200 village women artisans, we preserve traditional craftsmanship
                while providing sustainable livelihoods and economic independence.
              </p>
            </Card>
          </div>

          {/* Founders Section */}
          <div className="bg-muted/30 rounded-sm p-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-12 text-center">
              Our Leadership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <Card className="p-8">
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">Yash Aggarwal</h3>
                <p className="text-muted-foreground mb-4">Co-Founder & Director</p>
                <p className="text-sm text-muted-foreground">
                  With a vision to blend traditional practices with sustainable innovation,
                  Yash leads our mission to transform temple waste into premium aromatics while
                  creating economic opportunities for rural communities.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">Aparna Gupta</h3>
                <p className="text-muted-foreground mb-4">Co-Founder & Director</p>
                <p className="text-sm text-muted-foreground">
                  Aparna brings her passion for women's empowerment and sustainable development
                  to Gaura Naturals, ensuring that our products not only honor nature but also
                  uplift the artisan communities who craft them.
                </p>
              </Card>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-8">
              Get in Touch
            </h2>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-lg">
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:GAURANATURALSPVTLTD@GMAIL.COM" className="text-primary hover:underline">
                  GAURANATURALSPVTLTD@GMAIL.COM
                </a>
              </p>
              <p className="text-lg">
                <span className="font-semibold">Phone:</span>{' '}
                <a href="tel:+918860140036" className="text-primary hover:underline">
                  +91 8860140036
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;