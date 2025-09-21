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

// City coordinates for map markers
const cityLocations = [
  // Bergen County
  { name: "Hackensack", county: "Bergen", lat: 40.8859, lng: -74.0429 },
  { name: "Paramus", county: "Bergen", lat: 40.9445, lng: -74.0654 },
  { name: "Fort Lee", county: "Bergen", lat: 40.8507, lng: -73.9704 },
  { name: "Englewood", county: "Bergen", lat: 40.8926, lng: -73.9726 },
  { name: "Teaneck", county: "Bergen", lat: 40.8976, lng: -74.0160 },
  { name: "Ridgewood", county: "Bergen", lat: 40.9798, lng: -74.1165 },
  // Hudson County
  { name: "Jersey City", county: "Hudson", lat: 40.7178, lng: -74.0431 },
  { name: "Hoboken", county: "Hudson", lat: 40.7440, lng: -74.0324 },
  { name: "Union City", county: "Hudson", lat: 40.7943, lng: -74.0260 },
  { name: "West New York", county: "Hudson", lat: 40.7879, lng: -74.0143 },
  { name: "Secaucus", county: "Hudson", lat: 40.7895, lng: -74.0565 },
  { name: "Bayonne", county: "Hudson", lat: 40.6687, lng: -74.1143 },
  // Essex County
  { name: "Newark", county: "Essex", lat: 40.7357, lng: -74.1724 },
  { name: "East Orange", county: "Essex", lat: 40.7673, lng: -74.2049 },
  { name: "Irvington", county: "Essex", lat: 40.7323, lng: -74.2346 },
  { name: "Bloomfield", county: "Essex", lat: 40.8068, lng: -74.1854 },
  { name: "Montclair", county: "Essex", lat: 40.8259, lng: -74.2090 },
  { name: "Livingston", county: "Essex", lat: 40.7957, lng: -74.3149 },
  // Passaic County
  { name: "Paterson", county: "Passaic", lat: 40.9168, lng: -74.1718 },
  { name: "Clifton", county: "Passaic", lat: 40.8584, lng: -74.1638 },
  { name: "Passaic", county: "Passaic", lat: 40.8568, lng: -74.1282 },
  { name: "Wayne", county: "Passaic", lat: 40.9254, lng: -74.2765 },
  { name: "Pompton Lakes", county: "Passaic", lat: 40.9943, lng: -74.2835 },
  { name: "Wanaque", county: "Passaic", lat: 41.0426, lng: -74.2943 },
  // Morris County
  { name: "Morristown", county: "Morris", lat: 40.7968, lng: -74.4815 },
  { name: "Parsippany", county: "Morris", lat: 40.8579, lng: -74.4260 },
  { name: "Dover", county: "Morris", lat: 40.8835, lng: -74.5629 },
  { name: "Boonton", county: "Morris", lat: 40.9024, lng: -74.4071 },
  { name: "Madison", county: "Morris", lat: 40.7593, lng: -74.4171 },
  { name: "Chatham", county: "Morris", lat: 40.7407, lng: -74.3835 },
  // Union County
  { name: "Elizabeth", county: "Union", lat: 40.6640, lng: -74.2107 },
  { name: "Union", county: "Union", lat: 40.6976, lng: -74.2632 },
  { name: "Plainfield", county: "Union", lat: 40.6338, lng: -74.4071 },
  { name: "Westfield", county: "Union", lat: 40.6590, lng: -74.3476 },
  { name: "Summit", county: "Union", lat: 40.7165, lng: -74.3548 },
  { name: "Cranford", county: "Union", lat: 40.6584, lng: -74.3001 }
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
                    src="https://www.google.com/maps/embed?pb=!1m76!1m12!1m3!1d387961.45!2d-74.30!3d40.70!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m61!3e6!4m5!1s0x89c2994babce7171%3A0x4a1c5c3c8f5e9a5b!2sHackensack%2C%20NJ!3m2!1d40.8859321!2d-74.0429016!4m5!1s0x89c2ec7c2e4f7d7f%3A0x5a5e6b3c9a8b7c6d!2sParamus%2C%20NJ!3m2!1d40.9445087!2d-74.0654228!4m5!1s0x89c2f625b7f8c8d1%3A0x8c5d6e7f9a0b1c2d!2sFort%20Lee%2C%20NJ!3m2!1d40.8507099!2d-73.9700539!4m5!1s0x89c2f6a1b2c3d4e5%3A0xa1b2c3d4e5f60708!2sJersey%20City%2C%20NJ!3m2!1d40.7281575!2d-74.0776417!4m5!1s0x89c258e3d7e9f4a5%3A0xb6c7d8e9fa0b1c2d!2sNewark%2C%20NJ!3m2!1d40.735657!2d-74.1723667!4m5!1s0x89c25a69a3d6f7e8%3A0xc8d9eaf0b1c2d3e4!2sPaterson%2C%20NJ!3m2!1d40.9167654!2d-74.1709417!4m5!1s0x89c39959c2bbdf2f%3A0x5b6c7d8e9fa0b1c2!2sMorristown%2C%20NJ!3m2!1d40.7967735!2d-74.4815133!4m5!1s0x89c184c5f5c7e8d9%3A0xeaf0b1c2d3e4f567!2sElizabeth%2C%20NJ!3m2!1d40.6639916!2d-74.2107006!5e0!3m2!1sen!2sus!4v1682000000000!5m2!1sen!2sus"
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
                  Interactive map showing our key service cities across New Jersey
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