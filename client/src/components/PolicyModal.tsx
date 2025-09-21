import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type PolicyType = "privacy" | "terms" | "accessibility";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyType: PolicyType | null;
}

const policyContent = {
  privacy: {
    title: "Privacy Policy",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <p><strong>Effective Date:</strong> September 2025</p>
        
        <div>
          <h3 className="font-semibold text-foreground mb-2">Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you contact us for service, request estimates, or communicate with our team. This may include your name, phone number, email address, and service address.</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">How We Use Your Information</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>To provide garage door repair and installation services</li>
            <li>To communicate with you about your service requests</li>
            <li>To schedule appointments and follow up on services</li>
            <li>To improve our services and customer experience</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Information Sharing</h3>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please contact us at (201) 431-3480 or support@peaceandlocknj.com.</p>
        </div>
      </div>
    )
  },
  terms: {
    title: "Terms of Service",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <p><strong>Effective Date:</strong> September 2025</p>
        
        <div>
          <h3 className="font-semibold text-foreground mb-2">Service Agreement</h3>
          <p>By requesting services from Peace & Lock, you agree to these terms and conditions. Our services are provided subject to availability and scheduling.</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Service Scope</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Garage door repair and maintenance</li>
            <li>New garage door installation</li>
            <li>Garage door opener service and installation</li>
            <li>Emergency repair services</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Warranty</h3>
          <p>We provide warranties on our workmanship and parts as applicable. Warranty terms vary by service type and will be discussed during your service appointment.</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Limitation of Liability</h3>
          <p>Our liability is limited to the cost of the services provided. We are not responsible for consequential or incidental damages.</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Contact Information</h3>
          <p>For questions about these terms, contact us at (201) 431-3480 or support@peaceandlocknj.com.</p>
        </div>
      </div>
    )
  },
  accessibility: {
    title: "Accessibility Statement",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <p><strong>Last Updated:</strong> September 2025</p>
        
        <div>
          <h3 className="font-semibold text-foreground mb-2">Our Commitment</h3>
          <p>Peace & Lock is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards.</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Accessibility Features</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Keyboard navigation support</li>
            <li>Screen reader compatibility</li>
            <li>High contrast color schemes</li>
            <li>Clear and consistent navigation</li>
            <li>Descriptive link text and alt tags for images</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Standards Compliance</h3>
          <p>We strive to conform to WCAG 2.1 Level AA accessibility guidelines. These guidelines help make web content accessible to people with disabilities.</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-2">Feedback and Assistance</h3>
          <p>If you encounter any accessibility barriers or need assistance accessing our services, please contact us:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Phone: (201) 431-3480</li>
            <li>Email: support@peaceandlocknj.com</li>
          </ul>
          <p className="mt-2">We welcome your feedback and will work to address any accessibility concerns promptly.</p>
        </div>
      </div>
    )
  }
};

export default function PolicyModal({ isOpen, onClose, policyType }: PolicyModalProps) {
  if (!policyType) return null;

  const policy = policyContent[policyType];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid={`modal-${policyType}`}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{policy.title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
              data-testid={`button-close-${policyType}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="mt-4">
          {policy.content}
        </div>
      </DialogContent>
    </Dialog>
  );
}