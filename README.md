# Guanghan Li - Personal Portfolio

A minimalist, high-performance personal portfolio website showcasing my projects, skills, and professional experience.

## 🚀 Features

- **Minimalist Design**: Clean, professional aesthetic with modern UI/UX
- **Responsive**: Mobile-first design that works on all devices
- **Fast Performance**: Optimized for < 2s load times
- **Dynamic Content**: JSON-based content management for easy updates
- **Animations**: Smooth scroll reveals and typing animation
- **Accessible**: WCAG 2.1 AA compliant

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS variables
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Google Fonts**: Outfit & Roboto

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Core styles
│   ├── responsive.css      # Media queries
│   └── animations.css      # Keyframes
├── js/
│   ├── main.js             # Main functionality
│   ├── projects.js         # Project rendering
│   └── form-handler.js     # Contact form
├── data/
│   ├── projects.json       # Project data
│   ├── experience.json     # Work experience
│   └── skills.json         # Skills list
└── assets/
    ├── images/             # Project screenshots
    ├── icons/              # SVG icons
    └── resume/             # Resume PDFs
```

## 🎨 Customization

### Updating Content

All content is stored in JSON files in the `data/` directory:

1. **Projects** (`data/projects.json`): Add/edit project information
2. **Experience** (`data/experience.json`): Update work history
3. **Skills** (`data/skills.json`): Modify skill categories

Simply edit these files and refresh - no code changes needed!

### Updating Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --color-bg: #020c1b;
    --color-primary: #0a192f;
    --color-secondary: #64ffda;
    --color-text: #8892b0;
    --color-text-bright: #e6f1ff;
}
```

## 🚀 Local Development

1. Clone the repository
2. Open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

3. Visit `http://localhost:8000`

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy (no build configuration needed)

### Manual Deployment

Simply upload all files to any static hosting service (Netlify, GitHub Pages, etc.)

## ✅ Performance Checklist

- [x] Semantic HTML5
- [x] Lazy loading for images
- [x] Minified CSS/JS (for production)
- [x] Optimized images (WebP format)
- [x] Accessibility features (ARIA labels, keyboard navigation)

## 📝 License

© 2025 Guanghan Li. All rights reserved.

## 📧 Contact

- Email: Guanghanli90@gmail.com
- Phone: (415) 604-7028

---

Built with ❤️ by Guanghan Li
This repository will serve as my personal portfolio, showcasing my projects and skills.
