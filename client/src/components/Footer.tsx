import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react";
import logoImage from "@assets/PeaceNLock-03_1758436344910.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={logoImage} alt="Peace & Lock" className="h-10 w-auto" />
              <div>
                <h3 className="text-lg font-bold">Peace & Lock</h3>
                <p className="text-sm text-muted-foreground">NJ License #13VH13566900</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              New Jersey's trusted garage door repair and installation experts. 
              Serving communities throughout NJ with professional, reliable service since 2009.
            </p>
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-3">Follow us for tips and updates:</p>
              <div className="flex justify-center md:justify-start space-x-4">
                <button 
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                  data-testid="footer-social-facebook"
                  onClick={() => console.log('Facebook link clicked')}
                >
                  <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary" />
                </button>
                <button 
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                  data-testid="footer-social-twitter"
                  onClick={() => console.log('Twitter link clicked')}
                >
                  <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary" />
                </button>
                <button 
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                  data-testid="footer-social-instagram"
                  onClick={() => console.log('Instagram link clicked')}
                >
                  <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-repair"
                >
                  Garage Door Repair
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-installation"
                >
                  New Installation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-opener"
                >
                  Opener Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-emergency"
                >
                  Emergency Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-maintenance"
                >
                  Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <span>(201) 431-3480</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <span>support@peaceandlocknj.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>Serving all of New Jersey</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <div>
                  <p>Mon-Fri: 7:00 AM - 7:00 PM</p>
                  <p>Sat: 8:00 AM - 5:00 PM</p>
                  <p>Sun: 9:00 AM - 3:00 PM</p>
                  <p className="text-primary font-medium">Emergency Service Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('areas')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-areas"
                >
                  Service Areas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-faq"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-booking"
                >
                  Book Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.open('tel:(201) 431-3480')}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-emergency-call"
                >
                  Emergency Call
                </button>
              </li>
            </ul>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Peace & Lock. All rights reserved. | NJ License #13VH13566900
            </div>
            <div className="flex space-x-6 text-sm">
              <button 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-privacy"
                onClick={() => console.log('Privacy Policy clicked')}
              >
                Privacy Policy
              </button>
              <button 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-terms"
                onClick={() => console.log('Terms clicked')}
              >
                Terms of Service
              </button>
              <button 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-accessibility"
                onClick={() => console.log('Accessibility clicked')}
              >
                Accessibility
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}