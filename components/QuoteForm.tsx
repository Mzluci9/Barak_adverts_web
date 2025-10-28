"use client"

import { useState } from "react"
import { sendEmailWithAttachment, formatQuoteData } from "@/lib/email-utils"

/**
 * COMPONENT: QuoteForm
 * PURPOSE: Multi-step quote and booking form
 * EDIT: Change form fields, steps, or pricing logic
 * IMPORTANT: Price calculation is mocked - update with real pricing
 */

interface FormData {
  step: number
  name: string
  email: string
  phone: string
  service: string
  quantity: number
  urgent: boolean
  urgentFee: number
  notes: string
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    step: 1,
    name: "",
    email: "",
    phone: "",
    service: "advertising",
    quantity: 1,
    urgent: false,
    urgentFee: 0,
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const services = [
    { id: "advertising", name: "Advertising", basePrice: 500 },
    { id: "neon", name: "Neon Signs", basePrice: 800 },
    { id: "lightbox", name: "Lightbox", basePrice: 600 },
    { id: "tshirt", name: "T-Shirt Printing", basePrice: 50 },
    { id: "mug", name: "Mug Printing", basePrice: 15 },
    { id: "gifts", name: "Gift Shop", basePrice: 100 },
  ]

  const calculatePrice = () => {
    const service = services.find((s) => s.id === formData.service)
    const basePrice = service?.basePrice || 0
    const subtotal = basePrice * formData.quantity
    const urgentFee = formData.urgent ? subtotal * 0.2 : 0
    return { subtotal, urgentFee, total: subtotal + urgentFee }
  }

  const { subtotal, urgentFee, total } = calculatePrice()

  const handleNext = () => {
    if (formData.step < 4) {
      setFormData({ ...formData, step: formData.step + 1 })
    }
  }

  const handlePrevious = () => {
    if (formData.step > 1) {
      setFormData({ ...formData, step: formData.step - 1 })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const emailData = {
        to: formData.email,
        subject: "Quote Request Confirmation - Barak Advert",
        type: "quote" as const,
        data: formatQuoteData({
          ...formData,
          subtotal,
          urgentFee,
          total,
        }),
      }

      const result = await sendEmailWithAttachment(emailData)

      if (result.success) {
        alert("Quote request submitted! Check your email for confirmation.")
        setFormData({
          step: 1,
          name: "",
          email: "",
          phone: "",
          service: "advertising",
          quantity: 1,
          urgent: false,
          urgentFee: 0,
          notes: "",
        })
      } else {
        alert("Failed to submit quote. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting quote:", error)
      alert("An error occurred while submitting your quote.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get Your Quote</h2>
          <p className="text-lg text-muted-foreground">
            Step {formData.step} of 4 - {formData.step === 1 && "Your Information"}
            {formData.step === 2 && "Service Selection"}
            {formData.step === 3 && "Delivery Options"}
            {formData.step === 4 && "Review & Submit"}
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full transition-all ${step <= formData.step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        {/* FORM CONTENT */}
        <div className="bg-background rounded-lg p-8 shadow-lg">
          {/* STEP 1: BASIC INFO */}
          {formData.step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-foreground mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-bold text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block font-bold text-foreground mb-2">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          )}

          {/* STEP 2: SERVICE SELECTION */}
          {formData.step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-foreground mb-3">Select Service *</label>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setFormData({ ...formData, service: service.id })}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        formData.service === service.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <div className="font-bold text-foreground">{service.name}</div>
                      <div className="text-sm text-muted-foreground">${service.basePrice}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-bold text-foreground mb-2">Quantity *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* STEP 3: DELIVERY OPTIONS */}
          {formData.step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-foreground mb-3">Delivery Option *</label>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-all">
                    <input
                      type="radio"
                      checked={!formData.urgent}
                      onChange={() => setFormData({ ...formData, urgent: false })}
                      className="w-4 h-4"
                    />
                    <div className="ml-3">
                      <div className="font-bold text-foreground">Normal Delivery</div>
                      <div className="text-sm text-muted-foreground">5-7 business days</div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 border-primary bg-primary/5 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      checked={formData.urgent}
                      onChange={() => setFormData({ ...formData, urgent: true })}
                      className="w-4 h-4"
                    />
                    <div className="ml-3">
                      <div className="font-bold text-foreground">⚡ Urgent Delivery</div>
                      <div className="text-sm text-muted-foreground">2-3 business days (+20% fee)</div>
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-bold text-foreground mb-2">Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Any special requirements or details..."
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & PRICING */}
          {formData.step === 4 && (
            <div className="space-y-6">
              <div className="bg-muted p-6 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground">Service:</span>
                  <span className="font-bold text-foreground">
                    {services.find((s) => s.id === formData.service)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Quantity:</span>
                  <span className="font-bold text-foreground">{formData.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Delivery:</span>
                  <span className="font-bold text-foreground">
                    {formData.urgent ? "Urgent (2-3 days)" : "Normal (5-7 days)"}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="text-foreground">Subtotal:</span>
                  <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                {formData.urgent && (
                  <div className="flex justify-between text-warning">
                    <span>Urgent Fee (20%):</span>
                    <span className="font-bold">${urgentFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex justify-between text-lg">
                  <span className="font-bold text-foreground">Total:</span>
                  <span className="font-bold text-primary text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-blue-900">
                  ℹ️ This is an estimated quote. Our team will review your request and send a final quote within 24
                  hours.
                </p>
              </div>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handlePrevious}
              disabled={formData.step === 1}
              className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-bold transition-all"
            >
              ← Previous
            </button>
            {formData.step < 4 ? (
              <button
                onClick={handleNext}
                className="flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold transition-all neon-glow"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all neon-glow"
              >
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
