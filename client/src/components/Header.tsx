import { Phone, Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logoImage from "@assets/PeaceNLock-03_1758436344910.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logoImage} alt="Peace & Lock" className="h-12 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Peace & Lock</h1>
              <p className="text-sm text-muted-foreground">NJ License #13VH13566900</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('areas')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-areas"
            >
              Service Areas
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              size="sm"
              onClick={() => scrollToSection('booking')}
              data-testid="button-book-service"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book a Service
            </Button>
            <Button 
              variant="secondary"
              size="sm"
              onClick={() => window.open('tel:(201) 431-3480')}
              data-testid="button-call-now"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call: (201) 431-3480
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <nav className="flex flex-col space-y-3 mt-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-left text-foreground hover:text-primary transition-colors py-2"
                data-testid="mobile-nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('areas')}
                className="text-left text-foreground hover:text-primary transition-colors py-2"
                data-testid="mobile-nav-areas"
              >
                Service Areas
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-foreground hover:text-primary transition-colors py-2"
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground hover:text-primary transition-colors py-2"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  size="sm"
                  onClick={() => scrollToSection('booking')}
                  data-testid="mobile-button-book-service"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Service
                </Button>
                <Button 
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open('tel:(201) 431-3480')}
                  data-testid="mobile-button-call-now"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call: (201) 431-3480
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}