# Barak Advert - Professional Printing & Sign Services Website

A modern, fully responsive website showcasing printing and sign services with interactive features, product configurators, and quote management.

## 🚀 Quick Start

### Installation

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd barak-advert

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
\`\`\`

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
barak-advert/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles and design tokens
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── HeroSlider.tsx      # Auto-rotating hero slider
│   ├── ServicesShowcase.tsx # Services with tabs and galleries
│   ├── FeaturedProjects.tsx # Portfolio with filters
│   ├── ProductConfigurator.tsx # T-shirt/Mug customizer
│   ├── QuoteForm.tsx       # Multi-step quote form
│   ├── About.tsx           # About section
│   ├── Contact.tsx         # Contact information
│   └── Footer.tsx          # Footer
├── public/
│   └── placeholders/       # AI-generated placeholder images
└── README.md               # This file
\`\`\`

## 🎨 Customization Guide

### Change Colors

Edit the design tokens in `app/globals.css`:

\`\`\`css
@theme inline {
  --color-primary: #FF6A00;           /* Main orange */
  --color-primary-light: #FFB366;     /* Light orange */
  --color-primary-dark: #E55A00;      /* Dark orange */
  --color-background: #FFFFFF;        /* White */
  --color-foreground: #1A1A1A;        /* Dark text */
}
\`\`\`

### Change Fonts

Edit `app/layout.tsx` to import different fonts from Google Fonts:

\`\`\`tsx
import { Cute_Font as YourFont } from 'next/font/google'

const yourFont = YourFont({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sans',
})
\`\`\`

### Replace Images

1. Place your images in `/public/placeholders/`
2. Update image paths in components:
   - Hero slides: `components/HeroSlider.tsx`
   - Services: `components/ServicesShowcase.tsx`
   - Portfolio: `components/FeaturedProjects.tsx`

### Edit Content

- **Hero Slider**: Edit `slides` array in `components/HeroSlider.tsx`
- **Services**: Edit `services` array in `components/ServicesShowcase.tsx`
- **Portfolio**: Edit `projects` array in `components/FeaturedProjects.tsx`
- **Contact Info**: Edit `components/Contact.tsx`
- **Footer**: Edit `components/Footer.tsx`

## 🔧 Features

- ✅ Auto-rotating hero slider with keyboard/touch controls
- ✅ Service showcase with embedded galleries
- ✅ Filterable portfolio with lightbox
- ✅ Interactive product configurator (T-shirt & Mug)
- ✅ Multi-step quote form with price calculator
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessibility features (ARIA, semantic HTML, keyboard navigation)
- ✅ SEO optimized with meta tags
- ✅ Neon glow effects for visual appeal

## 📧 Email Integration

The following components have TODO placeholders for email API integration:

- `ProductConfigurator.tsx` - Send design via email
- `QuoteForm.tsx` - Submit quote request
- `Contact.tsx` - Contact form submission

To integrate:

1. Choose an email service (SendGrid, Mailgun, Resend, etc.)
2. Add API key to environment variables
3. Replace `TODO` comments with actual API calls

Example with Resend:

\`\`\`tsx
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'noreply@barakadvert.com',
  to: formData.email,
  subject: 'Your Design Submission',
  html: '<h1>Thank you for your submission!</h1>',
})
\`\`\`

## 🎯 Performance Tips

- Images use Next.js Image component for optimization
- Lazy loading on portfolio items
- CSS utilities for minimal bundle size
- Tailwind CSS v4 for efficient styling

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels on interactive components
- Keyboard navigation support
- Focus states on all interactive elements
- Color contrast meets WCAG AA standards

## 📱 Responsive Breakpoints

- Mobile: ≤ 640px
- Tablet: 641px - 1024px
- Desktop: ≥ 1025px

## 🔐 Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Validate all form inputs on the server
- Sanitize user-generated content

## 📝 License

This project is proprietary to Barak Advert.

## 🤝 Support

For questions or issues, contact: info@barakadvert.com

---

**Last Updated**: October 2024
**Version**: 1.0.0
