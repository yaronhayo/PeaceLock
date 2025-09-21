import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// todo: remove mock functionality - replace with real customer reviews
const reviews = [
  {
    name: "Michael Rodriguez",
    initials: "MR",
    rating: 5,
    review: "Outstanding service! My garage door spring broke on a Sunday and they had someone out within 2 hours. Professional, fair pricing, and excellent workmanship. Highly recommend Peace & Lock!",
    service: "Emergency Spring Repair",
    location: "Bergen County"
  },
  {
    name: "Sarah Chen",
    initials: "SC", 
    rating: 5,
    review: "We needed a complete garage door replacement and Peace & Lock made the process seamless. From selection to installation, everything was perfect. The new door looks amazing and works flawlessly.",
    service: "Door Installation",
    location: "Hudson County"
  },
  {
    name: "David Thompson",
    initials: "DT",
    rating: 5,
    review: "Called them for a garage door that wouldn't close properly. The technician diagnosed the issue quickly, explained everything clearly, and fixed it at a reasonable price. Great customer service!",
    service: "Door Repair",
    location: "Essex County"
  },
  {
    name: "Lisa Patel",
    initials: "LP",
    rating: 5,
    review: "Installed a smart garage door opener for us. The technician was knowledgeable, clean, and showed us how to use all the features. Love being able to control it from my phone!",
    service: "Smart Opener Installation",
    location: "Morris County"
  },
  {
    name: "James Wilson",
    initials: "JW",
    rating: 5,
    review: "Peace & Lock has serviced our commercial property for 3 years. Always reliable, always professional. Their maintenance program has saved us from costly emergency repairs.",
    service: "Commercial Maintenance",
    location: "Union County"
  },
  {
    name: "Maria Gonzalez",
    initials: "MG",
    rating: 5,
    review: "Exceptional experience from start to finish. Fair estimate, showed up on time, completed the work efficiently. The garage door works better than ever. Will definitely use them again!",
    service: "Track Alignment",
    location: "Passaic County"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < rating ? 'text-primary fill-current' : 'text-muted'}`}
        />
      ))}
    </div>
  );
};

export default function Reviews() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. See why hundreds of New Jersey homeowners 
            and businesses trust Peace & Lock for their garage door needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`review-card-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {review.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.location}</div>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-primary/20 flex-shrink-0" />
                </div>

                <StarRating rating={review.rating} />
                
                <p className="text-muted-foreground my-4 text-sm leading-relaxed">
                  "{review.review}"
                </p>

                <div className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full w-fit">
                  {review.service}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card className="bg-secondary/5 border-secondary/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="flex justify-center mb-2">
                    <StarRating rating={5} />
                  </div>
                  <div className="text-3xl font-bold text-secondary mb-2">4.9/5</div>
                  <p className="text-muted-foreground">Average Rating</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">500+</div>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">98%</div>
                  <p className="text-muted-foreground">Would Recommend</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-muted-foreground mb-4">
                  Ready to experience the Peace & Lock difference? Join hundreds of satisfied customers!
                </p>
                <button 
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover-elevate transition-all"
                  data-testid="reviews-book-button"
                >
                  Book Your Service Today
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}