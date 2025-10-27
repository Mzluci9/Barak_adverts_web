/*
 * component: ProductConfigurator.tsx
 * purpose: Interactive T-shirt and Mug product preview configurator
 * 
 * EDIT INSTRUCTIONS:
 * - Add more products: Edit the 'products' array (lines 18-30)
 * - Add color options: Update 'colorOptions' array (line 33)
 * - Change preview images: Update image paths in products array
 */

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Palette, Type } from "lucide-react";

// EDIT: Product configurations
const products = [
  { id: "tshirt", name: "T-Shirt", basePrice: 15, image: "/placeholder.svg" },
  { id: "mug", name: "Ceramic Mug", basePrice: 10, image: "/placeholder.svg" }
];

// EDIT: Available colors
const colorOptions = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Orange", hex: "#FF6A00" },
  { name: "Black", hex: "#000000" },
  { name: "Navy", hex: "#1E3A8A" },
  { name: "Red", hex: "#DC2626" }
];

const ProductConfigurator = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [customText, setCustomText] = useState("");
  const [quantity, setQuantity] = useState(1);

  const totalPrice = selectedProduct.basePrice * quantity;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Design Your <span className="text-primary">Product</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Customize your t-shirts and mugs with our interactive configurator.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Preview Area */}
          <Card className="shadow-orange">
            <CardContent className="p-8">
              <div 
                className="aspect-square rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: selectedColor.hex }}
              >
                <div className="text-center">
                  {customText ? (
                    <p 
                      className="text-4xl font-bold p-6"
                      style={{ 
                        color: selectedColor.hex === "#FFFFFF" ? "#000000" : "#FFFFFF",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                      }}
                    >
                      {customText}
                    </p>
                  ) : (
                    <div className="text-muted-foreground/30 text-xl">
                      Your design will appear here
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  {quantity} × ${selectedProduct.basePrice.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Options */}
          <Card className="shadow-orange">
            <CardContent className="p-8 space-y-6">
              {/* Product Selection */}
              <div>
                <Label className="text-lg flex items-center gap-2 mb-3">
                  <Palette className="w-5 h-5" />
                  Select Product
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedProduct.id === product.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-muted-foreground">${product.basePrice}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <Label className="text-lg mb-3 block">Choose Color</Label>
                <div className="flex gap-3 flex-wrap">
                  {colorOptions.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        selectedColor.hex === color.hex
                          ? "border-primary scale-110"
                          : "border-border hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{selectedColor.name}</p>
              </div>

              {/* Custom Text */}
              <div>
                <Label htmlFor="customText" className="text-lg flex items-center gap-2 mb-3">
                  <Type className="w-5 h-5" />
                  Add Text
                </Label>
                <Input
                  id="customText"
                  placeholder="Enter your custom text..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {customText.length}/50 characters
                </p>
              </div>

              {/* Quantity */}
              <div>
                <Label htmlFor="quantity" className="text-lg mb-3 block">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  max={1000}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>

              {/* Add to Quote Button */}
              <Button 
                className="w-full shadow-orange"
                size="lg"
                onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Add to Quote Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductConfigurator;
