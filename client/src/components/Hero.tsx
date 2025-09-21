import { Phone, Calendar, Shield, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/garage_door_repair_technician_707b350f.png";

export default function Hero() {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Fast, Reliable
              <span className="text-primary block">Garage Door</span>
              <span className="text-secondary block">Repair & Installation</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              New Jersey's trusted garage door experts. Licensed professionals providing 
              same-day service, emergency repairs, and quality installations since 2015.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center text-sm text-muted-foreground">
                <Shield className="w-4 h-4 mr-2 text-secondary" />
                Licensed & Insured
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2 text-secondary" />
                Same-Day Service
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-secondary" />
                Serving All NJ
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                onClick={() => window.open('tel:(201) 431-3480')}
                className="text-lg px-8 py-3"
                data-testid="hero-button-call"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: (201) 431-3480
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={scrollToBooking}
                className="text-lg px-8 py-3"
                data-testid="hero-button-book"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book a Service
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              ⭐ 4.9/5 stars • 500+ satisfied customers • Free estimates
            </p>
          </div>

          {/* Quick Booking Form */}
          <div className="lg:block">
            <Card className="bg-card/95 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  Get Your Free Estimate
                </h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); console.log('Form submitted'); }}>
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="input-phone"
                    />
                  </div>
                  <div>
                    <select 
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="select-service"
                    >
                      <option value="">Select Service Needed</option>
                      <option value="repair">Garage Door Repair</option>
                      <option value="installation">New Installation</option>
                      <option value="opener">Opener Service</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="emergency">Emergency Service</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      placeholder="Describe your issue or project"
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      data-testid="textarea-description"
                    ></textarea>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full text-lg py-3"
                    data-testid="button-submit-estimate"
                  >
                    Get Free Estimate
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Response within 30 minutes during business hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}