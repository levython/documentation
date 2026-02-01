# Levython Documentation Website

A modern, professional documentation website for Levython - the high-performance programming language with x86-64 JIT compilation.

## 🚀 Quick Start

### View Locally

**Option 1: Direct File**
```bash
open index.html
```

**Option 2: Local Server (Recommended)**
```bash
# Using Python
python3 -m http.server 8000

# Using PHP
php -S localhost:8000

# Using Node.js (if you have http-server installed)
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

## 📁 Structure

```
docs/
├── index.html      # Main documentation page
├── styles.css      # Complete design system
├── script.js       # Interactive features
└── README.md       # This file
```

## ✨ Features

- **Modern Dark Theme** - Premium design with glassmorphism effects
- **Comprehensive Documentation** - All Levython features covered
- **Interactive Code Examples** - Syntax highlighting with copy buttons
- **Search Functionality** - Real-time search through docs
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Fade-ins, slide-ins, and hover effects
- **Performance Benchmarks** - Visual comparison with other languages

## 🎨 Design Highlights

- **Glassmorphism** - Frosted glass cards and panels
- **Gradient Text** - Blue-to-cyan gradients for headings
- **Custom Syntax Highlighting** - Levython-specific code highlighting
- **Smooth Scrolling** - Animated navigation between sections
- **Mobile Menu** - Responsive hamburger navigation

## 📚 Documentation Sections

1. **Getting Started**
   - Installation
   - Quick Start
   - VS Code Extension

2. **Language Basics**
   - Variables
   - Functions
   - Conditionals
   - Loops
   - Lists & Strings

3. **Advanced Features**
   - Memory Operations
   - Bitwise Operations
   - Tensor Operations
   - SIMD Vectorization
   - File I/O

4. **Package Manager (LPM)**
   - Overview
   - Commands
   - Available Packages

5. **Reference**
   - Performance Benchmarks
   - Examples
   - API Reference
   - CLI Options

## 🌐 Deployment

### GitHub Pages

1. Push to GitHub:
   ```bash
   git add docs/
   git commit -m "Add documentation website"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages
   - Select source: `main` branch, `/docs` folder
   - Save

### Netlify

1. Drag and drop the `docs/` folder to [Netlify](https://app.netlify.com/drop)
2. Or connect your GitHub repository

### Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd docs
   vercel
   ```

## 🛠️ Customization

### Colors

Edit `styles.css` variables:
```css
:root {
  --primary: #3B82F6;      /* Main blue */
  --accent: #06B6D4;       /* Cyan accent */
  --bg-primary: #0a0e17;   /* Background */
}
```

### Content

Edit `index.html` to modify:
- Documentation sections
- Code examples
- Links and navigation

### Features

Edit `script.js` to customize:
- Search behavior
- Animations
- Interactive features

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 📄 License

MIT License - Same as Levython

---

**Made with ❤️ for the Levython community**
# documentation
# documentation
