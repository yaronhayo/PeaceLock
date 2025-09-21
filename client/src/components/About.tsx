import { Shield, Users, Award, Clock, Wrench, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import aboutImage from "@assets/generated_images/happy_family_new_garage_6a1aa660.png";

const highlights = [
  {
    icon: Clock,
    title: "15+ Years Experience",
    description: "Serving New Jersey families and businesses since 2009 with expert garage door solutions."
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "NJ License #13VH13566900. Fully bonded and insured for your complete protection."
  },
  {
    icon: Users,
    title: "Trusted by NJ Homeowners",
    description: "New Jersey families and businesses trust us for reliable, professional service."
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "1-year warranty on all repairs and up to 10-year warranties on new installations."
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            About Peace & Lock
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner for all garage door needs in New Jersey. 
            Experience the peace of mind that comes with professional, reliable service.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Company Story */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Our Story</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2009, Peace & Lock began with a simple mission: to provide 
                New Jersey homeowners and businesses with honest, reliable garage door 
                services they can trust. What started as a small family business has 
                grown into the region's most trusted garage door service company.
              </p>
              <p>
                Our name reflects our core values - we believe everyone deserves the 
                <strong className="text-foreground"> peace of mind</strong> that comes 
                with a properly functioning, secure garage door system. Whether it's a 
                late-night emergency repair or a planned installation, we're committed 
                to earning and maintaining that trust.
              </p>
              <p>
                Today, we're proud to serve New Jersey homeowners and businesses across six 
                counties, with the same dedication to quality and customer 
                service that started it all.
              </p>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Why Choose Peace & Lock?</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Wrench className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Expert technicians trained on all major brands and models</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Comprehensive warranties and 100% satisfaction guarantee</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Emergency service available when you need it most</span>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Clear communication and professional service standards</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Company Image */}
          <div>
            <div className="relative">
              <img 
                src={aboutImage} 
                alt="Happy family with their new garage door installation by Peace & Lock"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Card className="bg-background/90 backdrop-blur">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">
                      "Peace & Lock installed our beautiful new garage door and we couldn't be happier!"
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">- The Johnson Family, Bergen County</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Company Highlights */}
        <div className="mt-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <Card key={index} className="text-center hover-elevate" data-testid={`highlight-${index}`}>
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                      <IconComponent className="w-6 h-6 text-secondary" />
                    </div>
                    <h4 className="font-semibold mb-2">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">
                Ready to Experience the Peace & Lock Difference?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join New Jersey homeowners and businesses who trust us for their garage door needs. 
                Request your estimate today!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg"
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="about-book-button"
                >
                  Request Estimate
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => window.open('tel:(201) 431-3480')}
                  data-testid="about-call-button"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call (201) 431-3480
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}