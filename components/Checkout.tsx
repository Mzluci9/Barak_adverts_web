"use client"

import { useState } from "react"
import Link from "next/link"

/**
 * COMPONENT: Checkout
 * PURPOSE: Multi-step checkout process with payment
 * EDIT: Add payment gateway integration (Stripe, PayPal, etc.)
 * TODO: Connect to payment API and order management system
 */

interface CheckoutData {
  step: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  cardName: string
  cardNumber: string
  cardExpiry: string
  cardCVC: string
}

export default function Checkout() {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    step: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  })

  const [orderPlaced, setOrderPlaced] = useState(false)

  // Mock cart data - in real app, this would come from context or props
  const cartItems = [
    { id: 1, name: "Classic T-Shirt", price: 25, quantity: 2 },
    { id: 2, name: "Ceramic Mug", price: 12, quantity: 1 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const handleNext = () => {
    if (checkoutData.step < 3) {
      setCheckoutData({ ...checkoutData, step: checkoutData.step + 1 })
    }
  }

  const handlePrevious = () => {
    if (checkoutData.step > 1) {
      setCheckoutData({ ...checkoutData, step: checkoutData.step - 1 })
    }
  }

  const handlePlaceOrder = async () => {
    // TODO: Integrate with payment gateway
    console.log("Order placed:", checkoutData)
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <section className="py-16 md:py-24 bg-background min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-muted rounded-lg p-12 text-center">
            <div className="text-6xl mb-6">✓</div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Order Confirmed!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <p className="text-muted-foreground mb-8">
              A confirmation email has been sent to <span className="font-bold">{checkoutData.email}</span>
            </p>
            <div className="bg-background rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-foreground">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-border">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link
              href="/"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Checkout</h2>
          <p className="text-lg text-muted-foreground">
            Step {checkoutData.step} of 3 - {checkoutData.step === 1 && "Shipping Information"}
            {checkoutData.step === 2 && "Billing Address"}
            {checkoutData.step === 3 && "Payment Information"}
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full transition-all ${step <= checkoutData.step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* MAIN FORM */}
          <div className="lg:col-span-2">
            <div className="bg-muted rounded-lg p-8">
              {/* STEP 1: SHIPPING */}
              {checkoutData.step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Shipping Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-foreground mb-2">First Name *</label>
                      <input
                        type="text"
                        value={checkoutData.firstName}
                        onChange={(e) => setCheckoutData({ ...checkoutData, firstName: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-foreground mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={checkoutData.lastName}
                        onChange={(e) => setCheckoutData({ ...checkoutData, lastName: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      value={checkoutData.email}
                      onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-foreground mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: BILLING */}
              {checkoutData.step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Billing Address</h3>
                  <div>
                    <label className="block font-bold text-foreground mb-2">Street Address *</label>
                    <input
                      type="text"
                      value={checkoutData.address}
                      onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-foreground mb-2">City *</label>
                      <input
                        type="text"
                        value={checkoutData.city}
                        onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-foreground mb-2">State *</label>
                      <input
                        type="text"
                        value={checkoutData.state}
                        onChange={(e) => setCheckoutData({ ...checkoutData, state: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="NY"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-foreground mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      value={checkoutData.zipCode}
                      onChange={(e) => setCheckoutData({ ...checkoutData, zipCode: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="10001"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT */}
              {checkoutData.step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Payment Information</h3>
                  <div>
                    <label className="block font-bold text-foreground mb-2">Cardholder Name *</label>
                    <input
                      type="text"
                      value={checkoutData.cardName}
                      onChange={(e) => setCheckoutData({ ...checkoutData, cardName: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-foreground mb-2">Card Number *</label>
                    <input
                      type="text"
                      value={checkoutData.cardNumber}
                      onChange={(e) => setCheckoutData({ ...checkoutData, cardNumber: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-foreground mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        value={checkoutData.cardExpiry}
                        onChange={(e) => setCheckoutData({ ...checkoutData, cardExpiry: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-foreground mb-2">CVC *</label>
                      <input
                        type="text"
                        value={checkoutData.cardCVC}
                        onChange={(e) => setCheckoutData({ ...checkoutData, cardCVC: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={checkoutData.step === 1}
                  className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-bold transition-all"
                >
                  ← Previous
                </button>
                {checkoutData.step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold transition-all neon-glow"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold transition-all neon-glow"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-muted rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-foreground">
                    <span className="text-sm">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-primary">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="mt-4 bg-green-50 border border-green-200 p-3 rounded-lg">
                  <p className="text-xs text-green-900">✓ Free shipping on orders over $50!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
