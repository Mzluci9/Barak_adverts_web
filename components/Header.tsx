"use client"

/**
 * COMPONENT: Header
 * PURPOSE: Navigation bar with scroll-hide behavior + mobile menu
 * NOTE: Safe to update links, logo, scroll behavior visuals, etc.
 */

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  // Menu open/close state (mobile)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Show/hide navbar on scroll
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  /** Smooth scroll to top/hero section */
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const heroSection = document.querySelector("section")
    heroSection?.scrollIntoView({ behavior: "smooth" })
  }

  /** Scroll to "Request Quote" section */
  const handleRequestQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const quoteSection = document.getElementById("quote")
    quoteSection?.scrollIntoView({ behavior: "smooth" })
  }

  // Scroll listener: hides navbar on scroll down, shows on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Reveal when scrolling up
      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      // Hide when scrolling down past 100px
      else if (currentScrollY > 100) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  /** Main nav items */
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
      className={`
        fixed top-0 z-50 w-full backdrop-blur-sm bg-transparent
        transition-transform duration-300
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP BAR */}
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/barak-logo.jpg"
              alt="Barak Advert Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="hidden sm:inline font-bold text-xl text-orange-400">
              Barak Advert
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className="text-white font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* DESKTOP CTA BUTTON */}
          <button
            onClick={handleRequestQuoteClick}
            className="
              hidden md:block bg-primary text-white px-6 py-2 rounded-lg
              font-medium transition-colors hover:bg-primary-dark
            "
          >
            Request Quote
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {isMenuOpen && (
          <nav className="md:hidden p-4 pb-4 flex flex-col gap-2 bg-black/80 rounded-lg">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className="
                  text-white py-2 px-4 rounded-lg
                  transition-colors hover:text-primary hover:bg-white/10
                "
              >
                {link.label}
              </a>
            ))}

            {/* MOBILE CTA */}
            <button
              onClick={handleRequestQuoteClick}
              className="
                w-full mt-2 bg-primary text-white px-6 py-2 rounded-lg
                font-medium transition-colors hover:bg-primary-dark
              "
            >
              Request Quote
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
