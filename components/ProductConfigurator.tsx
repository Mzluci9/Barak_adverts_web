"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { sendEmailWithAttachment, formatProductDesignData } from "@/lib/email-utils"
import html2canvas from "html2canvas"

/**
 * COMPONENT: ProductConfigurator
 * PURPOSE: Interactive product customizer for T-shirts and mugs
 * EDIT: Change product options, colors, or text
 * IMPORTANT: This is a mockup - integrate with real design API for actual image generation
 */

interface ProductConfig {
  type: "tshirt" | "mug"
  color: string
  text: string
  design: string
}

const colors = [
  { name: "White", value: "#FFFFFF", hex: "white" },
  { name: "Black", value: "#000000", hex: "black" },
  { name: "Orange", value: "#FF6A00", hex: "orange" },
  { name: "Gray", value: "#808080", hex: "gray" },
]

const designs = [
  { name: "Logo", value: "logo" },
  { name: "Text", value: "text" },
  { name: "Pattern", value: "pattern" },
]

export default function ProductConfigurator() {
  const [config, setConfig] = useState<ProductConfig>({
    type: "tshirt",
    color: "#FFFFFF",
    text: "Your Brand",
    design: "logo",
  })
  const [isSending, setIsSending] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleDownloadDesignImage = async () => {
    setIsDownloading(true)
    try {
      if (!previewRef.current) return

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      })

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `design-${config.type}-${Date.now()}.png`
      link.click()
      alert("Design image downloaded successfully!")
    } catch (error) {
      console.error("Error downloading design:", error)
      alert("Failed to download design image. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  const handleSendDesign = async () => {
    setIsSending(true)
    try {
      const emailData = {
        to: "designs@barakadvert.com",
        subject: `New ${config.type === "tshirt" ? "T-Shirt" : "Mug"} Design Submission`,
        type: "product-design" as const,
        data: formatProductDesignData(config),
      }

      const result = await sendEmailWithAttachment(emailData)

      if (result.success) {
        alert("Design sent successfully! Check your email for confirmation.")
      } else {
        alert("Failed to send design. Please try again.")
      }
    } catch (error) {
      console.error("Error sending design:", error)
      alert("An error occurred while sending your design.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Design Your Product</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Customize your t-shirt or mug and send your design directly to us
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* PRODUCT PREVIEW */}
          <div className="flex flex-col items-center">
            <div ref={previewRef} className="relative w-full max-w-sm aspect-square mb-8">
              {config.type === "tshirt" ? (
                <div className="relative w-full h-full flex items-center justify-center bg-muted rounded-lg">
                  <Image
                    src={`/tshirt-mockup-.jpg?height=400&width=400&query=tshirt mockup ${config.color} color`}
                    alt="T-shirt preview"
                    fill
                    className="object-contain"
                  />
                  <div
                    className="absolute text-center font-bold text-2xl"
                    style={{ color: config.color === "#FFFFFF" ? "#000" : "#FFF" }}
                  >
                    {config.text}
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center bg-muted rounded-lg">
                  <Image
                    src={`/mug-mockup-.jpg?height=400&width=400&query=mug mockup ${config.color} color`}
                    alt="Mug preview"
                    fill
                    className="object-contain"
                  />
                  <div
                    className="absolute text-center font-bold text-lg"
                    style={{ color: config.color === "#FFFFFF" ? "#000" : "#FFF" }}
                  >
                    {config.text}
                  </div>
                </div>
              )}
            </div>

            {/* PRODUCT TYPE SELECTOR */}
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setConfig({ ...config, type: "tshirt" })}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  config.type === "tshirt" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"
                }`}
              >
                👕 T-Shirt
              </button>
              <button
                onClick={() => setConfig({ ...config, type: "mug" })}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  config.type === "mug" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"
                }`}
              >
                ☕ Mug
              </button>
            </div>
          </div>

          {/* CUSTOMIZATION OPTIONS */}
          <div className="space-y-6">
            {/* COLOR SELECTOR */}
            <div>
              <label className="block font-bold text-foreground mb-3">Choose Color:</label>
              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setConfig({ ...config, color: color.value })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      config.color === color.value ? "border-primary scale-105" : "border-border hover:border-primary"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    <span className="text-xs font-bold" style={{ color: color.value === "#FFFFFF" ? "#000" : "#FFF" }}>
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* TEXT INPUT */}
            <div>
              <label className="block font-bold text-foreground mb-3">Custom Text:</label>
              <input
                type="text"
                value={config.text}
                onChange={(e) => setConfig({ ...config, text: e.target.value })}
                maxLength={20}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Enter your text"
              />
            </div>

            {/* DESIGN SELECTOR */}
            <div>
              <label className="block font-bold text-foreground mb-3">Design Style:</label>
              <div className="grid grid-cols-3 gap-3">
                {designs.map((design) => (
                  <button
                    key={design.value}
                    onClick={() => setConfig({ ...config, design: design.value })}
                    className={`py-3 rounded-lg font-bold transition-all ${
                      config.design === design.value
                        ? "bg-primary text-white"
                        : "bg-muted text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {design.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-6">
              <button
                onClick={handleSendDesign}
                disabled={isSending}
                className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all neon-glow"
              >
                {isSending ? "Sending..." : "📧 Send Design via Email"}
              </button>
              <button
                onClick={handleDownloadDesignImage}
                disabled={isDownloading}
                className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? "Downloading..." : "🖼️ Download Design as Image"}
              </button>
            </div>

            {/* INFO TEXT */}
            <p className="text-sm text-muted-foreground">
              ℹ️ Your design will be sent to our team for review and production. We'll contact you within 24 hours with a
              quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
