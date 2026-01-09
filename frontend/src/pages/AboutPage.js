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

          {/* Mission Statement - Highlighted */}
          <div className="bg-gradient-to-r from-[#D5A147] to-[#C39138] rounded-sm p-12 mb-16 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
              To revive Vedic practices using recycled temple flowers and cow dung to create sustainable 
              eco-luxury products. We transform natural waste into premium aromatics while empowering village 
              women artisans, protecting health, and preserving ancient traditions for modern living.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center">
              <Target className="h-12 w-12 text-[#D5A147] mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-3 text-[#633014]">Our Mission</h3>
              <p className="text-muted-foreground text-sm">
                To inspire a shift towards chemical-free alternatives, protecting health and the planet. 
                We create premium, eco-friendly aromatics while empowering rural artisans, supporting Vedic 
                rituals, balancing doshas, and purifying spaces through sustainable innovation.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <Award className="h-12 w-12 text-[#D5A147] mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-3 text-[#633014]">Our Values</h3>
              <p className="text-muted-foreground text-sm">
                Purity, Tradition, Sustainability, and Innovation guide everything we do. We believe in 
                creating products that honor Vedic practices, protect health, nurture spiritual well-being, 
                and foster eco-luxury experiences that connect you with nature.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <Users className="h-12 w-12 text-[#D5A147] mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold mb-3 text-[#633014]">Our Community</h3>
              <p className="text-muted-foreground text-sm">
                Working with over 200 village women artisans, we preserve traditional craftsmanship
                while providing sustainable livelihoods and economic independence.
              </p>
            </Card>
          </div>

          {/* Founders Section */}
          <div className="bg-muted/30 rounded-sm p-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4 text-center">
              Meet Our Directors
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Led by visionary leaders dedicated to transforming natural waste into premium aromatics 
              while empowering rural communities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <Card className="p-8 border-[#D5A147]/20 hover:border-[#D5A147] transition-all duration-500 hover:shadow-[0_12px_28px_rgba(213,161,71,0.15)]">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D5A147] to-[#C39138] flex items-center justify-center mb-4">
                    <span className="text-4xl font-serif font-bold text-white">YA</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#633014] mb-2">Yash Aggarwal</h3>
                  <p className="text-[#D5A147] font-semibold text-lg mb-4">Founder & Director</p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Founder and Director of Gaura Naturals, Yash Aggarwal pioneered the vision of transforming 
                    natural waste into premium aromatic products. His passion lies in creating sustainable alternatives 
                    that honor Vedic traditions while addressing modern environmental challenges.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Drawing from Uttar Pradesh's rich artisanal heritage, Yash focuses on sustainable manufacturing 
                    innovation and reviving ancient Vedic practices in modern eco-luxury. His commitment extends beyond 
                    business—he's dedicated to empowering village women artisans, creating meaningful livelihoods through 
                    traditional craftsmanship while prioritizing purity and environmental stewardship.
                  </p>
                  
                  <div className="pt-4 border-t border-[#D5A147]/20">
                    <p className="text-sm font-semibold text-[#633014] mb-2">Key Focus Areas:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm text-muted-foreground">
                        <span className="text-[#D5A147] mr-2">•</span>
                        <span>Transforming natural waste into premium aromatics</span>
                      </li>
                      <li className="flex items-start text-sm text-muted-foreground">
                        <span className="text-[#D5A147] mr-2">•</span>
                        <span>Empowering village women artisans</span>
                      </li>
                      <li className="flex items-start text-sm text-muted-foreground">
                        <span className="text-[#D5A147] mr-2">•</span>
                        <span>Sustainable manufacturing innovation</span>
                      </li>
                      <li className="flex items-start text-sm text-muted-foreground">
                        <span className="text-[#D5A147] mr-2">•</span>
                        <span>Reviving Vedic practices in eco-luxury</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-[#D5A147]/20 hover:border-[#D5A147] transition-all duration-500 hover:shadow-[0_12px_28px_rgba(213,161,71,0.15)]">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D5A147] to-[#C39138] flex items-center justify-center mb-4">
                    <span className="text-4xl font-serif font-bold text-white">AG</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#633014] mb-2">Aparna Gupta</h3>
                  <p className="text-[#D5A147] font-semibold text-lg mb-4">Co-Director</p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    As Co-Director, Aparna Gupta brings her expertise in branding and fragrances to elevate 
                    Gaura Naturals' luxury positioning. She is a recognized expert in traditional fragrances, 
                    particularly Ittar, blending centuries-old knowledge with contemporary design sensibilities.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Aparna oversees product development for signature items like Ittar and bamboo-less incense, 
                    crafting luxurious experiences using traditional ingredients such as rose and sandalwood. 
                    Her vision aligns perfectly with the brand's core values of health protection and spiritual wellness, 
                    fostering growth in India's emerging eco-aromatics market.
                  </p>
                  
                  <div className="pt-4 border-t border-[#D5A147]/20">
                    <p className="text-sm font-semibold text-[#633014] mb-2">Key Expertise:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm text-muted-foreground">
                        <span className="text-[#D5A147] mr-2">•</span>
                        <span>Expert in traditional Ittar and fragrances</span>
                      </li>
                      <li className="flex items-start text-sm text-muted-foreground">
                        <span className="text-[#D5A147] mr-2">•</span>
                        <span>Branding and luxury positioning</span>
                      </li>
                      <li className="flex items-start text-sm text-muted-foreground">
                        <span className="text-[#D5A147] mr-2">•</span>
                        <span>Product development (Ittar, bamboo-less incense)</span>
                      </li>
                      <li className="flex items-start text-sm text-muted-foreground">
                        <span className="text-[#D5A147] mr-2">•</span>
                        <span>Blending tradition with contemporary design</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Mission Alignment */}
            <div className="mt-12 max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground italic">
                "Together, we are committed to reviving Vedic practices through sustainable innovation, 
                creating eco-luxury products from recycled temple flowers and cow dung, while empowering 
                the artisan communities that bring our vision to life."
              </p>
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