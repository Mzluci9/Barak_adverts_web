# Barak Advert - Full Showcase Website

A production-ready, fully responsive website showcasing Barak Advert's complete printing & sign services. Features a futuristic orange & white theme, interactive elements, and comprehensive service offerings.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:8080`

## 🎨 Design System

### Colors
- **Primary Orange**: `#FF6A00` (HSL: 24 100% 50%)
- **Hover Orange**: `#FF8533` (HSL: 24 100% 60%)
- **White**: `#FFFFFF`
- **Dark Charcoal**: `#2D2D2D` (HSL: 0 0% 18%)

### Customizing Colors
All colors are defined in `src/index.css` as CSS custom properties. To change the color scheme:

1. Open `src/index.css`
2. Find the `:root` section (around line 10)
3. Modify the HSL values for your desired colors
4. Example: `--primary: 24 100% 50%;` (Hue Saturation Lightness)

**Important**: Always use HSL values, never HEX or RGB!

### Typography
- **Font Family**: Inter and Poppins (loaded via system fonts)
- **Headings**: Bold weight
- **Body**: Regular weight

## 📁 Project Structure

```
/
├── src/
│   ├── assets/               # AI-generated placeholder images
│   │   ├── hero-advertising.jpg
│   │   ├── hero-neon.jpg
│   │   ├── hero-lightbox.jpg
│   │   ├── hero-tshirt.jpg
│   │   ├── hero-mug.jpg
│   │   ├── hero-giftshop.jpg
│   │   ├── service-id.jpg
│   │   └── service-cape.jpg
│   ├── components/           # Reusable UI components
│   │   ├── Navigation.tsx    # Fixed navigation header
│   │   ├── HeroSlider.tsx    # Auto-rotating hero slider
│   │   ├── ServicesGrid.tsx  # 12 services display
│   │   ├── Portfolio.tsx     # Filterable portfolio gallery
│   │   ├── ProductConfigurator.tsx  # T-shirt/Mug customizer
│   │   ├── QuoteForm.tsx     # Multi-step quote request
│   │   ├── About.tsx         # Company information
│   │   ├── Contact.tsx       # Contact info with map
│   │   └── Footer.tsx        # Footer with links
│   ├── pages/
│   │   └── Index.tsx         # Main homepage (combines all sections)
│   ├── index.css             # Design system & global styles
│   └── main.tsx              # App entry point
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
└── index.html                # HTML entry with SEO meta tags
```

## ✏️ How to Edit Content

### 1. Changing Hero Slider Images

**Location**: `src/components/HeroSlider.tsx`

1. Add your images to `src/assets/`
2. Import them at the top of the file
3. Update the `slides` array (around line 27):

```typescript
const slides = [
  {
    image: yourNewImage,
    title: "Your Headline",
    description: "Your description text",
    alt: "Image description for accessibility"
  },
  // ... more slides
];
```

**To change auto-rotation speed**: Edit `SLIDE_INTERVAL` constant (line 18)

### 2. Editing Services

**Location**: `src/components/ServicesGrid.tsx`

Find the `services` array (around line 17) and modify:

```typescript
const services = [
  {
    icon: Megaphone,  // Choose from lucide-react icons
    title: "Your Service Name",
    description: "Service description text",
    color: "text-primary"
  },
  // ... more services
];
```

### 3. Updating Portfolio Items

**Location**: `src/components/Portfolio.tsx`

Edit the `portfolioItems` array (around line 18):

```typescript
const portfolioItems = [
  {
    id: 1,
    title: "Project Name",
    category: "Neon",  // Must match a category
    image: "/path/to/image.jpg",
    description: "Project details",
    tags: ["Tag1", "Tag2"]
  },
  // ... more items
];
```

### 4. Modifying Quote Form

**Location**: `src/components/QuoteForm.tsx`

- **Services**: Edit `serviceOptions` array (line 25)
- **Pricing**: Update `calculateEstimate` function (line 35)
- **Urgent fee**: Change `URGENT_FEE` constant (line 22)

### 5. Contact Information

**Location**: `src/components/Contact.tsx`

Update the `contactInfo` array (around line 18):

```typescript
const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567"
  },
  // ... more contact methods
];
```

**To change map location**: Replace the iframe `src` URL (around line 80)

### 6. Navigation Links

**Location**: `src/components/Navigation.tsx`

Edit `navLinks` array (line 15):

```typescript
const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  // ... more links
];
```

## 🖼️ Replacing Images

### Method 1: Replace Existing Files
Simply replace the image files in `src/assets/` with your own images using the same filename.

### Method 2: Add New Images
1. Add your image to `src/assets/`
2. Import it in the component:
   ```typescript
   import myImage from "@/assets/my-image.jpg";
   ```
3. Use it in your JSX:
   ```typescript
   <img src={myImage} alt="Description" />
   ```

## 🎯 Interactive Features

### Product Configurator
- **Location**: `src/components/ProductConfigurator.tsx`
- Add products: Edit `products` array (line 18)
- Add colors: Edit `colorOptions` array (line 33)
- Change pricing: Modify `basePrice` values

### Quote Calculator
- **Location**: `src/components/QuoteForm.tsx`
- Pricing logic is in `calculateEstimate` function
- Currently uses mock values - marked with `TODO:` comments
- Replace with real pricing API when ready

## 🔧 Technical Details

### Built With
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons
- **Shadcn/ui** - UI components

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Breakpoints
- **Mobile**: ≤640px
- **Tablet**: 641px - 1024px
- **Desktop**: ≥1025px

## 🎨 Customizing Styles

### Tailwind Configuration
Edit `tailwind.config.ts` to customize:
- Screen breakpoints
- Container sizes
- Extended utilities

### Global Styles
Edit `src/index.css` for:
- CSS custom properties
- Animations
- Base styles

### Component Styles
Each component uses Tailwind classes. To modify:
1. Find the component in `src/components/`
2. Edit the `className` attributes
3. Use design system tokens (e.g., `bg-primary`, `text-primary`)

## 📱 Mobile Optimization

- All components are fully responsive
- Touch-friendly interactive elements
- Optimized images with lazy loading
- Mobile-first design approach

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Alt text on all images

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deployment Options
- **Vercel**: Connect your Git repository
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Push to gh-pages branch
- **Traditional hosting**: Upload `dist/` folder via FTP

## 📝 Editing Checklist

When customizing the site, update:
- [ ] Hero slider images and text
- [ ] Services descriptions
- [ ] Portfolio items with your projects
- [ ] Contact information (phone, email, address)
- [ ] Map location
- [ ] Social media links in footer
- [ ] Company description in About section
- [ ] Business hours
- [ ] Payment options (if different)
- [ ] SEO meta tags in `index.html`

## 🐛 Troubleshooting

### Images not loading?
- Ensure images are in `src/assets/` folder
- Check import paths are correct
- Verify image file extensions match

### Styles not applying?
- Tailwind classes must be exact (no dynamic strings)
- Check design system tokens in `index.css`
- Clear browser cache

### Build errors?
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors in the console
- Ensure all imports are correct

## 📞 Support

For questions or issues:
1. Check component comments for inline documentation
2. Review this README
3. Contact the development team

## 📄 License

Copyright © 2025 Barak Advert. All rights reserved.

---

**Made with ❤️ by the Lovable team**
