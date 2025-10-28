"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { sendEmailWithAttachment, formatShopOrderData } from "@/lib/email-utils"

/**
 * COMPONENT: Shop
 * PURPOSE: Product catalog with filtering and cart management
 * EDIT: Add or remove products in the products array
 * IMPORTANT: Cart state is managed locally - integrate with backend for persistence
 */

export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  description: string
  inStock: boolean
}

const products: Product[] = [
  {
    id: "tshirt-classic",
    name: "Classic T-Shirt",
    price: 25,
    category: "apparel",
    image: "/classic-tshirt.png",
    description: "High-quality cotton t-shirt perfect for branding",
    inStock: true,
  },
  {
    id: "tshirt-premium",
    name: "Premium T-Shirt",
    price: 35,
    category: "apparel",
    image: "/premium-tshirt.png",
    description: "Premium blend t-shirt with superior comfort",
    inStock: true,
  },
  {
    id: "mug-ceramic",
    name: "Ceramic Mug",
    price: 12,
    category: "drinkware",
    image: "/ceramic-mug.png",
    description: "Classic ceramic mug for hot beverages",
    inStock: true,
  },
  {
    id: "mug-travel",
    name: "Travel Mug",
    price: 18,
    category: "drinkware",
    image: "/stainless-steel-travel-mug.png",
    description: "Insulated travel mug keeps drinks hot or cold",
    inStock: true,
  },
  {
    id: "hoodie-classic",
    name: "Classic Hoodie",
    price: 45,
    category: "apparel",
    image: "/cozy-hoodie.png",
    description: "Comfortable hoodie for any season",
    inStock: true,
  },
  {
    id: "cap-baseball",
    name: "Baseball Cap",
    price: 20,
    category: "accessories",
    image: "/baseball-cap.png",
    description: "Classic baseball cap with adjustable strap",
    inStock: true,
  },
  {
    id: "bottle-water",
    name: "Water Bottle",
    price: 22,
    category: "drinkware",
    image: "/reusable-water-bottle.png",
    description: "Eco-friendly water bottle with custom branding",
    inStock: true,
  },
  {
    id: "bag-tote",
    name: "Tote Bag",
    price: 28,
    category: "accessories",
    image: "/simple-canvas-tote.png",
    description: "Spacious tote bag perfect for shopping or events",
    inStock: true,
  },
]

interface CartItem extends Product {
  quantity: number
}

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [showCart, setShowCart] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const categories = ["all", "apparel", "drinkware", "accessories"]
  const filteredProducts = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory)

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleSaveOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }

    setIsProcessing(true)
    try {
      const emailData = {
        to: "orders@barakadvert.com",
        subject: `New Shop Order - ${cartCount} items`,
        type: "shop-order" as const,
        data: formatShopOrderData(cart, cartTotal),
      }

      const result = await sendEmailWithAttachment(emailData)

      if (result.success) {
        alert("Order saved and sent! Check your email for confirmation.")
        setCart([])
        setShowCart(false)
      } else {
        alert("Failed to save order. Please try again.")
      }
    } catch (error) {
      console.error("Error saving order:", error)
      alert("An error occurred while saving your order.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <section id="shop" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Shop</h2>
            <p className="text-lg text-muted-foreground">Browse our collection of branded merchandise</p>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-all font-bold"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* SIDEBAR - FILTERS */}
          <div className="lg:col-span-1">
            <div className="bg-muted rounded-lg p-6 sticky top-24">
              <h3 className="font-bold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all capitalize ${
                      activeCategory === category
                        ? "bg-primary text-white font-bold"
                        : "text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {category === "all" ? "All Products" : category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3">
            {/* PRODUCTS GRID */}
            {!showCart ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-muted rounded-lg overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative w-full h-64 bg-background">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">${product.price}</span>
                        <button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className="bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-bold transition-all"
                        >
                          {product.inStock ? "Add" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* CART VIEW */
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">Shopping Cart</h3>
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
                    <button
                      onClick={() => setShowCart(false)}
                      className="text-primary hover:text-primary-dark font-bold"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-background rounded-lg p-4 flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">${item.price} each</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-muted hover:bg-primary hover:text-white px-2 py-1 rounded transition-all"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-muted hover:bg-primary hover:text-white px-2 py-1 rounded transition-all"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold text-foreground w-20 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* CART SUMMARY */}
                    <div className="border-t border-border pt-4 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-foreground">Total:</span>
                        <span className="text-3xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
                      </div>
                      <Link
                        href="/checkout"
                        className="block w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold transition-all text-center neon-glow mb-2"
                      >
                        Proceed to Checkout
                      </Link>
                      <button
                        onClick={handleSaveOrder}
                        disabled={isProcessing}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all mb-2"
                      >
                        {isProcessing ? "Saving..." : "📧 Save & Email Order"}
                      </button>
                      <button
                        onClick={() => setShowCart(false)}
                        className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-bold transition-all"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
