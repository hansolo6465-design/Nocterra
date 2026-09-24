# NOCTERRA — Premium Spirits Brand Concept

NOCTERRA is a fictional premium spirits brand website concept built as a cinematic, scroll-driven experience.

The project focuses on:

- Premium editorial typography
- Dark luxury visual direction
- Responsive layouts
- Three.js interactive 3D bottle-inspired sculpture
- GSAP entrance and scroll animations
- Mobile navigation
- Reduced-motion accessibility support
- Separate HTML, CSS, and JavaScript files

> This is a visual and development concept. It does not include alcohol sales, ordering, age-verification processing, or product purchasing.

## Preview

Open `index.html` in a browser or deploy the project using a static hosting provider.

## Project Structure

```text
nocterra-site/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Technologies

- HTML5
- CSS3
- JavaScript
- Three.js
- GSAP
- ScrollTrigger
- Google Fonts

## Run Locally

### Option 1: Simple browser preview

Open `index.html` directly in your browser.

### Option 2: Local development server

If you have Node.js installed:

```bash
npx serve .
```

Then open the local URL shown in the terminal.

## Deployment

You can deploy this static website using:

- GitHub Pages
- Vercel
- Netlify

For Vercel:

1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md`.
3. Import the repository into Vercel.
4. Use the default static deployment settings.
5. Deploy.

## Design Direction

The visual direction combines:

- Obsidian backgrounds
- Warm champagne accents
- Editorial serif typography
- Minimal navigation
- Large-scale type
- Product-inspired 3D forms
- Restrained animation

## Customization

### Change the brand name

Update the brand name in `index.html`.

### Change colors

Edit the CSS variables at the top of `style.css`:

```css
:root {
  --ink: #171512;
  --cream: #e9e2d5;
  --gold: #c7a56a;
}
```

### Change the 3D object

The Three.js scene is in `script.js`. You can adjust:

- Geometry
- Materials
- Lighting
- Camera position
- Rotation
- Particle count

### Change animations

GSAP animations are at the bottom of `script.js`.

## Notes

The current 3D scene uses procedural geometry rather than external product images. This keeps the prototype lightweight and makes it easier to customize.

For production, optimize 3D assets, compress media, test mobile performance, and add proper accessibility and error handling.

## License

This project is a personal concept template. Add your own license and branding terms before distributing it publicly.
