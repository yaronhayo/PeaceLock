import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const serviceAreas = [
  {
    county: "Bergen County",
    cities: ["Hackensack", "Paramus", "Fort Lee", "Englewood", "Teaneck", "Ridgewood"]
  },
  {
    county: "Hudson County", 
    cities: ["Jersey City", "Hoboken", "Union City", "West New York", "Secaucus", "Bayonne"]
  },
  {
    county: "Essex County",
    cities: ["Newark", "East Orange", "Irvington", "Bloomfield", "Montclair", "Livingston"]
  },
  {
    county: "Passaic County",
    cities: ["Paterson", "Clifton", "Passaic", "Wayne", "Pompton Lakes", "Wanaque"]
  },
  {
    county: "Morris County",
    cities: ["Morristown", "Parsippany", "Dover", "Boonton", "Madison", "Chatham"]
  },
  {
    county: "Union County",
    cities: ["Elizabeth", "Union", "Plainfield", "Westfield", "Summit", "Cranford"]
  }
];

export default function ServiceAreas() {
  return (
    <section id="areas" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Service Areas Across New Jersey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We proudly serve communities throughout Northern and Central New Jersey. 
            Fast, reliable garage door service wherever you are.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Service Areas List */}
          <div>
            <div className="grid gap-6">
              {serviceAreas.map((area, index) => (
                <Card key={index} className="hover-elevate" data-testid={`area-card-${index}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <MapPin className="w-5 h-5 text-primary mr-2" />
                      {area.county}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {area.cities.map((city, cityIndex) => (
                        <span 
                          key={cityIndex}
                          className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                          data-testid={`city-${index}-${cityIndex}`}
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Coverage Info */}
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  Comprehensive Coverage
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-secondary mr-3" />
                    <div>
                      <div className="font-medium">Prompt Service</div>
                      <div className="text-sm text-muted-foreground">Professional service when you need it</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-secondary mr-3" />
                    <div>
                      <div className="font-medium">30-Mile Service Radius</div>
                      <div className="text-sm text-muted-foreground">Covering all major NJ metropolitan areas</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-secondary mr-3" />
                    <div>
                      <div className="font-medium">Local Dispatch</div>
                      <div className="text-sm text-muted-foreground">Technicians based throughout our service area</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Service Map */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-4 text-center">
                  <MapPin className="w-5 h-5 text-primary inline mr-2" />
                  Our Service Coverage Area
                </h4>
                <div className="rounded-lg overflow-hidden border">
                  <iframe
                    src="https://maps.google.com/maps?q=New+Jersey+Bergen+County+Hackensack+Paramus+Fort+Lee+Englewood+Teaneck+Ridgewood+Hudson+County+Jersey+City+Hoboken+Union+City+West+New+York+Secaucus+Bayonne+Essex+County+Newark+East+Orange+Irvington+Bloomfield+Montclair+Livingston+Passaic+County+Paterson+Clifton+Passaic+Wayne+Pompton+Lakes+Wanaque+Morris+County+Morristown+Parsippany+Dover+Boonton+Madison+Chatham+Union+County+Elizabeth+Union+Plainfield+Westfield+Summit+Cranford&hl=en&z=9&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peace & Lock Service Areas Map"
                    data-testid="service-areas-map"
                  ></iframe>
                </div>
                <p className="text-center text-muted-foreground text-sm mt-3">
                  Map shows our comprehensive service coverage across all New Jersey counties and cities
                </p>
              </CardContent>
            </Card>

            <div className="text-center space-y-3">
              <p className="text-muted-foreground">
                Don't see your area listed? We may still serve you!
              </p>
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => window.open('tel:(201) 431-3480')}
                data-testid="button-check-coverage"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call to Check Coverage
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}