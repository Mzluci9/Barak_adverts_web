import Header from "@/components/Header"
import HeroSlider from "@/components/HeroSlider"
import ServicesShowcase from "@/components/ServicesShowcase"
import FeaturedProjects from "@/components/FeaturedProjects"
import ProductConfigurator from "@/components/ProductConfigurator"
import QuoteForm from "@/components/QuoteForm"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSlider />
      <ServicesShowcase />
      <FeaturedProjects />
      <ProductConfigurator />
      <QuoteForm />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
