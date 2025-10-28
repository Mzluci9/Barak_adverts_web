# Barak Advert - Quick Editing Guide

This guide helps non-technical users edit content on the website.

## 📝 Editing Text Content

### Hero Slider Headlines
**File**: `components/HeroSlider.tsx`
**Line**: Find the `slides` array (around line 20)

\`\`\`tsx
const slides: Slide[] = [
  {
    id: 1,
    title: 'Your New Headline Here',  // ← EDIT THIS
    subtitle: 'Your new subtitle',     // ← EDIT THIS
    // ...
  },
]
\`\`\`

### Service Names & Descriptions
**File**: `components/ServicesShowcase.tsx`
**Line**: Find the `services` array (around line 20)

\`\`\`tsx
const services: Service[] = [
  {
    id: 'advertising',
    name: 'Advertising',              // ← EDIT THIS
    description: 'Your description',  // ← EDIT THIS
    // ...
  },
]
\`\`\`

### Contact Information
**File**: `components/Contact.tsx`

Find and replace:
- Phone: `+251 911 234 567`
- Email: `info@barakadvert.com`
- WhatsApp: `+251911234567`

### Footer Links
**File**: `components/Footer.tsx`

Update social media links and company information.

## 🖼️ Replacing Images

### Step 1: Prepare Your Image
- Recommended size: 1920x1080 for hero, 800x600 for products
- Format: JPG or PNG
- Optimize for web (compress if possible)

### Step 2: Upload to `/public/placeholders/`
- Use descriptive names: `hero-advertising.jpg`, `service-neon.jpg`

### Step 3: Update Component
Find the image path and replace:

\`\`\`tsx
// OLD
image: '/placeholder.svg?height=1080&width=1920'

// NEW
image: '/placeholders/hero-advertising.jpg'
\`\`\`

## 🎨 Changing Colors

**File**: `app/globals.css`

Find the `@theme inline` section:

\`\`\`css
--color-primary: #FF6A00;           /* Main orange - CHANGE THIS */
--color-primary-light: #FFB366;     /* Light orange */
--color-primary-dark: #E55A00;      /* Dark orange */
--color-background: #FFFFFF;        /* White background */
--color-foreground: #1A1A1A;        /* Dark text */
\`\`\`

Use a color picker tool to find hex codes: https://htmlcolorcodes.com/

## 💰 Updating Prices

**File**: `components/QuoteForm.tsx`

Find the `services` array:

\`\`\`tsx
const services = [
  { id: 'advertising', name: 'Advertising', basePrice: 500 },  // ← CHANGE 500
  { id: 'neon', name: 'Neon Signs', basePrice: 800 },          // ← CHANGE 800
  // ...
]
\`\`\`

## 📧 Adding Email Integration

The website has placeholders for email functionality. To enable:

1. Sign up for an email service (Resend, SendGrid, Mailgun)
2. Get your API key
3. Add to environment variables
4. Replace `TODO` comments with actual code

## 🔗 Adding New Services

**File**: `components/ServicesShowcase.tsx`

1. Add to `services` array:
\`\`\`tsx
{
  id: 'newservice',
  name: 'New Service',
  description: 'Description here',
  icon: '🎯',
  images: ['/placeholders/service1.jpg', ...],
  features: ['Feature 1', 'Feature 2'],
}
\`\`\`

2. Add to `services` array in `QuoteForm.tsx`:
\`\`\`tsx
{ id: 'newservice', name: 'New Service', basePrice: 300 }
\`\`\`

## ❓ Common Questions

**Q: How do I change the logo?**
A: Edit the "B" in `components/Header.tsx` or replace with an image.

**Q: How do I add a new page?**
A: Create a new file in the `app/` directory (e.g., `app/about/page.tsx`).

**Q: How do I change the site title?**
A: Edit `metadata.title` in `app/layout.tsx`.

**Q: How do I add social media links?**
A: Edit the social links in `components/Footer.tsx`.

---

**Need help?** Contact: info@barakadvert.com
