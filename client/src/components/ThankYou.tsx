import { CheckCircle, Phone, Calendar, Mail, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          <CardContent className="p-12">
            <div className="mx-auto mb-6 p-4 bg-secondary/10 rounded-full w-fit">
              <CheckCircle className="w-16 h-16 text-secondary" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Thank You for Choosing Peace & Lock!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Your service request has been successfully submitted. We'll contact you within 
              30 minutes during business hours to confirm your appointment.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">What Happens Next?</h2>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">We'll call you within 30 minutes to confirm your appointment details</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">Our technician will arrive at the scheduled time with all necessary tools</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">You'll receive upfront pricing before any work begins</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">All work comes with our satisfaction guarantee</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Need Immediate Help?</h3>
                <p className="text-sm text-muted-foreground mb-2">Call us for emergency service</p>
                <Button 
                  variant="secondary"
                  size="sm" 
                  onClick={() => window.open('tel:(201) 431-3480')}
                  data-testid="thankyou-emergency-call"
                >
                  (201) 431-3480
                </Button>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Questions?</h3>
                <p className="text-sm text-muted-foreground mb-2">Email us anytime</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('mailto:support@peaceandlocknj.com')}
                  data-testid="thankyou-email"
                >
                  Send Email
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full"
                data-testid="thankyou-home-button"
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Homepage
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/book'}
                className="w-full"
                data-testid="thankyou-book-another"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Another Service
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Confirmation details have been sent to your email address (if provided)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}