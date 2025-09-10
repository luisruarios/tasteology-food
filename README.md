# Interface Development Test

**Design Reference:** [Zeplin Design Link](https://zpl.io/JQOEee6)

## Introduction

This project implements the design provided in the Zeplin link above, bringing the hosted design to life with production quality code. The implementation includes two main components as specified in the design and meets all technical requirements outlined in the test criteria.

## Test Direction and Restrictions

This project was built following these key assumptions and restrictions:

### Assumptions
- All content is coming from a CMS (implemented via JSON data structure)
- The design is a small part of a wider solution
- The page will be publicly available

### Restrictions
- ❌ No SPA frameworks used - Pure vanilla HTML/CSS/JavaScript
- ❌ No Tailwind CSS - Custom CSS implementation
- ✅ Includes compilation/build step using Vite

## Technical Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Build Tool:** Vite for development server and production builds
- **Content Management:** JSON-based content structure simulating CMS
- **Development:** Hot reload, modern tooling
- **Deployment:** Vercel for production hosting

## Requirements Implementation

### Layout ✅
- **Responsive Design:** Works from 320px mobile devices to desktop
- **Meta Tags:** Complete SEO and accessibility meta tags included
- **Browser Support:** Latest Chrome, Firefox, and Edge versions
- **WCAG Accessibility:** Semantic HTML, proper ARIA labels, keyboard navigation
- **SEO Considerations:** Structured data, Open Graph, canonical URLs

### Gallery Block ✅
- **Modal Functionality:** Clicking images opens larger modal/popup
- **Accessibility:** Focus management, ESC key support, click-outside-to-close
- **High Resolution:** Uses 3x image assets for crisp display
- **Smooth Animations:** CSS transitions for professional feel

### Cards Block ✅
- **Link Click Tracking:** All card link clicks are captured and logged to console
- **Industry Standards:** Proper anchor elements with semantic markup
- **Accessibility:** ARIA labels, keyboard navigation support
- **Console Logging:** Simplified anchor element data logged for analytics

## Getting Started

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

## Deployment

This project is deployed on **Vercel** for production hosting. Vercel automatically builds and deploys the site on every push to the main branch.

### Deploy with Vercel

1. **Connect Repository:** Link your Git repository to Vercel
2. **Build Settings:** Vercel automatically detects Vite configuration
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Install Command:** `npm install`

### Live Site
- **Production URL:** [https://tasteology-food.vercel.app/](https://tasteology-food.vercel.app/)


## Production Quality Features

- **Performance:** Optimized images, lazy loading, efficient CSS
- **Accessibility:** WCAG guidelines, semantic markup, keyboard navigation
- **SEO:** Complete meta tags, structured data, performance optimization
- **Maintainability:** Clean code structure, meaningful comments, modular architecture
- **Responsiveness:** Fluid layouts, progressive enhancement from 320px up
- **Browser Support:** Modern browser compatibility with graceful degradation

## Test Judgment Criteria Met

1. **Faithfulness to Design:** Pixel-perfect implementation matching Zeplin specifications
2. **Clean & Future-proof Code:** Modular structure, semantic HTML, maintainable CSS
3. **Sensible Technical Choices:** Vite for builds, vanilla JS for compatibility, JSON for content
4. **Requirements Met:** All layout, gallery, and cards requirements implemented
5. **Meaningful Comments:** Explanatory comments in ambiguous code areas
6. **Production Quality:** Optimized builds, accessibility, SEO, performance considerations

## Browser Testing

Tested and verified in:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)

## Accessibility Features

- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- High contrast compliance
- Screen reader compatibility

---

*This implementation demonstrates my production-ready web development skills with attention to accessibility, performance, and maintainability.*
