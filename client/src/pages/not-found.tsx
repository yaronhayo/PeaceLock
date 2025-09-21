import { Home, Wrench, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import garageImage from "@assets/generated_images/modern_residential_garage_door_e350c11a.png";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="min-h-screen bg-muted/30 flex items-center justify-center py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Fun 404 Content */}
            <div>
              <div className="text-8xl font-bold text-primary mb-4">404</div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Oops! This Door Won't Open
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Looks like this page got stuck just like a garage door with a broken spring! 
                Don't worry though - unlike your garage door, this one's easy to fix.
              </p>

              <Card className="bg-primary/5 border-primary/20 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Wrench className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Quick Fix Solutions:</h3>
                  </div>
                  <ul className="text-left space-y-2 text-sm">
                    <li className="flex items-center">
                      <Search className="w-4 h-4 mr-2 text-secondary" />
                      Check the URL for typos (we've all been there!)
                    </li>
                    <li className="flex items-center">
                      <Home className="w-4 h-4 mr-2 text-secondary" />
                      Head back to our homepage for a fresh start
                    </li>
                    <li className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-secondary" />
                      Call us if you need help finding what you're looking for
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    size="lg"
                    onClick={() => window.location.href = '/'}
                    data-testid="404-home-button"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Homepage
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => window.open('tel:(201) 431-3480')}
                    data-testid="404-call-button"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call (201) 431-3480
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Or browse our services while you're here:
                </p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = '/#services'}
                    data-testid="404-services-button"
                  >
                    View Services
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = '/book'}
                    data-testid="404-book-button"
                  >
                    Book Service
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = '/#contact'}
                    data-testid="404-contact-button"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>

            {/* Garage Door Image */}
            <div className="relative">
              <img 
                src={garageImage} 
                alt="Beautiful garage door that actually works, unlike this page"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Card className="bg-background/90 backdrop-blur">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm font-medium">
                      "At least our garage doors work better than this webpage!"
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      - Peace & Lock Quality Promise
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t">
            <p className="text-muted-foreground mb-4">
              Since you're here, here's a fun fact: The average garage door opens and closes 
              over 1,500 times per year. That's a lot of opportunities for something to go wrong!
            </p>
            <p className="text-sm text-muted-foreground">
              When your garage door needs attention, Peace & Lock is here to help. 
              Licensed, insured, and ready to fix what's actually broken.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
