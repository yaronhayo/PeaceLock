import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react";
import logoImage from "@assets/PeaceNLock-03_1758436344910.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src={logoImage} alt="Peace & Lock" className="h-10 w-auto" />
              <div>
                <h3 className="text-xl font-bold text-primary-foreground">Peace & Lock</h3>
                <p className="text-sm text-primary-foreground/80">NJ License #13VH13566900</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 mb-6 max-w-md text-base leading-relaxed">
              New Jersey's trusted garage door repair and installation experts. 
              Serving communities throughout NJ with professional, reliable service since 2009.
            </p>
            <div className="text-center md:text-left">
              <p className="text-sm text-primary-foreground/80 mb-4 font-medium">Follow us for tips and updates:</p>
              <div className="flex justify-center md:justify-start space-x-4">
                <button 
                  className="p-3 hover:bg-primary-foreground/10 rounded-full transition-all duration-300 hover:scale-110"
                  data-testid="footer-social-facebook"
                  onClick={() => console.log('Facebook link clicked')}
                >
                  <Facebook className="w-6 h-6 text-primary-foreground/70 hover:text-secondary" />
                </button>
                <button 
                  className="p-3 hover:bg-primary-foreground/10 rounded-full transition-all duration-300 hover:scale-110"
                  data-testid="footer-social-twitter"
                  onClick={() => console.log('Twitter link clicked')}
                >
                  <Twitter className="w-6 h-6 text-primary-foreground/70 hover:text-secondary" />
                </button>
                <button 
                  className="p-3 hover:bg-primary-foreground/10 rounded-full transition-all duration-300 hover:scale-110"
                  data-testid="footer-social-instagram"
                  onClick={() => console.log('Instagram link clicked')}
                >
                  <Instagram className="w-6 h-6 text-primary-foreground/70 hover:text-secondary" />
                </button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6 text-primary-foreground text-lg">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                  data-testid="footer-link-repair"
                >
                  Garage Door Repair
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                  data-testid="footer-link-installation"
                >
                  New Installation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                  data-testid="footer-link-opener"
                >
                  Opener Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                  data-testid="footer-link-emergency"
                >
                  Emergency Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                  data-testid="footer-link-maintenance"
                >
                  Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6 text-primary-foreground text-lg">Contact Info</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-secondary" />
                <span className="text-primary-foreground/90 font-medium">(201) 431-3480</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-secondary" />
                <span className="text-primary-foreground/90">support@peaceandlocknj.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-secondary" />
                <span className="text-primary-foreground/90">Serving all of New Jersey</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-3 text-secondary" />
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
            <h4 className="font-semibold mb-6 text-primary-foreground text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                  data-testid="footer-link-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('areas')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                  data-testid="footer-link-areas"
                >
                  Service Areas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                  data-testid="footer-link-faq"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                  data-testid="footer-link-booking"
                >
                  Book Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.open('tel:(201) 431-3480')}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                  data-testid="footer-link-emergency-call"
                >
                  Emergency Call
                </button>
              </li>
            </ul>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80 font-medium">
              © {currentYear} Peace & Lock. All rights reserved. | NJ License #13VH13566900
            </div>
            <div className="flex space-x-6 text-sm">
              <button 
                className="text-primary-foreground/70 hover:text-secondary transition-colors font-medium"
                data-testid="footer-link-privacy"
                onClick={() => console.log('Privacy Policy clicked')}
              >
                Privacy Policy
              </button>
              <button 
                className="text-primary-foreground/70 hover:text-secondary transition-colors font-medium"
                data-testid="footer-link-terms"
                onClick={() => console.log('Terms clicked')}
              >
                Terms of Service
              </button>
              <button 
                className="text-primary-foreground/70 hover:text-secondary transition-colors font-medium"
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