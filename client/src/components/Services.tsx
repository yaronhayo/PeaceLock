import { Wrench, DoorOpen, Zap, Shield, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Wrench,
    title: "Garage Door Spring Repair",
    description: "Expert repair for broken garage door springs, cables, tracks, and panels. We fix all brands and models with professional service.",
    features: ["Spring replacement", "Cable repair", "Track alignment", "Panel fixes"],
    emergency: "Emergency repairs available"
  },
  {
    icon: DoorOpen,
    title: "Garage Door Installation",
    description: "Professional installation of residential and commercial garage doors. Choose from a wide range of styles and materials.",
    features: ["Residential doors", "Commercial doors", "Custom designs", "All materials"],
    contact: "Consultation available"
  },
  {
    icon: Zap,
    title: "Garage Door Opener Repair",
    description: "Installation, repair, and maintenance of garage door openers. Smart opener upgrades available.",
    features: ["Opener installation", "Motor repair", "Smart upgrades", "Remote programming"],
    service: "Professional service"
  },
  {
    icon: Shield,
    title: "Emergency Garage Door Repair",
    description: "Emergency garage door repair service. Stuck door? Broken spring? We'll get you moving again.",
    features: ["Emergency availability", "Professional service", "Emergency repairs", "Security solutions"],
    service: "Available when needed"
  },
  {
    icon: Clock,
    title: "Garage Door Maintenance",
    description: "Preventive maintenance to keep your garage door running smoothly. Extend the life of your door and opener.",
    features: ["Safety inspections", "Lubrication service", "Spring adjustment", "Preventive care"],
    service: "Professional maintenance"
  },
  {
    icon: Phone,
    title: "Garage Door Consultation",
    description: "Not sure what you need? Our experts provide consultations for all garage door needs.",
    features: ["Expert assessment", "Professional evaluation", "Product recommendations", "No obligations"],
    service: "Consultation available"
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
            New Jersey Garage Door Repair & Installation Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From emergency garage door spring repair to new garage door installation, our licensed technicians 
            provide comprehensive garage door opener repair and broken garage door solutions throughout New Jersey.
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
                  <p className="text-lg font-semibold text-primary">{service.service || service.emergency || service.contact}</p>
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

      </div>
    </section>
  );
}