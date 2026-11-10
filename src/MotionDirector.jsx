import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const chapters = ['home', 'archive', 'looks', 'pick', 'rack', 'gallery', 'muse', 'reels', 'bridal'];

/**
 * Every chapter has its own entrance choreography. Section timelines replay
 * when revisited, but never pin, force-scroll, or manipulate carousel items
 * whose transforms are owned by React/CSS. The app separately owns autoplay.
 */
export default function MotionDirector({ rootRef, onChapterChange }) {
  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    const progress = root.querySelector('.reading-thread__bar');
    if (progress) {
      gsap.fromTo(progress, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
      });
    }

    chapters.forEach(id => {
      const node = root.querySelector(`#${id}`);
      if (!node) return;
      ScrollTrigger.create({
        trigger: node, start: 'top 55%', end: 'bottom 55%',
        onEnter: () => onChapterChange(id),
        onEnterBack: () => onChapterChange(id),
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

      const distance = mobile ? 35 : 85;
      const base = { ease: 'power3.out', duration: mobile ? 0.75 : 1.06 };
      const createChapter = (id, beats, start = 'top 83%') => {
        const section = root.querySelector(id);
        if (!section) return;
        const timeline = gsap.timeline({ paused: true, defaults: base });
        beats.forEach(([selector, from, position]) => {
          const elements = section.querySelectorAll(selector);
          if (!elements.length) return;
          // "from" runs only when its section enters the viewport. Elements
          // remain fully visible if JS animations never start.
          timeline.from(elements, {
            autoAlpha: 0,
            ...from,
            immediateRender: false,
            clearProps: 'transform,opacity,visibility,filter',
          }, position);
        });
        ScrollTrigger.create({
          trigger: section, start, end: 'bottom 15%',
          onEnter: () => timeline.restart(),
          onEnterBack: () => timeline.restart(),
        });
      };

      // Chapter 01: the hero opens like a theatre curtain.
      const intro = gsap.timeline({ defaults: base, delay: 0.1 });
      intro
        .from('.hero-kicker', { autoAlpha: 0, x: -38, duration: 0.65, immediateRender: false })
        .from('.hero h1', { autoAlpha: 0, y: mobile ? 45 : 86, rotationX: 9, duration: 1.25, immediateRender: false }, '-=.33')
        .from('.hero p', { autoAlpha: 0, x: -32, duration: 0.78, immediateRender: false }, '-=.66')
        .from('.hero-buttons .btn', { autoAlpha: 0, y: 30, stagger: .16, duration: .68, immediateRender: false }, '-=.39')
        .from('.hero-footnote', { autoAlpha: 0, y: 15, duration: .55, immediateRender: false }, '-=.2');

      gsap.fromTo('.hero-media img', { scale: 1.025, yPercent: 0 }, {
        scale: desktop ? 1.17 : 1.095,
        yPercent: desktop ? 9 : 4, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .8 },
      });
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

      // Chapter 02: titles fly from the left, gold arches rise one by one.
      createChapter('#archive', [
        ['.archive-heading .eyebrow', { x: -distance, duration: .6 }, 0],
        ['.archive-heading h2', { x: -distance * 1.35, y: 15, duration: 1.18 }, '-=.25'],
        ['.archive-heading p', { x: distance * .65, duration: .8 }, '-=.72'],
        ['.mood-arch', { y: distance, scale: .82, rotation: -7, stagger: .12, duration: 1.15 }, '-=.46'],
        ['.mood-card strong', { y: 18, stagger: .09, duration: .6 }, '-=.78'],
        ['.archive-bottom', { y: 22, duration: .7 }, '-=.46'],
      ]);

      // Chapter 03: two opposing entrances meet around the lookbook.
      createChapter('#looks', [
        ['.looks-header', { y: -45, duration: .85 }, 0],
        ['.look-stage', { x: -distance * 1.3, rotationY: -8, duration: 1.25 }, '-=.38'],
        ['.look-panel', { x: distance * 1.2, rotationY: 8, duration: 1.25 }, '-=1.0'],
      ]);

      // Chapter 04: cards sweep in like a row of silk swatches.
      createChapter('#pick', [
        ['.pick-top', { x: distance, duration: .96 }, 0],
        ['.silk-scroll', { y: distance * 1.1, scale: .9, rotationX: 9, duration: 1.2 }, '-=.36'],
        ['.silk-photo img', { y: 32, scale: 1.11, stagger: .07, duration: .9 }, '-=.98'],
        ['.pick-hint', { y: 24, duration: .7 }, '-=.48'],
      ]);

      // Chapter 05: the chrome rail extends before the collection drops in.
      createChapter('#rack', [
        ['.rack-heading', { y: -47, duration: .9 }, 0],
        ['.rack-filters', { y: 28, duration: .75 }, '-=.45'],
        ['.rack-viewport', { y: distance, duration: 1.16 }, '-=.3'],
        ['.rack-photo-item', { autoAlpha: 0, y: 46, scale: .94, stagger: .055, duration: .92 }, '-=.85'],
      ]);

      // Chapter 06: real silk portraits fly in as an editorial photo wall.
      createChapter('#gallery', [
        ['.gallery-heading', { y: -42, duration: .86 }, 0],
        ['.gallery-tile', { autoAlpha: 0, y: 65, scale: .88, rotationY: 7, stagger: .11, duration: .95 }, '-=.32'],
        ['.gallery-texture', { autoAlpha: 0, y: 45, scale: .94, duration: 1.0 }, '-=.37'],
      ]);

      // Chapter 06: opposing image columns fly in; film zooms into focus.
      createChapter('#muse', [
        ['.muse-heading', { scale: .78, y: 38, duration: .9 }, 0],
        ['.muse-photos-left', { x: -distance, duration: 1.15 }, '-=.3'],
        ['.muse-photos-right', { x: distance, duration: 1.15 }, '<'],
        ['.film-frame', { scale: .82, y: 55, rotationY: 7, duration: 1.35 }, '-=1.02'],
        ['.muse-bottom', { y: 28, duration: .75 }, '-=.45'],
      ]);

      // Chapter 07: the arc emerges from depth; individual cards keep their
      // existing CSS/React transforms so clicking and cycling always work.
      createChapter('#reels', [
        ['.reels-head', { x: -distance, duration: .95 }, 0],
        ['.reel-arc', { scale: .69, y: 85, rotationY: -12, duration: 1.35 }, '-=.37'],
        ['.reel-note', { y: 20, duration: .7 }, '-=.5'],
      ]);

      // Chapter 08: a soft vertical reveal, like opening a bridal jewellery box.
      createChapter('#bridal', [
        ['.bridal-head', { y: -distance, scale: .89, duration: 1.04 }, 0],
        ['.bridal-carousel', { scale: .76, y: 70, rotationX: -12, duration: 1.4 }, '-=.33'],
        ['.bridal-info', { y: 52, duration: .95 }, '-=.64'],
      ]);

      // The closing vignette and footer get their own complete entrance.
      createChapter('.closing', [
        ['.closing-symbol', { y: -38, scale: .4, rotation: -60, duration: 1.1 }, 0],
        ['.closing p', { y: 30, duration: .75 }, '-=.54'],
        ['.closing h2', { y: 75, scale: .85, duration: 1.28 }, '-=.46'],
        ['.closing .btn', { y: 38, duration: .78 }, '-=.44'],
      ], 'top 86%');
      createChapter('.footer', [
        ['.footer-top', { y: 48, duration: .95 }, 0],
        ['.footer-bottom', { y: 20, duration: .7 }, '-=.35'],
      ], 'top 94%');

      // Fine pointer-only, with bounded tilt and explicit cleanup.
      if (!finePointer) return;
      const cards = gsap.utils.toArray('.silk-card', root);
      const cleanups = [];
      cards.forEach(card => {
        const move = event => {
          const r = card.getBoundingClientRect();
          const x = Math.min(1, Math.max(0, (event.clientX - r.left) / r.width));
          const y = Math.min(1, Math.max(0, (event.clientY - r.top) / r.height));
          card.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
          card.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`);
          card.style.setProperty('--tilt-x', `${((x - .5) * 7).toFixed(2)}deg`);
          card.style.setProperty('--tilt-y', `${((.5 - y) * 7).toFixed(2)}deg`);
          card.classList.add('is-tilting');
        };
        const leave = () => {
          card.classList.remove('is-tilting');
          card.style.setProperty('--tilt-x', '0deg');
          card.style.setProperty('--tilt-y', '0deg');
        };
        card.addEventListener('pointermove', move, { passive: true });
        card.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          card.removeEventListener('pointermove', move);
          card.removeEventListener('pointerleave', leave);
          card.classList.remove('is-tilting');
        });
      });
      return () => cleanups.forEach(clean => clean());
    });

    return () => media.revert();
  }, { scope: rootRef });
  return null;
}
