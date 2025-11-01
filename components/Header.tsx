"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const heroSection = document.querySelector("section")
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleRequestQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const quoteSection = document.getElementById("quote")
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > 100) {
        // Only hide after scrolling past 100px
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { label: "Home", href: "#", onClick: handleHomeClick },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-transparent backdrop-blur-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO - Using uploaded Barak Advert logo image */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/barak-logo.jpg" alt="Barak Advert Logo" width={40} height={40} className="h-10 w-auto" />
            <span className="font-bold text-xl text-black hidden sm:inline">Barak Advert</span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className="text-white hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA BUTTON */}
          <button
            onClick={handleRequestQuoteClick}
            className="hidden md:block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            Request Quote
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2 bg-black/80 rounded-lg p-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className="text-white hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={handleRequestQuoteClick}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium w-full mt-2"
            >
              Request Quote
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
