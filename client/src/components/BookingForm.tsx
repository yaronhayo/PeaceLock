import { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, Mail, Home, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { loadRecaptcha, executeRecaptcha } from "@/utils/recaptcha";

export default function BookingForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadRecaptcha();
  }, []);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    
    // Service Details
    serviceType: '',
    urgency: 'normal',
    preferredDate: '',
    preferredTime: '',
    
    // Property Information
    address: '',
    city: '',
    zipCode: '',
    propertyType: 'residential',
    
    // Issue Description
    description: '',
    garageDoorBrand: '',
    ageOfDoor: '',
    
    // Additional Options
    contactMethod: 'phone',
    marketingConsent: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha('booking_form_submit');

      if (!recaptchaToken) {
        toast({
          title: "Verification Failed",
          description: "Please try again or call us directly at (201) 431-3480.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
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
          title: "Service Request Submitted!",
          description: "Thank you! We'll contact you within 30 minutes to confirm your appointment.",
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          serviceType: '',
          urgency: 'normal',
          preferredDate: '',
          preferredTime: '',
          address: '',
          city: '',
          zipCode: '',
          propertyType: 'residential',
          description: '',
          garageDoorBrand: '',
          ageOfDoor: '',
          contactMethod: 'phone',
          marketingConsent: false
        });
      } else {
        toast({
          title: "Submission Error",
          description: result.message || "Please check your information and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);

      // More specific error messaging
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
    <section id="booking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Book Your Service
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Schedule your garage door service with Peace & Lock. Fill out the form below 
            and we'll contact you within 30 minutes to confirm your appointment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Service Request Form</CardTitle>
              <p className="text-muted-foreground text-center">
                All fields marked with * are required
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-ring" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="booking-input-firstname"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="booking-input-lastname"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="booking-input-phone"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="booking-input-email"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Wrench className="w-5 h-5 mr-2 text-ring" />
                    Service Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="serviceType" className="block text-sm font-medium mb-2">
                        Service Needed *
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="booking-select-service"
                      >
                        <option value="">Select service type</option>
                        <option value="repair">Garage Door Repair</option>
                        <option value="installation">New Door Installation</option>
                        <option value="opener-install">Opener Installation</option>
                        <option value="opener-repair">Opener Repair</option>
                        <option value="maintenance">Maintenance Service</option>
                        <option value="emergency">Emergency Repair</option>
                        <option value="consultation">Free Consultation</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="urgency" className="block text-sm font-medium mb-2">
                        Urgency Level *
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="booking-select-urgency"
                      >
                        <option value="normal">Normal (1-2 days)</option>
                        <option value="urgent">Urgent (Same day)</option>
                        <option value="emergency">Emergency (ASAP)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-medium mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="booking-input-date"
                      />
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium mb-2">
                        Preferred Time
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="booking-select-time"
                      >
                        <option value="">Any time</option>
                        <option value="morning">Morning (8 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                        <option value="evening">Evening (5 PM - 7 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Home className="w-5 h-5 mr-2 text-ring" />
                    Property Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="booking-input-address"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="booking-input-city"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="booking-input-zip"
                      />
                    </div>
                  </div>
                </div>

                {/* Issue Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Describe Your Issue or Project *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Please provide details about your garage door issue, what you've noticed, any unusual sounds, etc."
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    data-testid="booking-textarea-description"
                  ></textarea>
                </div>

                {/* Additional Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="garageDoorBrand" className="block text-sm font-medium mb-2">
                      Garage Door Brand (if known)
                    </label>
                    <input
                      type="text"
                      id="garageDoorBrand"
                      name="garageDoorBrand"
                      value={formData.garageDoorBrand}
                      onChange={handleInputChange}
                      placeholder="e.g., Clopay, Wayne Dalton, Amarr"
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      data-testid="booking-input-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="ageOfDoor" className="block text-sm font-medium mb-2">
                      Approximate Age of Door
                    </label>
                    <select
                      id="ageOfDoor"
                      name="ageOfDoor"
                      value={formData.ageOfDoor}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      data-testid="booking-select-age"
                    >
                      <option value="">Not sure</option>
                      <option value="less-than-5">Less than 5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10-15">10-15 years</option>
                      <option value="15-20">15-20 years</option>
                      <option value="more-than-20">More than 20 years</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    type="submit" 
                    className="w-full text-lg py-4"
                    disabled={isSubmitting}
                    data-testid="booking-button-submit"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Service Request'}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    We'll contact you within 30 minutes during business hours to confirm your appointment. 
                    For emergencies, call (201) 431-3480 directly.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}