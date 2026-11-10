import React, { useEffect, useMemo, useRef, useState } from 'react';
import MotionDirector from './MotionDirector.jsx';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Heart, Instagram, MapPin, Menu, Minus, MoveHorizontal, Pause, Play, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';

const img = (id, width = 900) => String(id).startsWith('u:')
  ? `https://images.unsplash.com/photo-${String(id).slice(2)}?auto=format&fit=crop&w=${width}&q=82`
  : `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
const money = amount => '₹' + amount.toLocaleString('en-IN');
const products = [
  { id:'kanchi-rani', name:'Kanchi Rani', subtitle:'Sunlit Kanchipuram silk', price:32400, category:'Silk Sarees', fabric:'Pure Kanchipuram Silk', color:'#8d2d26', image:28943610 },
  { id:'temple-bloom', name:'Temple Bloom', subtitle:'The bridal classic', price:58900, category:'Zari & Brocade', fabric:'Pure zari · Bridal edit', color:'#a73125', image:37597721 },
  { id:'rose-muhurtham', name:'Rose Muhurtham', subtitle:'A vow in vermilion', price:46800, category:'Silk Sarees', fabric:'Kanchipuram soft silk', color:'#b64c35', image:33608805 },
  { id:'ivory-mist', name:'Ivory Mist', subtitle:'A modern heirloom', price:22900, category:'Half Sarees', fabric:'Tissue and silk blend', color:'#b29a87', image:35108820 },
  { id:'midnight-zari', name:'Midnight Zari', subtitle:'After-dark elegance', price:28100, category:'Blouses', fabric:'Hand-finished brocade', color:'#4c3435', image:29172772 },
  { id:'meher', name:'Meher Heritage', subtitle:'A classic reimagined', price:36900, category:'Checked Sarees', fabric:'Handwoven silk', color:'#3c6859', image:24650534 },
  { id:'royal-vermillion', name:'Royal Vermillion', subtitle:'The wedding heirloom', price:62500, category:'Zari & Brocade', fabric:'Antique zari weaving', color:'#8a2523', image:7544528 },
  { id:'gulabi', name:'Gulabi Glow', subtitle:'The festive hour', price:26800, category:'Half Sarees', fabric:'Contemporary occasion silk', color:'#ac566c', image:'u:1617627143750-d86bc21e42bb' },
  { id:'violet-arch', name:'Violet Arch', subtitle:'An evening in silk', price:29900, category:'Silk Sarees', fabric:'Silk with woven gold border', color:'#482951', image:'u:1610030469983-98e550d6193c' },
  { id:'royal-amber', name:'Royal Amber', subtitle:'Heritage bridal story', price:54400, category:'Zari & Brocade', fabric:'Art silk · Studio collection', color:'#a14b36', image:18556232 },
  { id:'timeless-ruby', name:'Timeless Ruby', subtitle:'An heirloom in bloom', price:43600, category:'Silk Sarees', fabric:'Embroidered ceremonial silk', color:'#82313c', image:36519701 },
  { id:'golden-hour', name:'Golden Hour', subtitle:'A glimpse of zari', price:21800, category:'Checked Sarees', fabric:'Banarasi-inspired weave', color:'#ad704e', image:37706758 },
];
const moods = [
  ['The Wedding Edit',37597721],['Kanchipuram Icons',28943610],['Banarasi Heirlooms',24650534],
  ['Festive Radiance','u:1617627143750-d86bc21e42bb'],['Zari Signatures',36519701],['The Bridal Edit',33608805],
];
const silkCards = [
  {id:'violet-arch',label:'VIOLET ARCH',bg:'#6b2c86'},
  {id:'meher',label:'PALACE CHECK',bg:'#ac2948'},
  {id:'kanchi-rani',label:'KANCHI RANI',bg:'#d79b47'},
  {id:'rose-muhurtham',label:'ROSE GARDEN',bg:'#a42441'},
  {id:'royal-vermillion',label:'THE ROYAL',bg:'#c29a36'},
  {id:'gulabi',label:'GULABI SILK',bg:'#497d66'},
];
const filters = ['All pieces','Silk Sarees','Half Sarees','Blouses','Checked Sarees','Zari & Brocade'];
const links = [['Home','home'],['Try the Look','looks'],['Pick a Silk','pick'],['The Rack','rack'],['The Muse','muse'],['Bridal','bridal']];
const storyChapters = [['01','home','Prologue'],['02','archive','The Archive'],['03','looks','Try the Look'],['04','pick','Pick a Silk'],['05','rack','The Rail'],['06','muse','The Muse'],['07','reels','Silk in Motion'],['08','bridal','Bridal']];
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

export default function App() {
 const siteRef=useRef(null);
 const silkScrollRef=useRef(null);
 const rackViewportRef=useRef(null);
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
 const bridal=[products[1],products[6],products[9],products[10],products[2]];
 const reels=[products[3],products[2],products[0],products[7],products[1]];
 const filmImages=[products[0],products[2],products[1],products[7]];
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
 return <div className="site" ref={siteRef}>
   <MotionDirector rootRef={siteRef} onChapterChange={setActiveChapter}/>
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
        <div className="look-stage reveal">
         <div className="look-stage-watermark">N</div>
         {[(-1),0,1].map(offset=>{const pos=(activeLook+offset+8)%8;return <button key={offset} className={`look-model look-${offset===0?'center':offset<0?'left':'right'}`} onClick={()=>offset<0?prevLook():offset>0?nextLook():openDetail(products[pos])} aria-label={offset===0?'View current look':'Select adjacent look'}><ProductImage key={pos} product={products[pos]} width={760}/></button>;})}
         <div className="look-stage-bottom"><span><b>0{activeLook+1}</b> / 08 &nbsp; · &nbsp; {currentLook.name}</span><div><IconButton label="Previous look" onClick={prevLook}><ArrowLeft size={20}/></IconButton><IconButton label="Next look" onClick={nextLook}><ArrowRight size={20}/></IconButton></div></div>
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

    <section id="rack" className="section rack" onPointerDown={()=>pauseSection('rack')} onFocusCapture={()=>pauseSection('rack')}>
     <div className="section-container">
      <div className="rack-heading reveal"><SectionTag>THE COLLECTION</SectionTag><h2 className="display-heading">Every silk, <em>on the rail.</em></h2><p>Come closer. Discover the details, the drape and the story behind each piece.</p></div>
      <div className="rack-filters reveal">{filters.map(f=><button key={f} onClick={()=>{pauseSection('rack');setRackFilter(f);setActiveRack(0);}} className={rackFilter===f?'active':''}>{f}<span>{f==='All pieces'?products.length:products.filter(p=>p.category===f).length}</span></button>)}</div>
      <div className="rack-viewport" ref={rackViewportRef}><div className="rack-rod"></div><div className="rack-list">{railProducts.map((p,i)=><button key={p.id} className={`rack-item ${i===activeRack && canAutoplay && visibleSections.rack && !manualSections.rack?'is-auto-featured':''}`} onClick={()=>openDetail(p)} aria-label={`View details of ${p.name}`}><span className="hanger-hook"></span><span className="hanger-shoulders"></span><span className="rack-garment" style={{'--fabric':p.color}}><span className="fabric-pleats"></span><span className="fabric-zari"></span></span><span className="rack-item-name">{p.name}</span><span className="rack-item-price">{money(p.price)}</span></button>)}</div></div>
      <div className="rack-bottom"><span>EXPLORE THE COLLECTION · {railProducts.length} PIECES</span><span>SELECT ANY PIECE TO VIEW DETAILS <ArrowUpRight size={14}/></span></div>
     </div>
    </section>

    <section id="muse" className="section muse">
      <div className="section-container">
       <div className="muse-heading reveal"><SectionTag>BEYOND THE WEAVE</SectionTag><h2 className="display-heading">Feel the <em>drape.</em></h2><p>A little movement. A lifetime of stories.</p></div>
       <div className="muse-content">
        <div className="muse-photos muse-photos-left">{[products[4],products[1],products[7]].map(p=><ProductImage key={p.id} product={p} width={380}/>)}</div>
        <div className="film-frame reveal"><div className="film-corners"></div><div className="film-image-wrap"><img key={filmFrame} src={img(filmImages[filmFrame].image,1000)} alt="NOOLAM motion lookbook sequence" className="film-image"/><div className="film-vignette"></div><div className="film-center"><span>NOOLAM PRESENTS</span><strong>THE ART OF<br/><em>BEING TIMELESS</em></strong><span>A MOTION LOOKBOOK</span></div><button className="film-play" onClick={()=>setFilmOn(p=>!p)} aria-label={filmOn?'Pause motion lookbook':'Play motion lookbook'}>{filmOn?<Pause fill="currentColor" size={22}/>:<Play fill="currentColor" size={22}/>}</button></div><div className="film-controls"><span>VISUAL STORY · NO SOUND</span><span>0{filmFrame+1} / 04</span></div><div className="film-progress">{[0,1,2,3].map(i=><button key={i} onClick={()=>{setFilmFrame(i);setFilmOn(false);}} className={i===filmFrame?'active':''} aria-label={`Show film scene ${i+1}`}></button>)}</div></div>
        <div className="muse-photos muse-photos-right">{[products[2],products[9],products[0]].map(p=><ProductImage key={p.id} product={p} width={380}/>)}</div>
       </div>
       <div className="muse-bottom"><button className="btn btn-maroon" onClick={()=>goTo('rack')}>Explore the collection <ArrowUpRight size={18}/></button><span>IMAGE-LED MOTION SHOWCASE</span></div>
      </div>
    </section>

    <section id="reels" className="section reels" onPointerDown={()=>pauseSection('reels')} onFocusCapture={()=>pauseSection('reels')}>
      <div className="section-container">
       <div className="reels-head reveal"><div><SectionTag>THE MOVING MUSE</SectionTag><h2 className="display-heading">Silk, <em>in motion.</em></h2></div><div className="reel-buttons"><IconButton label="Previous reel" onClick={()=>setReelIndex(i=>(i+4)%5)}><ChevronLeft size={21}/></IconButton><IconButton label="Next reel" onClick={()=>setReelIndex(i=>(i+1)%5)}><ChevronRight size={21}/></IconButton></div></div>
       <div className="reel-arc">{reels.map((p,i)=>{let dif=i-reelIndex;if(dif>2)dif-=5;if(dif< -2)dif+=5;return <button key={p.id} className={`reel-card ${dif===0?'reel-active':''}`} style={{'--dx':dif,'--abs':Math.abs(dif)}} onClick={()=>{if(dif===0){setReelOpen(true);setReelOn(true);}else setReelIndex(i);}} aria-label={dif===0?`Open ${p.name} visual reel`:`Select ${p.name} reel`}><ProductImage product={p} width={600}/><span className="reel-shade"></span><span className="reel-number">0{i+1} / 05</span>{dif===0&&<span className="reel-play"><Play size={22} fill="currentColor"/></span>}<span className="reel-info"><small>THE NOOLAM EDIT</small><strong>{p.name}</strong><span>INDIA · SILK STORY</span></span></button>})}</div>
       <p className="reel-note"><MoveHorizontal size={16}/> SELECT A CARD TO EXPLORE THE EDITORIAL REEL</p>
      </div>
    </section>

    <section id="bridal" className="section bridal" onPointerDown={()=>pauseSection('bridal')} onFocusCapture={()=>pauseSection('bridal')}>
      <div className="section-container">
       <div className="bridal-head reveal"><SectionTag>FOR EVERY VOW</SectionTag><h2 className="display-heading">The Bridal <em>Collection.</em></h2><p>For the muhurtham and every beautiful promise after.</p></div>
       <div className="bridal-carousel">{bridal.map((p,i)=>{let diff=i-bridalIndex;return <button key={p.id} className={`bridal-card ${diff===0?'bridal-focus':''}`} style={{'--position':diff}} onClick={()=>setBridalIndex(i)} aria-label={`View bridal design ${p.name}`}><span className="bridal-photo"><ProductImage product={p} width={750}/></span><span className="bridal-number">NOOLAM BRIDAL / 0{i+1}</span></button>;})}</div>
       <div className="bridal-info"><div className="bridal-control"><IconButton label="Previous bridal saree" onClick={()=>setBridalIndex(i=>(i+bridal.length-1)%bridal.length)}><ArrowLeft size={20}/></IconButton><span>0{bridalIndex+1} <small>/ 0{bridal.length}</small></span><IconButton label="Next bridal saree" onClick={()=>setBridalIndex(i=>(i+1)%bridal.length)}><ArrowRight size={20}/></IconButton></div><div className="bridal-description"><span>THE HEIRLOOM EDIT</span><h3>{bridal[bridalIndex].name}</h3><p>{bridal[bridalIndex].fabric}</p><strong>{money(bridal[bridalIndex].price)}</strong></div><div className="bridal-actions"><button className="btn btn-maroon" onClick={()=>addToBag(bridal[bridalIndex])}>Add to bag <ArrowUpRight size={18}/></button><IconButton label="Save bridal saree" onClick={()=>toggleWish(bridal[bridalIndex].id)}><Heart size={19} fill={wishlist.includes(bridal[bridalIndex].id)?'currentColor':'none'}/></IconButton></div></div>
      </div>
    </section>

    <section className="closing"><div className="closing-symbol">✦</div><p>THE SILK WE CARRY, THE STORIES WE KEEP</p><h2>Some things are<br/><em>forever woven.</em></h2><button className="btn btn-gold" onClick={()=>goTo('archive')}>Explore the archive <ArrowUpRight size={18}/></button></section>
   </main>

   <footer className="footer"><div className="footer-top"><Mark/><p>Handwoven stories. Heirloom dreams.<br/>An editorial showcase of timeless Indian silk.</p><div className="footer-links"><button onClick={()=>goTo('archive')}>The Archive</button><button onClick={()=>goTo('rack')}>The Collection</button><button onClick={()=>goTo('bridal')}>The Bridal Edit</button></div></div><div className="footer-bottom"><span>© 2026 NOOLAM. DESIGN SHOWCASE.</span><span>MADE WITH LOVE FOR THE ART OF SILK</span><span>DEMO STORE · NO LIVE CHECKOUT</span></div></footer>

   {toast&&<div className="toast" role="status"><Check size={17}/>{toast}</div>}
   {drawer&&<div className="overlay" onClick={()=>setDrawer('')}><aside className="drawer" role="dialog" aria-modal="true" aria-label={drawer==='bag'?'Shopping bag':'Wishlist'} onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><SectionTag>YOUR NOOLAM EDIT</SectionTag><h2>{drawer==='bag'?'Your Bag':'Saved Silks'}</h2></div><IconButton label="Close drawer" onClick={()=>setDrawer('')}><X size={22}/></IconButton></div><div className="drawer-products">{(drawer==='bag'?cart:wishlistItems).length===0?<div className="empty-drawer"><Sparkles size={37}/><h3>Something beautiful awaits.</h3><p>{drawer==='bag'?'Your bag is empty. Start discovering a silk that speaks to you.':'No saved pieces yet. Tap the heart on any silk to add it here.'}</p><button className="btn btn-maroon" onClick={()=>{setDrawer('');goTo('rack');}}>Explore the silks <ArrowUpRight size={17}/></button></div>:(drawer==='bag'?cart:wishlistItems).map(p=><div className="drawer-line" key={p.id}><img src={img(p.image,220)} alt={p.name}/><div className="drawer-line-info"><strong>{p.name}</strong><span>{money(p.price)}</span>{drawer==='bag'?<div className="quantity"><button onClick={()=>changeQty(p.id,-1)} aria-label="Decrease quantity"><Minus size={15}/></button><b>{p.qty}</b><button onClick={()=>changeQty(p.id,1)} aria-label="Increase quantity"><Plus size={15}/></button></div>:<button className="text-action" onClick={()=>addToBag(p)}>Add to bag <ArrowRight size={14}/></button>}</div><IconButton label="Remove item" onClick={()=>drawer==='bag'?setCart(prev=>prev.filter(x=>x.id!==p.id)):toggleWish(p.id)}><X size={15}/></IconButton></div>)}</div>{drawer==='bag'&&cart.length>0&&<div className="drawer-checkout"><div><span>Subtotal</span><strong>{money(bagTotal)}</strong></div><p>Demonstration storefront — orders and payments are not enabled.</p><button className="btn btn-maroon btn-full" disabled>Checkout coming soon</button></div>}</aside></div>}
   {detail&&<div className="overlay detail-overlay" onClick={()=>setDetail(null)}><div className="detail-dialog" role="dialog" aria-modal="true" aria-label={detail.name+' product details'} onClick={e=>e.stopPropagation()}><button className="detail-close" onClick={()=>setDetail(null)} aria-label="Close product details"><X size={24}/></button><div className="detail-photo"><ProductImage product={detail} width={980}/><span>NOOLAM / THE COLLECTION</span></div><div className="detail-copy"><SectionTag>THE SILK EDIT</SectionTag><h2>{detail.name}</h2><p className="detail-material">{detail.fabric} · {detail.subtitle}</p><strong className="detail-price">{money(detail.price)}</strong><div className="detail-divider"></div><div className="detail-toggle"><span>VIEW</span>{['Front','Back'].map(v=><button key={v} className={detailView===v?'selected':''} onClick={()=>setDetailView(v)}>{v}</button>)}</div>{detailView==='Back'?<div className="detail-back-note">Additional reverse-side photography is not available in this design preview.</div>:<p className="detail-description">An expressive celebration of timeless drape and intricate craft. Explore the weave, the colours and the quiet details of this silk story.</p>}<div className="size-label">SIZE <span>{detail.category==='Blouses'?'Choose a blouse size':'One size · Unstitched / Saree'}</span></div><div className="sizes">{(detail.category==='Blouses'?['34','36','38','40','42']:['Free size']).map(s=><button key={s} className={detailSize===s?'chosen':''} onClick={()=>setDetailSize(s)}>{s}</button>)}</div><div className="detail-buttons"><button className="btn btn-maroon" onClick={()=>{if(!detailSize){notify('Please select a size');return;}addToBag(detail);setDetail(null);}}>Add to bag <ShoppingBag size={18}/></button><IconButton label="Save to wishlist" onClick={()=>toggleWish(detail.id)}><Heart size={21} fill={wishlist.includes(detail.id)?'currentColor':'none'}/></IconButton></div><p className="detail-fine">Preview catalog only. Availability and fulfilment are not connected.</p></div></div></div>}
   {reelOpen&&<div className="overlay reel-overlay" onClick={()=>{setReelOpen(false);setReelOn(false);}}><div className="reel-player" role="dialog" aria-modal="true" aria-label="Visual reel" onClick={e=>e.stopPropagation()}><img key={reelIndex} src={img(reels[reelIndex].image,1000)} alt={reels[reelIndex].name+' editorial visual'}/><div className="reel-player-shade"></div><div className="reel-player-header"><span>NOOLAM · VISUAL REEL 0{reelIndex+1}</span><IconButton label="Close visual reel" onClick={()=>{setReelOpen(false);setReelOn(false);}}><X/></IconButton></div><div className="reel-player-footer"><strong>{reels[reelIndex].name}</strong><p>Image-led editorial sequence · no sound or filmed footage</p><div><IconButton label="Previous scene" onClick={()=>setReelIndex(i=>(i+4)%5)}><ArrowLeft/></IconButton><IconButton label={reelOn?'Pause visual sequence':'Play visual sequence'} onClick={()=>setReelOn(v=>!v)}>{reelOn?<Pause/>:<Play/>}</IconButton><IconButton label="Next scene" onClick={()=>setReelIndex(i=>(i+1)%5)}><ArrowRight/></IconButton></div></div></div></div>}
   {visitOpen&&<div className="overlay" onClick={()=>setVisitOpen(false)}><div className="visit-dialog" role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}><IconButton label="Close" onClick={()=>setVisitOpen(false)}><X/></IconButton><div className="visit-mark">✦</div><SectionTag>THE NOOLAM EXPERIENCE</SectionTag><h2>A store, imagined.<br/><em>A legacy, celebrated.</em></h2><p>This is an interactive design concept. A physical showroom location and appointment system have not been configured.</p><button className="btn btn-maroon" onClick={()=>{setVisitOpen(false);goTo('rack');}}>Discover the collection <ArrowRight size={18}/></button></div></div>}
 </div>;
}
