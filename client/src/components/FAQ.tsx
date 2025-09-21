import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "How quickly can you respond to emergency garage door repairs?",
    answer: "We offer 24/7 emergency service and typically respond within 1-2 hours for urgent situations. For non-emergency repairs, we provide same-day service in most cases, especially for safety-related issues like broken springs or doors that won't close properly."
  },
  {
    question: "What brands of garage doors and openers do you service?",
    answer: "We service all major brands including Chamberlain, LiftMaster, Genie, Craftsman, Wayne Dalton, Clopay, Amarr, and many others. Our technicians are trained on both residential and commercial garage door systems from virtually every manufacturer."
  },
  {
    question: "How much does a typical garage door repair cost?",
    answer: "Repair costs vary depending on the issue. Simple adjustments start around $89, spring replacements typically range from $150-$300, and opener repairs start at $129. We always provide upfront pricing before beginning any work - no surprise charges."
  },
  {
    question: "Do you offer warranties on your repair work?",
    answer: "Yes! We provide a 1-year warranty on all repair work and parts we install. For new garage door installations, we offer extended warranties up to 10 years depending on the product. All work is guaranteed to your complete satisfaction."
  },
  {
    question: "Can you install a garage door opener on my existing door?",
    answer: "In most cases, yes! We can retrofit garage door openers to existing manual doors. Our technicians will first inspect your door to ensure it's properly balanced and in good working condition. We'll recommend any necessary adjustments or repairs before installation."
  },
  {
    question: "How often should I have my garage door serviced?",
    answer: "We recommend annual maintenance to keep your garage door running smoothly and safely. Regular service includes lubricating moving parts, checking spring tension, testing safety features, and adjusting the door balance. This prevents costly repairs and extends the life of your system."
  },
  {
    question: "What should I do if my garage door won't open or close?",
    answer: "First, check if the power is on and try using both the remote and wall button. Look for any obvious obstructions in the tracks. If the door still won't operate, don't force it - call us immediately. Attempting to manually force a malfunctioning door can be dangerous and cause additional damage."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Absolutely! Peace & Lock is fully licensed (NJ License #13VH13566900), bonded, and insured for your protection. Our technicians undergo continuous training and certification. We carry comprehensive liability insurance and workers' compensation coverage."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to common questions about our garage door repair and installation services. 
            Can't find what you're looking for? Give us a call!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden" data-testid={`faq-${index}`}>
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left hover-elevate transition-all duration-200 flex items-center justify-between"
                    data-testid={`faq-button-${index}`}
                  >
                    <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </button>
                  
                  {openIndex === index && (
                    <div 
                      className="px-6 pb-6 text-muted-foreground"
                      data-testid={`faq-answer-${index}`}
                    >
                      <div className="border-t pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our friendly experts are standing by to help with any garage door questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => window.open('tel:(201) 431-3480')}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover-elevate transition-all"
                  data-testid="faq-call-button"
                >
                  Call (201) 431-3480
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-2 border border-primary text-primary rounded-md hover-elevate transition-all"
                  data-testid="faq-contact-button"
                >
                  Send Message
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}