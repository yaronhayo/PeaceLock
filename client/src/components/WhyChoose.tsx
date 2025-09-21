import { Card, CardContent } from "@/components/ui/card";

export default function WhyChoose() {
  return (
    <section id="why-choose" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Card className="bg-primary/5 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">
                Why Choose Peace & Lock?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <p className="text-muted-foreground">Years Experience</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">Licensed</div>
                  <p className="text-muted-foreground">& Insured</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">Emergency</div>
                  <p className="text-muted-foreground">Service Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}