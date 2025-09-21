import { Wrench, DoorOpen, Zap, Shield, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Wrench,
    title: "Garage Door Repair",
    description: "Expert repair for broken springs, cables, tracks, and panels. We fix all brands and models with same-day service.",
    features: ["Spring replacement", "Cable repair", "Track alignment", "Panel fixes"],
    price: "Starting at $89"
  },
  {
    icon: DoorOpen,
    title: "New Installation",
    description: "Professional installation of residential and commercial garage doors. Choose from hundreds of styles and materials.",
    features: ["Residential doors", "Commercial doors", "Custom designs", "All materials"],
    price: "Free estimates"
  },
  {
    icon: Zap,
    title: "Opener Service",
    description: "Installation, repair, and maintenance of garage door openers. Smart opener upgrades available.",
    features: ["Opener installation", "Motor repair", "Smart upgrades", "Remote programming"],
    price: "Starting at $129"
  },
  {
    icon: Shield,
    title: "Emergency Service",
    description: "24/7 emergency garage door repair service. Stuck door? Broken spring? We'll get you moving again.",
    features: ["24/7 availability", "Same-day service", "Emergency repairs", "Security solutions"],
    price: "Call for pricing"
  },
  {
    icon: Clock,
    title: "Maintenance",
    description: "Preventive maintenance to keep your garage door running smoothly. Extend the life of your door and opener.",
    features: ["Safety inspections", "Lubrication service", "Spring adjustment", "Preventive care"],
    price: "Starting at $69"
  },
  {
    icon: Phone,
    title: "Free Consultation",
    description: "Not sure what you need? Our experts provide free consultations and estimates for all garage door needs.",
    features: ["Expert assessment", "Written estimates", "Product recommendations", "No obligations"],
    price: "Always free"
  }
];

export default function Services() {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Garage Door Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From emergency repairs to new installations, our licensed technicians 
            provide comprehensive garage door services throughout New Jersey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`service-card-${index}`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-lg font-semibold text-primary">{service.price}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 space-y-2">
                    <Button 
                      onClick={scrollToBooking}
                      className="w-full"
                      data-testid={`button-book-${index}`}
                    >
                      Book This Service
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => window.open('tel:(201) 431-3480')}
                      className="w-full"
                      data-testid={`button-call-${index}`}
                    >
                      Call for Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Card className="bg-primary/5 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">
                Why Choose Peace & Lock?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <p className="text-muted-foreground">Years Experience</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-muted-foreground">Emergency Service</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}