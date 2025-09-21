import { Phone, Calendar, Shield, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/garage_door_repair_technician_707b350f.png";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { loadRecaptcha, executeRecaptcha } from "@/utils/recaptcha";

export default function Hero() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: '',
    description: ''
  });

  useEffect(() => {
    loadRecaptcha();
  }, []);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert hero form data to booking format
      const [firstName, ...lastNameParts] = formData.name.split(' ');
      const bookingData = {
        firstName: firstName || '',
        lastName: lastNameParts.join(' ') || 'N/A',
        phone: formData.phone,
        serviceType: formData.serviceType,
        urgency: 'normal',
        address: 'TBD', // Will be collected later
        city: 'TBD',
        zipCode: 'TBD',
        description: formData.description || 'No description provided'
        // Note: Hero form doesn't collect email, so team notification only
      };

      console.log('Hero form submitting:', bookingData);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned non-JSON response');
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Request Submitted!",
          description: "Thank you! We'll contact you within 30 minutes to discuss your needs and schedule service.",
        });

        // Reset form
        setFormData({
          name: '',
          phone: '',
          serviceType: '',
          description: ''
        });
      } else {
        toast({
          title: "Submission Error",
          description: result.message || "Please check your information and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Hero form submission error:', error);

      let errorMessage = "Unable to submit your request. Please try again or call us directly.";
      if (error instanceof Error) {
        if (error.message.includes('non-JSON')) {
          errorMessage = "Server configuration error. Please call us directly at (201) 431-3480.";
        } else if (error.message.includes('HTTP error')) {
          errorMessage = "Server error occurred. Please try again in a moment.";
        }
      }

      toast({
        title: "Submission Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay and Animated Elements */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-600/5 rounded-full blur-2xl animate-spin" style={{animationDuration: '30s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Garage Door Repair
              <span className="text-primary block">Englewood, NJ</span>
              <span className="text-secondary block">24/7 Emergency Service</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Englewood's trusted garage door repair specialists. Licensed professionals providing
              24/7 emergency garage door repair, spring replacement, opener installation, and broken garage door service throughout Englewood and Bergen County.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center text-sm text-muted-foreground">
                <Shield className="w-4 h-4 mr-2 text-secondary" />
                Licensed & Insured
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2 text-secondary" />
                24/7 Emergency Service
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-secondary" />
                Englewood & Bergen County
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={scrollToBooking}
                className="text-lg px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                data-testid="hero-button-book"
              >
                <Calendar className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                Book a Service
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.open('tel:(201) 431-3480')}
                className="text-lg px-8 py-3 border-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                data-testid="hero-button-call"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: (201) 431-3480
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Licensed & Insured • Englewood Local Experts • 24/7 Availability
            </p>
          </div>

          {/* Quick Booking Form */}
          <div className="lg:block">
            <Card className="bg-card/95 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  Request Your Estimate
                </h3>
                <form className="space-y-4" onSubmit={handleQuickSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      data-testid="input-phone"
                    />
                  </div>
                  <div>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
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
                      name="description"
                      placeholder="Describe your issue or project"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      data-testid="textarea-description"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-lg py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                    data-testid="button-submit-estimate"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Estimate'}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Prompt response during business hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}