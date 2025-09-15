# 🚀 Shreya Srivastava - Frontend Engineer Portfolio

A modern, responsive portfolio website built with React, TypeScript, and the latest web technologies, showcasing cutting-edge design trends and best practices in frontend development.

## 🌟 Features

### ✨ Modern Design & UX
- **Responsive Design**: Seamlessly adapts to all screen sizes and devices
- **Smooth Animations**: Powered by Framer Motion for fluid, professional animations
- **Glass Morphism**: Modern glassmorphic design elements with backdrop blur effects
- **Gradient Typography**: Eye-catching gradient text effects and modern typography
- **Interactive Elements**: Hover effects, micro-interactions, and engaging user feedback

### 🛠 Technical Excellence
- **React 19**: Latest React features with functional components and hooks
- **TypeScript**: Fully typed for better development experience and code quality
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Professional-grade animations and transitions
- **Modern Icons**: Lucide React for consistent, beautiful iconography
- **Performance Optimized**: Fast loading times and optimized bundle size

### 📱 Sections
1. **Hero Section**: Compelling introduction with animated elements
2. **About**: Personal story, skills overview, and statistics
3. **Experience**: Professional timeline with detailed achievements
4. **Projects**: Showcase of featured work with live demos and source code
5. **Skills**: Comprehensive technical skills with visual progress indicators
6. **Contact**: Interactive contact form with social links

## 🎨 Design Philosophy

This portfolio follows modern web design trends favored by top tech companies:

- **Minimalist Aesthetic**: Clean, uncluttered design focusing on content
- **Accessibility First**: WCAG compliant with proper color contrast and keyboard navigation
- **Performance Focused**: Optimized for Core Web Vitals and user experience
- **Mobile First**: Responsive design ensuring perfect mobile experience
- **Brand Consistency**: Cohesive color scheme and typography throughout

## 🚀 Technologies Used

### Frontend
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type safety and enhanced developer experience
- **Vite 7.1.2** - Lightning-fast build tool and dev server

### Styling & Design
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization
- **Custom CSS Variables** - Dark/light theme support foundation
- **Google Fonts (Inter)** - Modern, readable typography

### Animations & Interactions
- **Framer Motion** - Production-ready animations and gestures
- **CSS Transforms** - Hardware-accelerated animations
- **Intersection Observer** - Scroll-triggered animations

### Icons & Assets
- **Lucide React** - Modern, consistent icon library
- **Custom SVG Graphics** - Optimized vector graphics

### Development Tools
- **ESLint** - Code linting and style enforcement
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React SWC** - Fast React refresh with SWC

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git

# Navigate to the project directory
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_EMAIL_SERVICE_ID=your_email_service_id
VITE_EMAIL_TEMPLATE_ID=your_email_template_id
VITE_EMAIL_PUBLIC_KEY=your_email_public_key
```

### Customization
1. **Personal Information**: Update content in each component file
2. **Colors & Theming**: Modify `tailwind.config.js` for brand colors
3. **Animations**: Adjust Framer Motion variants in component files
4. **Content**: Replace placeholder text with your actual information

## 📱 Browser Support

- ✅ Chrome/Chromium (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Metrics

Target metrics for optimal user experience:
- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🏗 Project Structure

```
src/
├── components/          # React components
│   ├── Navigation.tsx   # Header navigation with smooth scrolling
│   ├── Hero.tsx        # Landing section with animations
│   ├── About.tsx       # About section with stats
│   ├── Experience.tsx  # Professional timeline
│   ├── Projects.tsx    # Project showcase
│   ├── Skills.tsx      # Technical skills display
│   ├── Contact.tsx     # Contact form and info
│   └── Footer.tsx      # Footer with links
├── hooks/              # Custom React hooks
│   └── useActiveSection.ts  # Scroll position tracking
├── assets/            # Static assets
├── App.tsx           # Main application component
├── main.tsx         # Application entry point
└── index.css       # Global styles and Tailwind imports
```

## 🎨 Color Palette

```css
/* Primary Colors */
--blue-500: #3B82F6
--blue-600: #2563EB
--indigo-500: #6366F1
--indigo-600: #4F46E5
--purple-500: #8B5CF6
--purple-600: #7C3AED

/* Neutral Colors */
--gray-50: #F9FAFB
--gray-100: #F3F4F6
--gray-900: #111827
--white: #FFFFFF
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the `dist` folder to Netlify
```

### GitHub Pages
```bash
npm install -g gh-pages
npm run build
gh-pages -d dist
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/portfolio/issues).

## 📧 Contact

- **Email**: shreya.srivastava@gmail.com
- **LinkedIn**: [linkedin.com/in/shreyasrivastava](https://linkedin.com/in/shreyasrivastava)
- **GitHub**: [github.com/shreyasrivastava](https://github.com/shreyasrivastava)

---

⭐ Star this repository if you found it helpful!

## 📈 Development Best Practices Implemented

- **Component-based Architecture**: Modular, reusable components
- **Custom Hooks**: Separation of concerns and logic reusability
- **TypeScript Integration**: Type safety throughout the application
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimization**: Code splitting and lazy loading ready
- **SEO Optimization**: Semantic HTML and meta tags
- **Accessibility**: ARIA labels, keyboard navigation, color contrast
- **Clean Code**: Consistent formatting, naming conventions, and documentation

This portfolio demonstrates proficiency in modern frontend development practices and would be an excellent showcase for applications to top tech companies like Google, Meta, Amazon, and Atlassian.
