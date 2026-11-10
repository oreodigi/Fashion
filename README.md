# NOOLAM · Silk Saree Fashion Showcase

Interactive editorial showcase inspired by the design brief and screenshots shared in [alagappan567/noolam-saree-showcase](https://github.com/alagappan567/noolam-saree-showcase). The reference repo contains **screenshots and prompts, not executable source code**. This is an independently implemented Vite/React front end.

**Live preview:** https://tejum.in/fashion/

## What works
- Nine responsive sections: hero, archive, Try the Look, Pick a Silk, product rack, motion lookbook, editorial reels, bridal collection and closing.
- Interactive look changer, filterable product rack, product details, demo-size selection, wishlist, and shopping bag.
- Local browser persistence of saved items and bag.
- Editorial motion experience based on still images. There are no actual films or video files in the original reference.
- Desktop and mobile layouts, hover effects, reduced-motion support and keyboard Escape for overlays.

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
