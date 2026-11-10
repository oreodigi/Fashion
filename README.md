# NOOLAM · Silk Saree Fashion Showcase

Interactive editorial showcase inspired by the design brief and screenshots shared in [alagappan567/noolam-saree-showcase](https://github.com/alagappan567/noolam-saree-showcase). The reference repo contains **screenshots and prompts, not executable source code**. This is an independently implemented Vite/React front end.

**Live preview:** https://tejum.in/fashion/

## What works
- Ten responsive sections: hero, archive, Try the Look, Pick a Silk, photographic saree rack, editorial gallery, motion lookbook, editorial reels, bridal collection and closing.
- Interactive look changer, filterable photographic rack featuring 24 illustrative styles, product details, demo-size selection, wishlist, and shopping bag.
- Local browser persistence of saved items and bag.
- Editorial motion experience based on still images. There are no actual films or video files in the original reference.
- Desktop and mobile layouts, hover effects, reduced-motion support and keyboard Escape for overlays.

## Motion Studio enhancement

The motion system is deliberately split between:
- `src/MotionDirector.jsx`: GSAP + ScrollTrigger chapter tracking, hero camera depth, staged entrances, collection/reel/bridal reveals, and fine-pointer tilt listeners. Animations are React-scoped with `@gsap/react`, and listeners/contexts are reverted on unmount or media-query change.
- `src/motion.css`: visual lighting, highlight treatments, CSS-only hover/press feedback, and reduced-motion styles.
- `src/photography.css`: responsive real-photo rack, gallery mosaic and photographic closing scene.
- `src/App.jsx`: stateful wishlist, bag, filters and selected carousel items. Existing React interactions remain the source of truth.

No scroll-jacking, pinning, WebGL engine or custom RAF loop was introduced. Motion is restricted on touch/mobile and disabled for `prefers-reduced-motion` where ornamental. The scroll progress indicator still conveys useful position.

## Saree photography and catalog
- **31 hand-selected Pexels photographs**, optimized to ~2.9 MB total WebP, committed under `public/images/` and served locally at `/fashion/images/`.
- 24 sample catalog entries cover silk sarees, bridal zari, occasion looks and blouse styling, with a filterable photo rack and eight-image editorial gallery.
- A visible [image credits page](https://tejum.in/fashion/photo-credits.html) links to the source files and explains permitted editorial demonstration use.
- Images depict **illustrative styles only**: the pictured people do not endorse NOOLAM, and the clothing is not claimed to be actual inventory. Replace images and invented prices with your brand's licensed product photography before enabling a real storefront.

## Build
```bash
npm ci
npm run build
```

Vite's base path is `/fashion/` and its output is `dist/`.

## Deployment
- cPanel account: `tejum` on `server.tejum.cloud`
- Dedicated Git checkout: `/home/tejum/fashion-source`
- Web root: `/home/tejum/public_html/fashion`
- Branch: `main`
- Run `bash /home/tejum/fashion-source/deploy.sh` to fetch, build, and deploy.
- A dedicated cPanel-user cron entry checks GitHub every 5 minutes and deploys only when `main` has changed.
- Only the `/fashion` directory is synchronized. The `tejum.in` main website is not modified.

## Important preview limitations
This is a design demonstrator, **not an operating ecommerce store**. The products, inventory, sizes, prices, bag, styling bundle, and showroom are illustrative; checkout, payments, shipping, bookings and backend integrations are not active. Motion lookbooks and reels are image-led animations, not actual video content.

Example photographs use freely available Pexels and Unsplash photography. Sources/licenses: [Pexels](https://www.pexels.com/license/) and [Unsplash](https://unsplash.com/license). Replace all sample imagery and pricing with approved business assets prior to a commercial launch.
