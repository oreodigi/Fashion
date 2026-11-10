import React, { useEffect, useMemo, useRef, useState } from 'react';
import MotionDirector from './MotionDirector.jsx';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Heart, Instagram, MapPin, Menu, Minus, MoveHorizontal, Pause, Play, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';

// Verified Pexels photography is self-hosted as compact WebP assets.
const localImages = new Set([28943610,37597721,33608805,36523508,29172772,24650534,31232391,35108807,28058182,15181110,37597037,28044200,35108853,35108770,35212993,28058207,19119326,14664844,26587818,37597739,29478717,35108804,40837810,31957369,35108820,28058263,6786973,37706758,35212992,7589447,28135779]);
const img = (id, width = 900) => localImages.has(Number(id))
  ? `/fashion/images/${id}.webp`
  : String(id).startsWith('u:')
    ? `https://images.unsplash.com/photo-${String(id).slice(2)}?auto=format&fit=crop&w=${width}&q=82`
    : `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
const money = amount => '₹' + amount.toLocaleString('en-IN');
const products = [
  { id:"kanchi-rani", name:"Kanchi Rani", subtitle:"Sunlit orange heritage silk", price:32400, category:"Silk Sarees", fabric:"Kanchipuram-inspired silk", color:"#c5794e", image:28943610 },
  { id:"temple-bloom", name:"Temple Bloom", subtitle:"The red bridal edit", price:58900, category:"Zari & Brocade", fabric:"Wedding zari drape", color:"#9f3129", image:37597721 },
  { id:"rose-muhurtham", name:"Rose Muhurtham", subtitle:"Tradition in vermilion", price:46800, category:"Silk Sarees", fabric:"Ceremonial silk", color:"#c95b36", image:33608805 },
  { id:"ivory-mist", name:"Ivory Mist", subtitle:"A pastel heirloom", price:22900, category:"Half Sarees", fabric:"Soft pastel silk", color:"#d2b2ab", image:36523508 },
  { id:"midnight-zari", name:"Midnight Zari", subtitle:"Black silk after dark", price:28100, category:"Blouses", fabric:"Statement blouse and saree", color:"#252023", image:29172772 },
  { id:"meher", name:"Meher Heritage", subtitle:"White and green zari", price:36900, category:"Checked Sarees", fabric:"Traditional zari silk", color:"#64795f", image:24650534 },
  { id:"royal-vermillion", name:"Royal Vermillion", subtitle:"A wedding heirloom", price:62500, category:"Zari & Brocade", fabric:"Bridal silk inspiration", color:"#952f2b", image:31232391 },
  { id:"gulabi", name:"Gulabi Glow", subtitle:"A rose-pink celebration", price:26800, category:"Half Sarees", fabric:"Pink occasion silk", color:"#c58b9f", image:35108807 },
  { id:"violet-arch", name:"Violet Arch", subtitle:"An evening in lavender", price:29900, category:"Silk Sarees", fabric:"Lavender draped silk", color:"#765b95", image:28058182 },
  { id:"royal-amber", name:"Royal Amber", subtitle:"Golden bridal moments", price:54400, category:"Zari & Brocade", fabric:"Warm gold silk", color:"#d99c48", image:15181110 },
  { id:"timeless-ruby", name:"Timeless Ruby", subtitle:"Crimson wedding traditions", price:43600, category:"Silk Sarees", fabric:"Festive red silk", color:"#a02c31", image:37597037 },
  { id:"golden-hour", name:"Golden Hour", subtitle:"Subtle blush zari", price:21800, category:"Checked Sarees", fabric:"Pastel zari weave", color:"#ca9e83", image:28044200 },
  { id:"mint-jasmine", name:"Mint Jasmine", subtitle:"Mint silk and rose zari", price:34200, category:"Silk Sarees", fabric:"Mint and blush silk", color:"#7bb3ad", image:35108853 },
  { id:"emerald-temple", name:"Emerald Temple", subtitle:"The green bridal story", price:38900, category:"Checked Sarees", fabric:"Green ceremonial silk", color:"#517458", image:35212993 },
  { id:"lavender-mist", name:"Lavender Mist", subtitle:"Lavender silk in bloom", price:26400, category:"Half Sarees", fabric:"Soft violet silk", color:"#a08aac", image:28058207 },
  { id:"indigo-raga", name:"Indigo Raga", subtitle:"A midnight-blue drape", price:32500, category:"Silk Sarees", fabric:"Deep blue festive saree", color:"#365173", image:19119326 },
  { id:"sindoor-stories", name:"Sindoor Stories", subtitle:"Red and ivory traditions", price:47900, category:"Zari & Brocade", fabric:"Red border heritage silk", color:"#bc5a4f", image:14664844 },
  { id:"peacock-drape", name:"Peacock Drape", subtitle:"Teal with embroidered blouse", price:34900, category:"Silk Sarees", fabric:"Peacock blue occasion silk", color:"#317b78", image:26587818 },
  { id:"garden-vermillion", name:"Garden Vermillion", subtitle:"A garden wedding edit", price:53500, category:"Zari & Brocade", fabric:"Red bridal silk", color:"#a13731", image:37597739 },
  { id:"rose-gold-katha", name:"Rose Gold Katha", subtitle:"Soft pink with festive zari", price:29800, category:"Silk Sarees", fabric:"Pink and ivory saree", color:"#bb8f92", image:29478717 },
  { id:"lotus-pink", name:"Lotus Pink", subtitle:"A pink blouse-and-saree look", price:25700, category:"Blouses", fabric:"Silk blouse styling", color:"#d6a4b1", image:35108804 },
  { id:"mauve-heirloom", name:"Mauve Heirloom", subtitle:"A romantic festive drape", price:29600, category:"Half Sarees", fabric:"Mauve soft silk", color:"#917d91", image:31957369 },
  { id:"pearl-blush", name:"Pearl Blush", subtitle:"Understated pink satin-silk", price:31900, category:"Silk Sarees", fabric:"Blush silk", color:"#bb9c9e", image:35108820 },
  { id:"amethyst-dusk", name:"Amethyst Dusk", subtitle:"Deep purple silk story", price:32200, category:"Silk Sarees", fabric:"Amethyst purple drape", color:"#754f79", image:28058263 },
];
const moods = [
  ['The Wedding Edit',37597721],['Kanchipuram Icons',28943610],['Banarasi Heirlooms',24650534],
  ['Festive Radiance',35108807],['Zari Signatures',35212993],['The Bridal Edit',31232391],
];
const silkCards = [
  {id:'violet-arch',label:'VIOLET ARCH',bg:'#6b2c86'},
  {id:'peacock-drape',label:'PEACOCK SILK',bg:'#276f6e'},
  {id:'kanchi-rani',label:'KANCHI RANI',bg:'#d79b47'},
  {id:'rose-muhurtham',label:'ROSE GARDEN',bg:'#a42441'},
  {id:'royal-vermillion',label:'THE ROYAL',bg:'#a57429'},
  {id:'mint-jasmine',label:'MINT JASMINE',bg:'#497d66'},
];
const filters = ['All pieces','Silk Sarees','Half Sarees','Blouses','Checked Sarees','Zari & Brocade'];
const links = [['Home','home'],['Try the Look','looks'],['Pick a Silk','pick'],['The Rack','rack'],['Gallery','gallery'],['The Muse','muse'],['Bridal','bridal']];
const storyChapters = [['01','home','Prologue'],['02','archive','The Archive'],['03','looks','Try the Look'],['04','pick','Pick a Silk'],['05','rack','The Rail'],['06','gallery','The Gallery'],['07','muse','The Muse'],['08','reels','Silk in Motion'],['09','bridal','Bridal']];
const savedRead = key => {try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }};

function Mark({ small=false }) {
 return <span className={`brand ${small?'brand-small':''}`}><span className="brand-crest">✦</span><span className="brand-word">NOOLAM<span className="brand-sub">KANCHIPURAM SILK</span></span></span>;
}
function IconButton({children,onClick,label,className=''}) { return <button type="button" className={`icon-button ${className}`} aria-label={label} onClick={onClick}>{children}</button>; }
function SectionTag({children}) {return <div className="eyebrow"><span></span>{children}</div>;}
function ProductImage({product,width=700,className=''}) {return <img className={className} src={img(product.image,width)} alt={product.name+' saree collection photograph'} loading="lazy" decoding="async" />;}

// A single interval per visible chapter. The callback ref prevents an interval
// restarting after every React carousel update.
function useVisibleAutoplay(active, delay, onTick) {
 const tickRef=useRef(onTick);
 tickRef.current=onTick;
 useEffect(()=>{
   if(!active)return;
   const timer=window.setInterval(()=>tickRef.current(),delay);
   return()=>window.clearInterval(timer);
 },[active,delay]);
}

// Native finger swipe: horizontal movement changes a card while vertical
// movement remains available for scrolling the page. No scroll-jacking.
function useSwipe(onSwipe) {
 const start=useRef(null);
 const lastSwipe=useRef(0);
 const callback=useRef(onSwipe);
 callback.current=onSwipe;
 return {
   handlers:{
     onTouchStart:event=>{
       const touch=event.touches[0];
       if(touch)start.current={x:touch.clientX,y:touch.clientY};
     },
     onTouchEnd:event=>{
       const begin=start.current;
       start.current=null;
       const touch=event.changedTouches[0];
       if(!begin || !touch)return;
       const dx=touch.clientX-begin.x;
       const dy=touch.clientY-begin.y;
       if(Math.abs(dx)<42 || Math.abs(dx)<Math.abs(dy)*1.25)return;
       lastSwipe.current=Date.now();
       callback.current(dx<0?1:-1);
     },
     onTouchCancel:()=>{start.current=null;}
   },
   wasJustSwiped:()=>Date.now()-lastSwipe.current<450,
 };
}

export default function App() {
 const siteRef=useRef(null);
 // The parent ref is attached after child layout effects in React.
 // Mount GSAP only after this parent has committed its DOM reference.
 const [motionReady,setMotionReady]=useState(false);
 const silkScrollRef=useRef(null);
 const rackViewportRef=useRef(null);
 const rackSwipeOriginRef=useRef(0);
 const [activeChapter,setActiveChapter]=useState('home');
 const [visibleSections,setVisibleSections]=useState({});
 const [manualSections,setManualSections]=useState({});
 const [autoplayEnabled,setAutoplayEnabled]=useState(true);
 const [motionAllowed,setMotionAllowed]=useState(true);
 const [pageVisible,setPageVisible]=useState(true);
 const [activeMood,setActiveMood]=useState(0);
 const [activeRack,setActiveRack]=useState(0);
 const [scrolled,setScrolled]=useState(false);
 const [menuOpen,setMenuOpen]=useState(false);
 const [drawer,setDrawer]=useState('');
 const [wishlist,setWishlist]=useState(()=>savedRead('noolam-wishlist'));
 const [cart,setCart]=useState(()=>savedRead('noolam-cart'));
 const [toast,setToast]=useState('');
 const [activeLook,setActiveLook]=useState(0);
 const [rackFilter,setRackFilter]=useState('All pieces');
 const [detail,setDetail]=useState(null);
 const [detailSize,setDetailSize]=useState('');
 const [detailView,setDetailView]=useState('Front');
 const [filmOn,setFilmOn]=useState(true);
 const [filmFrame,setFilmFrame]=useState(0);
 const [reelIndex,setReelIndex]=useState(2);
 const [reelOpen,setReelOpen]=useState(false);
 const [bridalIndex,setBridalIndex]=useState(1);
 const [visitOpen,setVisitOpen]=useState(false);
 const [reelOn,setReelOn]=useState(false);
 useEffect(()=>{setMotionReady(Boolean(siteRef.current));},[]);
 useEffect(()=>{localStorage.setItem('noolam-cart',JSON.stringify(cart));},[cart]);
 useEffect(()=>{localStorage.setItem('noolam-wishlist',JSON.stringify(wishlist));},[wishlist]);
 useEffect(()=>{
   const onScroll=()=>setScrolled(window.scrollY>40);
   window.addEventListener('scroll',onScroll,{passive:true});onScroll();
   return ()=>window.removeEventListener('scroll',onScroll);
 },[]);
 // Visibility is section-based, not scroll-position polling. All auto
 // sequences stop when backgrounded or if reduced motion is requested.
 useEffect(()=>{
   const media=window.matchMedia('(prefers-reduced-motion: reduce)');
   const updateMotion=()=>setMotionAllowed(!media.matches);
   const updateVisibility=()=>setPageVisible(!document.hidden);
   updateMotion();
   updateVisibility();
   media.addEventListener('change',updateMotion);
   document.addEventListener('visibilitychange',updateVisibility);
   const observer=new IntersectionObserver(entries=>{
     setVisibleSections(previous=>{
       let next=null;
       entries.forEach(entry=>{
         const visible=entry.isIntersecting && entry.intersectionRatio>=0.16;
         const key=entry.target.id;
         if(previous[key]!==visible){
           if(!next)next={...previous};
           next[key]=visible;
         }
       });
       return next||previous;
     });
   },{threshold:[0,0.16,0.3],rootMargin:'-8% 0px -13% 0px'});
   storyChapters.forEach(([,id])=>{
     const section=document.getElementById(id);
     if(section)observer.observe(section);
   });
   return()=>{
     observer.disconnect();
     media.removeEventListener('change',updateMotion);
     document.removeEventListener('visibilitychange',updateVisibility);
   };
 },[]);
 useEffect(()=>{const close=e=>{if(e.key==='Escape'){setDetail(null);setDrawer('');setMenuOpen(false);setReelOpen(false);setVisitOpen(false);}};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2800);return()=>clearTimeout(t);},[toast]);
 const wishlistItems=useMemo(()=>products.filter(p=>wishlist.includes(p.id)),[wishlist]);
 const bagCount=cart.reduce((total,item)=>total+item.qty,0);
 const bagTotal=cart.reduce((total,item)=>total+item.price*item.qty,0);
 const currentLook=products[activeLook];
 const lookBundle=currentLook.price+15400;
 const railProducts=rackFilter==='All pieces'?products:products.filter(p=>p.category===rackFilter);
 const bridal=[products[1],products[6],products[9],products[10],products[18]];
 const reels=[products[17],products[15],products[19],products[14],products[21]];
 const filmImages=[products[12],products[16],products[20],products[23]];
 const galleryProducts=[products[13],products[14],products[16],products[19],products[17],products[22],products[23],products[21]];
 const pauseSection=id=>setManualSections(previous=>previous[id]?previous:{...previous,[id]:true});
 const toggleAutoplay=()=>{
   if(!autoplayEnabled)setManualSections({});
   setAutoplayEnabled(previous=>!previous);
 };
 const canAutoplay=autoplayEnabled && motionAllowed && pageVisible && !drawer && !detail && !reelOpen && !visitOpen && !menuOpen;

 useVisibleAutoplay(canAutoplay && visibleSections.archive && !manualSections.archive,2300,
   ()=>setActiveMood(i=>(i+1)%moods.length));
 useVisibleAutoplay(canAutoplay && visibleSections.looks && !manualSections.looks,4100,
   ()=>setActiveLook(i=>(i+1)%8));
 useVisibleAutoplay(canAutoplay && visibleSections.pick && !manualSections.pick,3500,()=>{
   const scroller=silkScrollRef.current;
   if(!scroller)return;
   const card=scroller.querySelector('.silk-card');
   const max=scroller.scrollWidth-scroller.clientWidth;
   if(!card || max<=10)return;
   const step=card.getBoundingClientRect().width+18;
   const next=scroller.scrollLeft+step;
   scroller.scrollTo({left:next>=max-12?0:next,behavior:'smooth'});
 });
 useVisibleAutoplay(canAutoplay && visibleSections.rack && !manualSections.rack,2400,
   ()=>setActiveRack(i=>(i+1)%Math.max(1,railProducts.length)));
 useVisibleAutoplay(canAutoplay && visibleSections.muse && filmOn,3500,
   ()=>setFilmFrame(i=>(i+1)%filmImages.length));
 useVisibleAutoplay(canAutoplay && visibleSections.reels && !manualSections.reels,4200,
   ()=>setReelIndex(i=>(i+1)%reels.length));
 useVisibleAutoplay(canAutoplay && visibleSections.bridal && !manualSections.bridal,4700,
   ()=>setBridalIndex(i=>(i+1)%bridal.length));
 useVisibleAutoplay(pageVisible && motionAllowed && reelOpen && reelOn,4000,
   ()=>setReelIndex(i=>(i+1)%reels.length));

 useEffect(()=>{
   if(!canAutoplay || !visibleSections.rack || manualSections.rack)return;
   const viewport=rackViewportRef.current;
   const garment=viewport?.querySelectorAll('.rack-item')[activeRack];
   if(!viewport || !garment)return;
   viewport.scrollTo({
     left:Math.max(0,garment.offsetLeft-viewport.clientWidth/2+garment.clientWidth/2),
     behavior:'smooth'
   });
 },[activeRack,canAutoplay,visibleSections.rack,manualSections.rack,rackFilter]);

 const notify=message=>setToast(message);
 const toggleWish=id=>setWishlist(prev=>prev.includes(id)?prev.filter(v=>v!==id):[...prev,id]);
 const addToBag=(item)=>{
   setCart(prev=>{const existing=prev.find(p=>p.id===item.id);return existing?prev.map(p=>p.id===item.id?{...p,qty:p.qty+1}:p):[...prev,{id:item.id,name:item.name,price:item.price,image:item.image,qty:1}];});
   setDrawer('bag');notify('Added to your bag');
 };
 const changeQty=(id,delta)=>setCart(prev=>prev.map(p=>p.id===id?{...p,qty:p.qty+delta}:p).filter(p=>p.qty>0));
 const openDetail=p=>{setDetail(p);setDetailSize(p.category==='Blouses'?'':'Free size');setDetailView('Front');};
 const goTo=id=>{setMenuOpen(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'});};
 const prevLook=()=>{pauseSection('looks');setActiveLook(i=>(i+7)%8);};
 const nextLook=()=>{pauseSection('looks');setActiveLook(i=>(i+1)%8);};
 const lookSwipe=useSwipe(direction=>{pauseSection('looks');setActiveLook(i=>(i+direction+8)%8);});
 const reelSwipe=useSwipe(direction=>{pauseSection('reels');setReelIndex(i=>(i+direction+reels.length)%reels.length);});
 const bridalSwipe=useSwipe(direction=>{pauseSection('bridal');setBridalIndex(i=>(i+direction+bridal.length)%bridal.length);});
 const museSwipe=useSwipe(direction=>{setFilmOn(false);setFilmFrame(i=>(i+direction+filmImages.length)%filmImages.length);});
 const rackSwipe=useSwipe(direction=>{
   pauseSection('rack');
   const el=rackViewportRef.current;
   if(!el)return;
   // Native horizontal scrolling takes priority; fall back only if a swipe
   // did not move the rail (for example while a scripted scroll was ending).
   if(Math.abs(el.scrollLeft-rackSwipeOriginRef.current)<20){
     el.scrollBy({left:direction*185,behavior:'smooth'});
   }
 });
 const stopRackAutoScroll=()=>{
   pauseSection('rack');
   const el=rackViewportRef.current;
   if(el)el.scrollTo({left:el.scrollLeft,behavior:'instant'});
 };
 return <div className="site" ref={siteRef}>
   {motionReady && <MotionDirector rootRef={siteRef} onChapterChange={setActiveChapter}/>}
   <div className="reading-thread" aria-hidden="true"><span className="reading-thread__bar"/></div>
   <nav className="chapter-nav" aria-label="Explore showcase chapters">{storyChapters.map(([number,id,label])=><button key={id} type="button" className={activeChapter===id?'is-current':''} aria-current={activeChapter===id?'location':undefined} aria-label={`Go to ${label}`} onClick={()=>goTo(id)}><span className="chapter-nav__label">{label}</span><span className="chapter-nav__number">{number}</span><span className="chapter-nav__dot"/></button>)}</nav>
   <header className={`site-header ${scrolled?'is-scrolled':''}`}>
     <div className="nav-shell">
       <button className="brand-button" onClick={()=>goTo('home')} aria-label="NOOLAM home"><Mark /></button>
       <nav className={`site-nav ${menuOpen?'nav-open':''}`} aria-label="Main navigation">
         {links.map(([label,id])=><button key={id} onClick={()=>goTo(id)} className={id==='home'?'nav-home':''}>{label}</button>)}
       </nav>
       <div className="nav-actions">
         <button type="button" className="autoplay-toggle" aria-pressed={autoplayEnabled && motionAllowed} aria-label={autoplayEnabled && motionAllowed?'Pause automatic animations':'Play automatic animations'} title={motionAllowed?'Toggle automatic animations':'Automatic animations follow your reduced-motion setting'} onClick={toggleAutoplay}>{autoplayEnabled && motionAllowed?<Pause size={16}/>:<Play size={16}/>}</button>
         <IconButton label={`Wishlist ${wishlist.length} saved`} onClick={()=>setDrawer('saved')}><Heart size={19}/>{wishlist.length>0&&<b className="count-dot">{wishlist.length}</b>}</IconButton>
         <IconButton label={`Shopping bag ${bagCount} items`} onClick={()=>setDrawer('bag')}><ShoppingBag size={19}/>{bagCount>0&&<b className="count-dot">{bagCount}</b>}</IconButton>
         <button className="nav-visit" onClick={()=>setVisitOpen(true)}>Visit the Store <ArrowUpRight size={17}/></button>
         <IconButton className="mobile-menu" label={menuOpen?'Close menu':'Open menu'} onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X size={23}/>:<Menu size={23}/>}</IconButton>
       </div>
     </div>
   </header>

   <main>
    <section id="home" className="hero">
      <div className="hero-glow"></div><div className="hero-light-ray" aria-hidden="true"></div>
      <div className="hero-ornament ornament-one"></div><div className="hero-ornament ornament-two"></div>
      <div className="hero-media"><img src={img(28943610,1400)} alt="Model wearing a rich orange Kanchipuram silk saree" fetchPriority="high" /><div className="hero-photo-shade"></div></div>
      <div className="hero-body">
        <div className="hero-kicker"><span className="hero-star">✦</span> KANCHIPURAM · PURE ZARI · HANDWOVEN SILK</div>
        <h1>Woven for<br/><em>the Divine.</em></h1>
        <p>An ode to artistry, tradition and the women who carry them forward. The timeless beauty of silk, told anew.</p>
        <div className="hero-buttons"><button className="btn btn-gold" onClick={()=>goTo('looks')}>Try the Look <ArrowUpRight size={19}/></button><button className="btn btn-ivory" onClick={()=>goTo('rack')}>Browse the Rack <ArrowUpRight size={19}/></button></div>
        <div className="hero-footnote"><span className="hero-line"></span> A LEGACY IN EVERY THREAD <span className="hero-line"></span></div>
      </div>
      <button className="hero-scroll" onClick={()=>goTo('archive')} aria-label="Scroll to archive"><span>SCROLL TO EXPLORE</span><ArrowDown size={19}/></button>
      <div className="hero-side-label">NOOLAM — EST. IN THE IMAGINATION</div>
    </section>

    <div className="ticker" aria-label="Silk collection highlights"><div className="ticker-track">{Array.from({length:3},(_,i)=><span key={i}>✦ &nbsp; TRY THE LOOK &nbsp; ✦ &nbsp; PURE ZARI &nbsp; ✦ &nbsp; THE BRIDAL EDIT &nbsp; ✦ &nbsp; SILK STORIES &nbsp; ✦ &nbsp; THE RACK &nbsp; </span>)}</div></div>

    <section id="archive" className="section archive" onPointerDown={()=>pauseSection('archive')} onFocusCapture={()=>pauseSection('archive')}>
      <div className="section-container">
        <div className="archive-heading reveal"><div><SectionTag>THE NOOLAM ARCHIVE</SectionTag><h2 className="display-heading">Six Moods.<br/><em>Timeless Drapes.</em></h2></div><p>Woven by hand, worn for a lifetime.<br/>Six silk stories, from quiet mornings<br/>to unforgettable celebrations.</p></div>
        <div className="mood-grid">{moods.map(([name,id],i)=><button key={name} className={`mood-card reveal ${activeMood===i && canAutoplay && visibleSections.archive?'is-auto-featured':''}`} style={{transitionDelay:`${i*65}ms`}} onClick={()=>{setActiveLook(i%8);goTo('looks');}}><span className="arch-finial">✦</span><span className="mood-arch"><img src={img(id,520)} alt={name} loading="lazy" /><span className="arch-overlay"></span></span><strong>{name}</strong><span className="mood-index">0{i+1}</span></button>)}</div>
        <div className="archive-bottom reveal"><span>AN EXPLORATION OF THE EXTRAORDINARY</span><span>01 — 06</span></div>
      </div>
    </section>

    <section id="looks" className="section looks" onPointerDown={()=>pauseSection('looks')} onFocusCapture={()=>pauseSection('looks')}>
      <div className="section-container">
       <div className="looks-header reveal"><SectionTag>STYLED HEAD TO TOE</SectionTag><h2 className="display-heading">Try the <em>Look.</em></h2><p>Eight looks. Infinite ways to wear silk. Choose a muse to explore the pieces.</p></div>
       <div className="look-layout">
        <div className="look-stage reveal swipe-surface" {...lookSwipe.handlers} aria-label="Swipe left or right to change the outfit">
         <div className="look-stage-watermark">N</div>
         {[(-1),0,1].map(offset=>{const pos=(activeLook+offset+8)%8;return <button key={offset} className={`look-model look-${offset===0?'center':offset<0?'left':'right'}`} onClick={()=>{if(lookSwipe.wasJustSwiped())return;offset<0?prevLook():offset>0?nextLook():openDetail(products[pos]);}} aria-label={offset===0?'View current look':'Select adjacent look'}><ProductImage key={pos} product={products[pos]} width={760}/></button>;})}
         <div className="look-stage-bottom"><span><b>0{activeLook+1}</b> / 08 &nbsp; · &nbsp; {currentLook.name}</span><span className="touch-swipe-hint">Swipe to change look ↔</span><div><IconButton label="Previous look" onClick={prevLook}><ArrowLeft size={20}/></IconButton><IconButton label="Next look" onClick={nextLook}><ArrowRight size={20}/></IconButton></div></div>
        </div>
        <aside className="look-panel reveal"><div className="look-panel-top"><span>THE COMPLETE ENSEMBLE</span><span className="look-number">LOOK 0{activeLook+1}</span></div><h3>In this <em>look.</em></h3>
         <div className="look-items">
          {[[currentLook.name,currentLook.fabric,currentLook.price,currentLook.image],[ 'Temple Gold Choker','Hand-finished jewel',6900,36519701],[ 'Heritage Jhumkas','Antique gold finish',4200,19879797],[ 'The Festive Bangles','A finishing touch',4300,37706758]].map(([name,desc,price,pic],i)=><div className="look-item" key={name}><img src={img(pic,170)} alt="" loading="lazy"/><div><strong>{name}</strong><span>{desc}</span><b>{money(price)}</b></div><button aria-label={`Add ${name}`} onClick={()=>addToBag({id:i===0?currentLook.id:'accessory-'+i,name,price,image:pic})}><Plus size={18}/></button></div>)}
         </div><div className="look-subtotal"><div><span>Complete the look</span><small>Bundle styling offer · save 10%</small></div><div><s>{money(Math.round(lookBundle/0.9))}</s><strong>{money(lookBundle)}</strong></div></div>
         <button className="btn btn-maroon btn-full" onClick={()=>addToBag({id:'look-'+currentLook.id,name:currentLook.name+' complete look',price:lookBundle,image:currentLook.image})}>Add full look to bag <ArrowUpRight size={19}/></button>
         <p className="panel-disclaimer">Styling and pricing are illustrative for this demo.</p>
        </aside>
       </div>
      </div>
    </section>

    <section id="pick" className="section pick" onPointerDown={()=>pauseSection('pick')} onFocusCapture={()=>pauseSection('pick')}>
      <div className="section-container">
       <div className="pick-top reveal"><div><SectionTag>THE SIGNATURE SILKS</SectionTag><h2 className="display-heading">Pick a <em>Silk.</em></h2></div><p>Every colour tells a story. Find yours.<br/><MoveHorizontal size={16}/> Slide to discover the collection</p></div>
       <div className="silk-scroll" ref={silkScrollRef} onWheel={event=>{if(Math.abs(event.deltaX)>Math.abs(event.deltaY))pauseSection('pick');}}>{silkCards.map(({id,label,bg},i)=>{const p=products.find(v=>v.id===id);return <article key={id} className="silk-card" style={{'--silk-bg':bg,'--turn':`${(i%2===0?-1:1)*2}deg`}}><span className="silk-card-index">NOOLAM / 0{i+1}</span><button className={`silk-heart ${wishlist.includes(id)?'is-liked':''}`} onClick={()=>toggleWish(id)} aria-label={wishlist.includes(id)?'Remove from wishlist':'Save to wishlist'}><Heart size={18} fill={wishlist.includes(id)?'currentColor':'none'}/></button><h3>{label}</h3><button className="silk-photo" onClick={()=>openDetail(p)} aria-label={`View ${p.name}`}><ProductImage product={p} width={680}/></button><div className="silk-card-foot"><span>{money(p.price)}</span><button onClick={()=>addToBag(p)} aria-label={`Add ${p.name} to bag`}><Plus size={20}/></button></div></article>;})}</div>
       <div className="pick-hint reveal"><span>✦</span> EXQUISITE COLOUR. INFINITE CHARACTER. <span>✦</span></div>
      </div>
    </section>

    <section id="rack" className="section rack" onPointerDown={stopRackAutoScroll} onFocusCapture={()=>pauseSection('rack')}>
     <div className="section-container">
      <div className="rack-heading reveal"><SectionTag>THE COLLECTION</SectionTag><h2 className="display-heading">Every silk, <em>on the rail.</em></h2><p>Come closer. Discover the details, the drape and the story behind each piece.</p></div>
      <div className="rack-filters reveal">{filters.map(f=><button key={f} onClick={()=>{pauseSection('rack');setRackFilter(f);setActiveRack(0);}} className={rackFilter===f?'active':''}>{f}<span>{f==='All pieces'?products.length:products.filter(p=>p.category===f).length}</span></button>)}</div>
      <div className="rack-viewport rack-photo-gallery" ref={rackViewportRef} onTouchStart={event=>{rackSwipeOriginRef.current=rackViewportRef.current?.scrollLeft??0;rackSwipe.handlers.onTouchStart(event);}} onTouchEnd={rackSwipe.handlers.onTouchEnd} onTouchCancel={rackSwipe.handlers.onTouchCancel}>
        <div className="rack-list rack-photo-list">{railProducts.map((p,i)=>
          <button key={p.id} className={`rack-item rack-photo-item ${i===activeRack && canAutoplay && visibleSections.rack && !manualSections.rack?'is-auto-featured':''}`} onClick={()=>openDetail(p)} aria-label={`View real saree photograph of ${p.name}`}>
            <span className="rack-photo-frame">
              <ProductImage product={p} width={680}/>
              <span className="rack-photo-index">NOOLAM / {String(i+1).padStart(2,'0')}</span>
              <span className="rack-photo-cta">Explore the drape <ArrowUpRight size={17}/></span>
            </span>
            <span className="rack-item-name">{p.name}</span>
            <span className="rack-item-detail">{p.fabric}</span>
            <span className="rack-item-price">{money(p.price)}</span>
          </button>
        )}</div>
      </div>
      <div className="rack-bottom"><span>EXPLORE THE COLLECTION · {railProducts.length} PIECES</span><span>SELECT ANY PIECE TO VIEW DETAILS <ArrowUpRight size={14}/></span></div>
     </div>
    </section>

    <section id="gallery" className="section gallery">
      <div className="section-container">
        <div className="gallery-heading reveal">
          <div><SectionTag>THE EDITORIAL COLLECTION</SectionTag><h2 className="display-heading">Silk, in <em>every shade.</em></h2></div>
          <p>More than a drape. A moment, a mood, a story.<br/>Explore the colours and craftsmanship that inspire us.</p>
        </div>
        <div className="gallery-grid">
          {galleryProducts.map((p,i)=>
            <button key={p.id} type="button" className={`gallery-tile gallery-tile-${i+1}`} onClick={()=>openDetail(p)} aria-label={`See ${p.name} saree photography`}>
              <ProductImage product={p} width={760}/>
              <span className="gallery-image-label">SILK STORY / {String(i+1).padStart(2,'0')}</span>
              <span className="gallery-image-caption"><strong>{p.name}</strong><span>{p.fabric} <ArrowUpRight size={15}/></span></span>
            </button>
          )}
        </div>
        <div className="gallery-texture">
          <img src={img(37706758,1000)} loading="lazy" alt="Close view of bronze-gold saree zari fabric" />
          <div><SectionTag>THE BEAUTY IS IN THE DETAILS</SectionTag><h3>Every thread<br/><em>has a story.</em></h3><p>Discover drapes inspired by the richness of India's weaving traditions.</p><button className="btn btn-ivory" onClick={()=>goTo('rack')}>Browse the collection <ArrowUpRight size={17}/></button></div>
        </div>
        <p className="gallery-caption">Editorial photographs illustrate saree styles. Images are not photographs of merchandise held in inventory.</p>
      </div>
    </section>

    <section id="muse" className="section muse">
      <div className="section-container">
       <div className="muse-heading reveal"><SectionTag>BEYOND THE WEAVE</SectionTag><h2 className="display-heading">Feel the <em>drape.</em></h2><p>A little movement. A lifetime of stories.</p></div>
       <div className="muse-content">
        <div className="muse-photos muse-photos-left">{[products[4],products[1],products[7]].map(p=><ProductImage key={p.id} product={p} width={380}/>)}</div>
        <div className="film-frame reveal"><div className="film-corners"></div><div className="film-image-wrap swipe-surface" {...museSwipe.handlers}><img key={filmFrame} src={img(filmImages[filmFrame].image,1000)} alt="NOOLAM motion lookbook sequence" className="film-image"/><div className="film-vignette"></div><div className="film-center"><span>NOOLAM PRESENTS</span><strong>THE ART OF<br/><em>BEING TIMELESS</em></strong><span>A MOTION LOOKBOOK</span></div><button className="film-play" onClick={()=>setFilmOn(p=>!p)} aria-label={filmOn?'Pause motion lookbook':'Play motion lookbook'}>{filmOn?<Pause fill="currentColor" size={22}/>:<Play fill="currentColor" size={22}/>}</button></div><div className="film-controls"><span>VISUAL STORY · NO SOUND</span><span>0{filmFrame+1} / 04</span></div><div className="film-progress">{[0,1,2,3].map(i=><button key={i} onClick={()=>{setFilmFrame(i);setFilmOn(false);}} className={i===filmFrame?'active':''} aria-label={`Show film scene ${i+1}`}></button>)}</div></div>
        <div className="muse-photos muse-photos-right">{[products[15],products[14],products[18]].map(p=><ProductImage key={p.id} product={p} width={380}/>)}</div>
       </div>
       <div className="muse-bottom"><button className="btn btn-maroon" onClick={()=>goTo('rack')}>Explore the collection <ArrowUpRight size={18}/></button><span>IMAGE-LED MOTION SHOWCASE</span></div>
      </div>
    </section>

    <section id="reels" className="section reels" onPointerDown={()=>pauseSection('reels')} onFocusCapture={()=>pauseSection('reels')}>
      <div className="section-container">
       <div className="reels-head reveal"><div><SectionTag>THE MOVING MUSE</SectionTag><h2 className="display-heading">Silk, <em>in motion.</em></h2></div><div className="reel-buttons"><IconButton label="Previous reel" onClick={()=>setReelIndex(i=>(i+4)%5)}><ChevronLeft size={21}/></IconButton><IconButton label="Next reel" onClick={()=>setReelIndex(i=>(i+1)%5)}><ChevronRight size={21}/></IconButton></div></div>
       <div className="reel-arc swipe-surface" {...reelSwipe.handlers} aria-label="Swipe left or right through fashion reels">{reels.map((p,i)=>{let dif=i-reelIndex;if(dif>2)dif-=5;if(dif< -2)dif+=5;return <button key={p.id} className={`reel-card ${dif===0?'reel-active':''}`} style={{'--dx':dif,'--abs':Math.abs(dif)}} onClick={()=>{if(reelSwipe.wasJustSwiped())return;pauseSection('reels');if(dif===0){setReelOpen(true);setReelOn(true);}else setReelIndex(i);}} aria-label={dif===0?`Open ${p.name} visual reel`:`Select ${p.name} reel`}><ProductImage product={p} width={600}/><span className="reel-shade"></span><span className="reel-number">0{i+1} / 05</span>{dif===0&&<span className="reel-play"><Play size={22} fill="currentColor"/></span>}<span className="reel-info"><small>THE NOOLAM EDIT</small><strong>{p.name}</strong><span>INDIA · SILK STORY</span></span></button>})}</div>
       <p className="reel-note"><MoveHorizontal size={16}/> <span className="desktop-reel-note">SELECT A CARD TO EXPLORE THE EDITORIAL REEL</span><span className="mobile-reel-note">SWIPE LEFT OR RIGHT TO EXPLORE THE REELS</span></p>
      </div>
    </section>

    <section id="bridal" className="section bridal" onPointerDown={()=>pauseSection('bridal')} onFocusCapture={()=>pauseSection('bridal')}>
      <div className="section-container">
       <div className="bridal-head reveal"><SectionTag>FOR EVERY VOW</SectionTag><h2 className="display-heading">The Bridal <em>Collection.</em></h2><p>For the muhurtham and every beautiful promise after.</p></div>
       <div className="bridal-carousel swipe-surface" {...bridalSwipe.handlers} aria-label="Swipe left or right through bridal sarees">{bridal.map((p,i)=>{let diff=i-bridalIndex;return <button key={p.id} className={`bridal-card ${diff===0?'bridal-focus':''}`} style={{'--position':diff}} onClick={()=>{if(bridalSwipe.wasJustSwiped())return;pauseSection('bridal');setBridalIndex(i);}} aria-label={`View bridal design ${p.name}`}><span className="bridal-photo"><ProductImage product={p} width={750}/></span><span className="bridal-number">NOOLAM BRIDAL / 0{i+1}</span></button>;})}</div>
       <p className="bridal-swipe-note">Swipe to explore the bridal collection ↔</p><div className="bridal-info"><div className="bridal-control"><IconButton label="Previous bridal saree" onClick={()=>setBridalIndex(i=>(i+bridal.length-1)%bridal.length)}><ArrowLeft size={20}/></IconButton><span>0{bridalIndex+1} <small>/ 0{bridal.length}</small></span><IconButton label="Next bridal saree" onClick={()=>setBridalIndex(i=>(i+1)%bridal.length)}><ArrowRight size={20}/></IconButton></div><div className="bridal-description"><span>THE HEIRLOOM EDIT</span><h3>{bridal[bridalIndex].name}</h3><p>{bridal[bridalIndex].fabric}</p><strong>{money(bridal[bridalIndex].price)}</strong></div><div className="bridal-actions"><button className="btn btn-maroon" onClick={()=>addToBag(bridal[bridalIndex])}>Add to bag <ArrowUpRight size={18}/></button><IconButton label="Save bridal saree" onClick={()=>toggleWish(bridal[bridalIndex].id)}><Heart size={19} fill={wishlist.includes(bridal[bridalIndex].id)?'currentColor':'none'}/></IconButton></div></div>
      </div>
    </section>

    <section className="closing"><div className="closing-portrait closing-portrait-left"><img src={img(35108770,500)} alt="" loading="lazy"/></div><div className="closing-portrait closing-portrait-right"><img src={img(37597739,500)} alt="" loading="lazy"/></div><div className="closing-symbol">✦</div><p>THE SILK WE CARRY, THE STORIES WE KEEP</p><h2>Some things are<br/><em>forever woven.</em></h2><button className="btn btn-gold" onClick={()=>goTo('archive')}>Explore the archive <ArrowUpRight size={18}/></button></section>
   </main>

   <footer className="footer"><div className="footer-top"><Mark/><p>Handwoven stories. Heirloom dreams.<br/>An editorial showcase of timeless Indian silk.</p><div className="footer-links"><button onClick={()=>goTo('archive')}>The Archive</button><button onClick={()=>goTo('rack')}>The Collection</button><button onClick={()=>goTo('bridal')}>The Bridal Edit</button></div></div><div className="footer-bottom"><span>© 2026 NOOLAM. DESIGN SHOWCASE.</span><span>MADE WITH LOVE FOR THE ART OF SILK</span><span>DEMO STORE · SAMPLE PHOTOGRAPHY <a className="photo-credit-link" href="/fashion/photo-credits.html" target="_blank" rel="noopener noreferrer">IMAGE CREDITS</a></span></div></footer>

   {toast&&<div className="toast" role="status"><Check size={17}/>{toast}</div>}
   {drawer&&<div className="overlay" onClick={()=>setDrawer('')}><aside className="drawer" role="dialog" aria-modal="true" aria-label={drawer==='bag'?'Shopping bag':'Wishlist'} onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><SectionTag>YOUR NOOLAM EDIT</SectionTag><h2>{drawer==='bag'?'Your Bag':'Saved Silks'}</h2></div><IconButton label="Close drawer" onClick={()=>setDrawer('')}><X size={22}/></IconButton></div><div className="drawer-products">{(drawer==='bag'?cart:wishlistItems).length===0?<div className="empty-drawer"><Sparkles size={37}/><h3>Something beautiful awaits.</h3><p>{drawer==='bag'?'Your bag is empty. Start discovering a silk that speaks to you.':'No saved pieces yet. Tap the heart on any silk to add it here.'}</p><button className="btn btn-maroon" onClick={()=>{setDrawer('');goTo('rack');}}>Explore the silks <ArrowUpRight size={17}/></button></div>:(drawer==='bag'?cart:wishlistItems).map(p=><div className="drawer-line" key={p.id}><img src={img(p.image,220)} alt={p.name}/><div className="drawer-line-info"><strong>{p.name}</strong><span>{money(p.price)}</span>{drawer==='bag'?<div className="quantity"><button onClick={()=>changeQty(p.id,-1)} aria-label="Decrease quantity"><Minus size={15}/></button><b>{p.qty}</b><button onClick={()=>changeQty(p.id,1)} aria-label="Increase quantity"><Plus size={15}/></button></div>:<button className="text-action" onClick={()=>addToBag(p)}>Add to bag <ArrowRight size={14}/></button>}</div><IconButton label="Remove item" onClick={()=>drawer==='bag'?setCart(prev=>prev.filter(x=>x.id!==p.id)):toggleWish(p.id)}><X size={15}/></IconButton></div>)}</div>{drawer==='bag'&&cart.length>0&&<div className="drawer-checkout"><div><span>Subtotal</span><strong>{money(bagTotal)}</strong></div><p>Demonstration storefront — orders and payments are not enabled.</p><button className="btn btn-maroon btn-full" disabled>Checkout coming soon</button></div>}</aside></div>}
   {detail&&<div className="overlay detail-overlay" onClick={()=>setDetail(null)}><div className="detail-dialog" role="dialog" aria-modal="true" aria-label={detail.name+' product details'} onClick={e=>e.stopPropagation()}><button className="detail-close" onClick={()=>setDetail(null)} aria-label="Close product details"><X size={24}/></button><div className="detail-photo"><ProductImage product={detail} width={980}/><span>NOOLAM / THE COLLECTION</span></div><div className="detail-copy"><SectionTag>THE SILK EDIT</SectionTag><h2>{detail.name}</h2><p className="detail-material">{detail.fabric} · {detail.subtitle}</p><strong className="detail-price">{money(detail.price)}</strong><div className="detail-divider"></div><div className="detail-toggle"><span>VIEW</span>{['Front','Back'].map(v=><button key={v} className={detailView===v?'selected':''} onClick={()=>setDetailView(v)}>{v}</button>)}</div>{detailView==='Back'?<div className="detail-back-note">Additional reverse-side photography is not available in this design preview.</div>:<p className="detail-description">An expressive celebration of timeless drape and intricate craft. Explore the weave, the colours and the quiet details of this silk story.</p>}<div className="size-label">SIZE <span>{detail.category==='Blouses'?'Choose a blouse size':'One size · Unstitched / Saree'}</span></div><div className="sizes">{(detail.category==='Blouses'?['34','36','38','40','42']:['Free size']).map(s=><button key={s} className={detailSize===s?'chosen':''} onClick={()=>setDetailSize(s)}>{s}</button>)}</div><div className="detail-buttons"><button className="btn btn-maroon" onClick={()=>{if(!detailSize){notify('Please select a size');return;}addToBag(detail);setDetail(null);}}>Add to bag <ShoppingBag size={18}/></button><IconButton label="Save to wishlist" onClick={()=>toggleWish(detail.id)}><Heart size={21} fill={wishlist.includes(detail.id)?'currentColor':'none'}/></IconButton></div><p className="detail-fine">Preview catalog only. Availability and fulfilment are not connected.</p></div></div></div>}
   {reelOpen&&<div className="overlay reel-overlay" onClick={()=>{setReelOpen(false);setReelOn(false);}}><div className="reel-player" role="dialog" aria-modal="true" aria-label="Visual reel" onClick={e=>e.stopPropagation()}><img key={reelIndex} src={img(reels[reelIndex].image,1000)} alt={reels[reelIndex].name+' editorial visual'}/><div className="reel-player-shade"></div><div className="reel-player-header"><span>NOOLAM · VISUAL REEL 0{reelIndex+1}</span><IconButton label="Close visual reel" onClick={()=>{setReelOpen(false);setReelOn(false);}}><X/></IconButton></div><div className="reel-player-footer"><strong>{reels[reelIndex].name}</strong><p>Image-led editorial sequence · no sound or filmed footage</p><div><IconButton label="Previous scene" onClick={()=>setReelIndex(i=>(i+4)%5)}><ArrowLeft/></IconButton><IconButton label={reelOn?'Pause visual sequence':'Play visual sequence'} onClick={()=>setReelOn(v=>!v)}>{reelOn?<Pause/>:<Play/>}</IconButton><IconButton label="Next scene" onClick={()=>setReelIndex(i=>(i+1)%5)}><ArrowRight/></IconButton></div></div></div></div>}
   {visitOpen&&<div className="overlay" onClick={()=>setVisitOpen(false)}><div className="visit-dialog" role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}><IconButton label="Close" onClick={()=>setVisitOpen(false)}><X/></IconButton><div className="visit-mark">✦</div><SectionTag>THE NOOLAM EXPERIENCE</SectionTag><h2>A store, imagined.<br/><em>A legacy, celebrated.</em></h2><p>This is an interactive design concept. A physical showroom location and appointment system have not been configured.</p><button className="btn btn-maroon" onClick={()=>{setVisitOpen(false);goTo('rack');}}>Discover the collection <ArrowRight size={18}/></button></div></div>}
 </div>;
}
