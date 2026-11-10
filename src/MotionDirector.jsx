import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const chapters = ['home', 'archive', 'looks', 'pick', 'rack', 'muse', 'reels', 'bridal'];

/**
 * Motion Studio: a single animation owner for scroll orchestration.
 * React owns data, buttons, and selected carousel items; CSS owns product-card
 * selection transforms. GSAP only animates wrappers, headings, and visual layers.
 *
 * ScrollTrigger scenes never pin or hijack scrolling. Native scroll and touch
 * work normally, and every timeline/listener is cleaned on unmount or resize.
 */
export default function MotionDirector({ rootRef, onChapterChange }) {
  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    const progress = root.querySelector('.reading-thread__bar');
    if (progress) {
      gsap.fromTo(progress, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.45 },
      });
    }

    const chapterNodes = chapters
      .map(id => root.querySelector(`#${id}`))
      .filter(Boolean);

    // Chapter labels remain useful in reduced-motion mode.
    chapterNodes.forEach(node => {
      const showChapter = () => onChapterChange(node.id);
      ScrollTrigger.create({
        trigger: node,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: showChapter,
        onEnterBack: showChapter,
      });
    });

    const media = gsap.matchMedia();
    media.add({
      desktop: '(min-width: 801px)',
      mobile: '(max-width: 800px)',
      motion: '(prefers-reduced-motion: no-preference)',
      finePointer: '(hover: hover) and (pointer: fine)',
    }, context => {
      const { desktop, mobile, motion, finePointer } = context.conditions;
      if (!motion) return;

      // CHAPTER 01: A cinematic but non-blocking three-beat entrance.
      const prologue = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.08 });
      prologue
        .from('.hero-kicker', { autoAlpha: 0, y: 18, duration: 0.65 })
        .from('.hero h1', { autoAlpha: 0, y: 65, duration: 1.1 }, '-=0.34')
        .from('.hero p', { autoAlpha: 0, y: 24, duration: 0.77 }, '-=0.61')
        .from('.hero-buttons .btn', { autoAlpha: 0, y: 22, duration: 0.58, stagger: 0.12 }, '-=0.42')
        .from('.hero-footnote', { autoAlpha: 0, y: 13, duration: 0.5 }, '-=0.18');

      // Camera-depth effect. The photo is GSAP-owned; the static CSS keyframes
      // on the same image are disabled in motion.css to avoid transform fights.
      gsap.fromTo('.hero-media img',
        { scale: 1.025, yPercent: 0 },
        {
          scale: desktop ? 1.17 : 1.095,
          yPercent: desktop ? 9 : 4,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
        }
      );
      if (desktop) {
        gsap.to('.ornament-one', {
          rotation: 24, y: 55, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        });
        gsap.to('.ornament-two', {
          rotation: -34, y: -65, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.15 },
        });
      }

      // Heading animations. Use the wrapper only, never the child elements
      // whose transforms are controlled by the React carousel or CSS hover.
      root.querySelectorAll('.reveal:not(.mood-card)').forEach((element) => {
        if (element.classList.contains('film-frame')) return;
        gsap.from(element, {
          autoAlpha: 0, y: mobile ? 22 : 38, duration: mobile ? 0.68 : 0.95,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 91%', once: true },
        });
      });

      // CHAPTER 02: Six temple arches rise in a single, measured wave.
      const arches = gsap.utils.toArray('.mood-arch', root);
      if (arches.length) {
        gsap.from(arches, {
          autoAlpha: 0, y: mobile ? 27 : 70, scale: 0.9,
          duration: 1.05, ease: 'power3.out',
          stagger: { each: mobile ? 0.055 : 0.105, from: 'start' },
          scrollTrigger: { trigger: '.mood-grid', start: 'top 88%', once: true },
        });
      }

      // CHAPTER 04: Photos unfold inside their existing curved product cards.
      const cardPhotos = gsap.utils.toArray('.silk-photo img', root);
      if (cardPhotos.length) {
        gsap.from(cardPhotos, {
          autoAlpha: 0, y: 37, scale: 1.12, duration: 1.0,
          ease: 'power3.out', stagger: 0.085,
          scrollTrigger: { trigger: '.silk-scroll', start: 'top 90%', once: true },
        });
      }

      // CHAPTER 05: Hanger rail drops into place with a gentle silk reveal.
      gsap.from('.rack-viewport', {
        autoAlpha: 0, y: 56, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.rack-viewport', start: 'top 88%', once: true },
      });

      // CHAPTER 06: Framed editorial film assembles as an optical centrepiece.
      gsap.from('.film-frame', {
        autoAlpha: 0, y: 38, scale: 0.93, duration: 1.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.muse-content', start: 'top 86%', once: true },
      });

      // CHAPTERS 07–08: Preserve existing carousel transforms by animating
      // their parent stages, not the currently selected product cards.
      gsap.from('.reel-arc', {
        autoAlpha: 0, y: 54, scale: 0.94, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.reel-arc', start: 'top 88%', once: true },
      });
      gsap.from('.bridal-carousel', {
        autoAlpha: 0, y: 48, scale: 0.96, duration: 1.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.bridal-carousel', start: 'top 88%', once: true },
      });

      gsap.from('.closing h2', {
        autoAlpha: 0, y: 38, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: '.closing', start: 'top 75%', once: true },
      });

      if (!finePointer) return;

      // Fine-pointer-only spotlight + bounded physical tilt. No continuous
      // animation loop, no scrolling interference, and no global listeners.
      const cards = gsap.utils.toArray('.silk-card', root);
      const cleanups = [];
      cards.forEach(card => {
        const onMove = event => {
          const r = card.getBoundingClientRect();
          const x = Math.min(1, Math.max(0, (event.clientX - r.left) / r.width));
          const y = Math.min(1, Math.max(0, (event.clientY - r.top) / r.height));
          card.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
          card.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`);
          card.style.setProperty('--tilt-x', `${((x - .5) * 7).toFixed(2)}deg`);
          card.style.setProperty('--tilt-y', `${((.5 - y) * 7).toFixed(2)}deg`);
          card.classList.add('is-tilting');
        };
        const onLeave = () => {
          card.classList.remove('is-tilting');
          card.style.setProperty('--tilt-x', '0deg');
          card.style.setProperty('--tilt-y', '0deg');
        };
        card.addEventListener('pointermove', onMove, { passive: true });
        card.addEventListener('pointerleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('pointermove', onMove);
          card.removeEventListener('pointerleave', onLeave);
          card.classList.remove('is-tilting');
        });
      });
      return () => cleanups.forEach(clean => clean());
    });

    // The enclosing useGSAP context handles ScrollTriggers and timelines.
    // matchMedia has separate resize/reduced-motion cleanup.
    return () => media.revert();
  }, { scope: rootRef });

  return null;
}
