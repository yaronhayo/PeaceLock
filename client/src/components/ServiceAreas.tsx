import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in Leaflet
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

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
                <div className="rounded-lg overflow-hidden border" style={{ height: '300px' }}>
                  {typeof window !== 'undefined' && (
                    <MapContainer
                      center={[40.7282, -74.0776] as [number, number]}
                      zoom={9}
                      style={{ height: '100%', width: '100%' }}
                      data-testid="service-areas-map"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      {cityLocations.map((city, index) => (
                        <Marker key={index} position={[city.lat, city.lng] as [number, number]}>
                          <Popup>
                            <div className="text-center">
                              <h6 className="font-semibold">{city.name}</h6>
                              <p className="text-sm text-muted-foreground">{city.county} County</p>
                              <p className="text-xs text-primary">Service Available</p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  )}
                  {typeof window === 'undefined' && (
                    <div className="flex items-center justify-center h-full bg-muted/20">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
                        <p className="text-muted-foreground">Interactive map loading...</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-center text-muted-foreground text-sm mt-3">
                  Click on any marker to see service availability in that city
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