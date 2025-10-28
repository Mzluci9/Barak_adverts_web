/**
 * EMAIL UTILITY FUNCTIONS
 * PURPOSE: Handle email sending for all sections (shop, quote, product configurator, etc.)
 * EDIT: Replace with your actual email service (Resend, SendGrid, Mailgun, etc.)
 * TODO: Integrate with your email API endpoint
 */

export interface EmailData {
  to: string
  subject: string
  type: "quote" | "product-design" | "shop-order" | "contact"
  data: Record<string, any>
}

/**
 * Send email with attachment
 * This is a placeholder function - replace with your actual email service
 */
export async function sendEmailWithAttachment(emailData: EmailData) {
  try {
    // TODO: Replace this with your actual email API endpoint
    // Example: const response = await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(emailData) })

    console.log("[Email] Sending email:", emailData)

    // Placeholder: Create a downloadable JSON file as fallback
    const dataStr = JSON.stringify(emailData.data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${emailData.type}-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)

    return { success: true, message: "Email data prepared and downloaded" }
  } catch (error) {
    console.error("[Email] Error sending email:", error)
    return { success: false, message: "Failed to send email" }
  }
}

/**
 * Format quote data for email
 */
export function formatQuoteData(formData: any) {
  return {
    timestamp: new Date().toISOString(),
    type: "Quote Request",
    ...formData,
  }
}

/**
 * Format product design data for email
 */
export function formatProductDesignData(config: any, imageData?: string) {
  return {
    timestamp: new Date().toISOString(),
    type: "Product Design",
    ...config,
    designImage: imageData || "Design preview image",
  }
}

/**
 * Format shop order data for email
 */
export function formatShopOrderData(cart: any, total: number) {
  return {
    timestamp: new Date().toISOString(),
    type: "Shop Order",
    items: cart,
    total,
    orderNumber: `ORD-${Date.now()}`,
  }
}

/**
 * Format contact form data for email
 */
export function formatContactData(formData: any) {
  return {
    timestamp: new Date().toISOString(),
    type: "Contact Form",
    ...formData,
  }
}
