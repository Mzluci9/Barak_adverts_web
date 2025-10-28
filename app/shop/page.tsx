import Header from "@/components/Header"
import Shop from "@/components/Shop"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Shop - Barak Advert",
  description: "Browse our collection of branded merchandise and custom products",
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Shop />
      <Footer />
    </main>
  )
}
