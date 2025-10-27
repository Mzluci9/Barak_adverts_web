/*
 * component: QuoteForm.tsx
 * purpose: Multi-step quote request form with price estimation
 * 
 * EDIT INSTRUCTIONS:
 * - Modify form fields: Edit the JSX sections for each step (lines 80-250)
 * - Change pricing logic: Update calculateEstimate function (lines 35-55)
 * - Add/remove services: Edit serviceOptions array (line 25)
 * - Change urgent fee: Modify URGENT_FEE constant (line 22)
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// EDIT: Pricing constants (mock values - replace with real pricing logic)
const URGENT_FEE = 50; // Additional fee for urgent processing

// EDIT: Available services
const serviceOptions = [
  "Advertising", "Neon Light", "Light Box", "T-Shirt Printing", 
  "Cape Printing", "Mug Printing", "Gift Shop", "ID Printing",
  "Urgent e-Passport", "Normal e-Passport", "Other"
];

// EDIT: Mock price calculation - TODO: Replace with actual pricing API
const calculateEstimate = (formData: any) => {
  let basePrice = 100;
  
  // Add service-specific pricing
  if (formData.service?.includes("Neon")) basePrice += 200;
  if (formData.service?.includes("T-Shirt") || formData.service?.includes("Mug")) basePrice += 50;
  if (formData.service?.includes("Passport")) basePrice += 150;
  
  // Add urgent fee
  if (formData.urgency === "urgent") basePrice += URGENT_FEE;
  
  return basePrice;
};

const QuoteForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    details: "",
    deadline: "",
    urgency: "normal",
    artwork: null as File | null
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Basic validation for current step
    if (step === 1 && (!formData.name || !formData.email || !formData.phone)) {
      toast.error("Please fill in all contact information");
      return;
    }
    if (step === 2 && !formData.service) {
      toast.error("Please select a service");
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    const estimate = calculateEstimate(formData);
    setIsSubmitting(true);
    
    try {
      // Call the edge function to send email
      const { data, error } = await supabase.functions.invoke('send-quote-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          projectDetails: formData.details,
          deadline: formData.deadline,
          urgent: formData.urgency === "urgent",
          estimatedCost: estimate
        }
      });

      if (error) {
        console.error("Error submitting quote:", error);
        toast.error("Failed to submit quote request. Please try again.");
        return;
      }

      console.log("Quote submitted successfully:", data);
      toast.success(`Quote request submitted! Check your email for confirmation.`);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        details: "",
        deadline: "",
        urgency: "normal",
        artwork: null
      });
      setStep(1);
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimate = calculateEstimate(formData);

  return (
    <section id="quote" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get a <span className="text-primary">Quote</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your project and receive a customized quote within 24 hours.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-orange">
          <CardHeader>
            <CardTitle>Request a Quote - Step {step} of 4</CardTitle>
            <CardDescription>
              {step === 1 && "Enter your contact information"}
              {step === 2 && "Select the service you need"}
              {step === 3 && "Provide project details"}
              {step === 4 && "Review and submit your request"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Contact Info */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    placeholder="Your Company Name"
                    value={formData.company}
                    onChange={(e) => updateField("company", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Service Selection */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <Label>Select Service *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <button
                      key={service}
                      onClick={() => updateField("service", service)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.service === service
                          ? "border-primary bg-primary/10 shadow-orange"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold">{service}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Project Details */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <Label htmlFor="details">Project Details</Label>
                  <Textarea
                    id="details"
                    placeholder="Describe your project requirements, quantities, dimensions, deadlines, etc."
                    rows={6}
                    value={formData.details}
                    onChange={(e) => updateField("details", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Preferred Deadline (Optional)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => updateField("deadline", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="artwork">Upload Artwork (Optional)</Label>
                  <Input
                    id="artwork"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => updateField("artwork", e.target.files?.[0] || null)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Accepted formats: JPG, PNG, PDF (Max 10MB)
                  </p>
                </div>
                <div>
                  <Label>Processing Speed</Label>
                  <RadioGroup value={formData.urgency} onValueChange={(v) => updateField("urgency", v)}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="normal" id="normal" />
                      <Label htmlFor="normal" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Normal Processing</div>
                        <div className="text-sm text-muted-foreground">Standard delivery timeline</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg border-primary/50 bg-primary/5">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label htmlFor="urgent" className="flex-1 cursor-pointer">
                        <div className="font-semibold flex items-center gap-2">
                          Urgent Processing 
                          <span className="text-primary text-xs">+${URGENT_FEE}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Priority handling and faster delivery</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-secondary/50 p-6 rounded-lg space-y-3">
                  <h3 className="font-bold text-lg">Review Your Request</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    {formData.company && <p><strong>Company:</strong> {formData.company}</p>}
                    <p><strong>Service:</strong> {formData.service}</p>
                    {formData.deadline && <p><strong>Deadline:</strong> {formData.deadline}</p>}
                    <p><strong>Urgency:</strong> {formData.urgency === "urgent" ? "Urgent" : "Normal"}</p>
                    {formData.details && <p><strong>Details:</strong> {formData.details}</p>}
                  </div>
                  <div className="pt-4 border-t border-border mt-4">
                    <p className="text-2xl font-bold text-primary">
                      Estimated Cost: ${estimate}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      * This is a preliminary estimate. Final pricing will be confirmed after review.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-border">
              {step > 1 && (
                <Button onClick={prevStep} variant="outline">
                  <ArrowLeft className="mr-2" />
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button onClick={nextStep} className="ml-auto">
                  Next
                  <ArrowRight className="ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="ml-auto" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuoteForm;
