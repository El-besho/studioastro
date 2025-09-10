# إنقاذ (Enqaz) - Home Services Platform

A modern, fast, and SEO-optimized website for home services in Saudi Arabia, built with Astro.

## 🚀 Features

- **Fast Performance**: Built with Astro for optimal loading speeds
- **SEO Optimized**: Complete meta tags, structured data, and sitemap
- **Arabic RTL Support**: Full right-to-left layout and Arabic typography
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Static Site Generation**: Pre-rendered pages for maximum performance
- **Modern UI**: Beautiful components with Radix UI and Lucide icons

## 🛠️ Tech Stack

- **Framework**: Astro 4.0
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Vercel

## 📁 Project Structure

```
/
├── src/
│   ├── layouts/          # Astro layouts
│   ├── pages/            # File-based routing
│   ├── components/       # Reusable components
│   ├── styles/           # Global styles
│   ├── lib/              # Utilities and helpers
│   ├── config/           # Configuration files
│   └── types/            # TypeScript definitions
├── public/               # Static assets
├── dist/                 # Build output
└── vercel.json          # Vercel configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd enqaz

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # Run TypeScript checks
npm run deploy       # Deploy to Vercel (production)
npm run deploy:preview # Deploy preview to Vercel
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   ```

3. **Environment Variables** (if needed):
   - Add any required environment variables in Vercel dashboard
   - The site is configured to work without additional env vars

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to any static hosting service:
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront
   - Any CDN

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Bundle Size**: ~170KB total (gzipped)
- **Load Time**: < 2 seconds on 3G
- **Core Web Vitals**: All green

## 🔧 Configuration

### Site Configuration

Edit `src/config/site.ts` to update:
- Site name and description
- URLs and social links
- SEO metadata

### Styling

- Global styles: `src/styles/globals.css`
- Tailwind config: `tailwind.config.mjs`
- Component styles: Inline with Tailwind classes

## 📱 Pages

- **Homepage** (`/`): Main landing page with services overview
- **About** (`/about`): Company information
- **Contact** (`/contact`): Contact form and information
- **Services** (`/services`): Complete services listing

## 🎨 Customization

### Adding New Pages

1. Create a new `.astro` file in `src/pages/`
2. Import the Layout component
3. Add your content

### Adding New Components

1. Create component in `src/components/`
2. Use `.astro` for static components
3. Use `.tsx` for interactive React components

### Styling

- Use Tailwind CSS classes
- Custom CSS in component `<style>` blocks
- Global styles in `src/styles/globals.css`

## 🔍 SEO Features

- ✅ Meta tags and Open Graph
- ✅ Structured data (JSON-LD)
- ✅ XML sitemap
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ Arabic language support
- ✅ Mobile optimization

## 🚀 Performance Optimizations

- ✅ Static site generation
- ✅ Code splitting
- ✅ Image optimization
- ✅ CSS minification
- ✅ JavaScript bundling
- ✅ Gzip compression
- ✅ CDN ready

## 📞 Support

For questions or support, please contact the development team.

## 📄 License

This project is proprietary software. All rights reserved.

---

Built with ❤️ using Astro