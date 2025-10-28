import Header from "@/components/Header"
import Checkout from "@/components/Checkout"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Checkout - Barak Advert",
  description: "Complete your purchase securely",
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Checkout />
      <Footer />
    </main>
  )
}
